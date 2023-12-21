import { ResultReason, SpeechConfig, SpeechSynthesisResult, SpeechSynthesizer } from "microsoft-cognitiveservices-speech-sdk";
import ISelectedVerse from "../model/ISelectedVerse";
import ISettings from "../model/ISettings";
import ISynthesizedVerse from "../model/ISynthesizedVerse";
import IVerseChunk from "../model/IAudioChunkMetadata";
import IWordOffset from "../model/IWordOffset";
import ITextToSpeechResult from "../model/ITextToSpeechResult";
import IAudioChunk from "../model/IAudioChunk";
import IAlias from "../model/IAlias";

export default class TextToSpeechConverter {
    private readonly settings: ISettings;
    private readonly verse: ISelectedVerse;

    constructor(settings: ISettings, verse: ISelectedVerse) {
        this.settings = settings;
        this.verse = verse;
    }

    async convert(chunk: boolean = true): Promise<ITextToSpeechResult> {
        const baseFileName = `${this.verse.bookName}-${this.verse.chapterNumber}-${this.verse.verseNumber}`;

        console.info("Building speech configuration");
        const speechConfig = SpeechConfig.fromSubscription(process.env.SPEECH_KEY!, process.env.SPEECH_REGION!);
        speechConfig.speechSynthesisVoiceName = this.settings.speechVoice;

        console.info(`Creating the speech synthesizer for: ${this.settings.speechVoice}`);
        var synthesizer = new SpeechSynthesizer(speechConfig);

        // output data
        const synthesizedVerse: ISynthesizedVerse = {
            // verse data
            id: this.verse.id,
            bookName: this.verse.bookName,
            bookNumber: this.verse.bookNumber,
            chapterNumber: this.verse.chapterNumber,
            studyNumber: this.verse.studyNumber,
            verseNumber: this.verse.verseNumber,
            verseText: this.verse.verseText,
            breaks: this.verse.breaks,
            aliases: this.verse.aliases,
            sizing: this.verse.sizing,

            // settings
            name: this.settings.name,
            speechRate: this.settings.speechRate,
            speechStyle: this.settings.speechStyle,
            speechVoice: this.settings.speechVoice,
            videoFPS: this.settings.videoFPS,
            quality: this.settings.quality,
            colors: this.settings.colors,

            // audio data
            chunks: []
        };

        // define the chunks to generate
        let chunkDefinitions: IChunkDefinition[];
        if (chunk) {
            chunkDefinitions = getChunkDefinitions(this.verse);
        } else {
            chunkDefinitions = [{
                id: 0,
                start: 0,
                end: this.verse.verseText.length - 1,
                tokenId: 0,
                type: "all"
            }];
        }
        console.log(chunkDefinitions);

        // iteration each definition and produce a chunk for it
        const chunkAudio: IAudioChunk[] = [];
        for (let i = 0; i < chunkDefinitions.length; i++) {
            const definition = chunkDefinitions[i];
            const audioFileName = `${baseFileName}-${definition.type === 'reference' ? 'ref' : 'part'}${definition.type === 'reference' ? '' : definition.id}.wav`;
            const chunk: IVerseChunk = {
                id: definition.id,
                type: definition.type,

                audioFileName: audioFileName,
                startOffset: 0,
                endOffset: 0,
                duration: 0,

                textStart: definition.start,
                textEnd: definition.end,
                textLength: definition.end - definition.start,

                bookmarks: [],
                words: []
            };
            synthesizedVerse.chunks.push(chunk);

            // build a SSML for this chunk
            // NOTE: we always send the full verse text
            let speakSSML = '';
            if (definition.type === 'all') {
                const text = replacePronunciation(this.verse.verseText, this.verse.aliases);
                speakSSML = `<bookmark mark='chunk-start'/><break strength="weak" />${text}<break strength="weak" /><bookmark mark='chunk-end'/>`;
            } else if (definition.type === 'reference') {
                speakSSML = `<bookmark mark='chunk-start'/><break strength="weak" /><bookmark mark='reference-start'/>${this.verse.bookName} <bookmark mark='chapter-start'/>chapter ${this.verse.chapterNumber} <bookmark mark='verse-start'/>verse ${this.verse.verseNumber}<break strength="weak" /><bookmark mark='chunk-end'/>`;
            } else if (definition.type === 'chunk') {
                // get the aliases withing the start/end
                const aliases = this.verse.aliases.filter(a => a.location >= definition.start && a.location <= definition.end);
                const text = replacePronunciation(this.verse.verseText.substring(definition.start, definition.end), aliases);
                speakSSML = `<bookmark mark='chunk-start'/><break strength="weak" />${text}<break strength="weak" /><bookmark mark='chunk-end'/>`;
            }

            console.log(speakSSML);

            // produce a text for the synthesizer to speak
            const ssml = `<speak version='1.0' xml:lang='en-US' xmlns='http://www.w3.org/2001/10/synthesis' xmlns:mstts='http://www.w3.org/2001/mstts'> \r\n \
                <voice name='${this.settings.speechVoice}'> \r\n \
                    <mstts:express-as style="${this.settings.speechStyle}"> \r\n \
                        <prosody rate="${this.settings.speechRate}">${speakSSML}</prosody> \r\n \
                    </mstts:express-as> \r\n \
                </voice> \r\n \
            </speak>`;

            console.info("Tapping into synthesizer hooks");
            // synthesizer.synthesisCompleted = (sender, event) => {};
            // synthesizer.synthesisStarted = (sender, event) => {};
            // synthesizer.SynthesisCanceled = (sender, event) => {};
            // synthesizer.synthesizing = (sender, event) => {};

            synthesizer.bookmarkReached = (sender, event) => {
                // console.info(`${event.audioOffset} BOOKMARK ${event.text}`);
                chunk.bookmarks.push({
                    bookmark: event.text,
                    offset: event.audioOffset
                });

                // NOTE: these are not reliable...

                if (event.text === 'chunk-end') {
                    // chunk.endOffset = event.audioOffset;
                }
                if (event.text === 'chunk-start') {
                    // this isn't accurate enough and it makes the highlighting
                    // of the text get ahead of the audio
                    // chunk.startOffset = event.audioOffset;
                }
            };

            synthesizer.wordBoundary = (sender, event) => {
                // console.info(`${event.audioOffset} WORD ${event.text} ${event.wordLength} ${event.textOffset} ${event.duration} ${event.boundaryType}`);
                const word: IWordOffset = {
                    word: event.text,
                    offset: event.audioOffset,
                    boundaryType: event.boundaryType,
                    duration: event.duration,
                    wordLength: event.wordLength,
                    textOffset: event.textOffset
                };
                chunk.words.push(word);
            };

            console.info(`Synthesizing text`);

            const result: SpeechSynthesisResult = await new Promise((resolve, reject) => {
                synthesizer.speakSsmlAsync(ssml,
                    function (result) {
                        resolve(result);
                    },
                    function (err) {
                        reject();
                        console.error(`Synthesis failed: ${err}`);
                    });
            });

            console.info("Interpreting the result");
            if (result.reason === ResultReason.SynthesizingAudioCompleted) {
                console.info("Synthesis completed successfully");

                // make sure bookmarks and words are ordered
                chunk.bookmarks.sort((a, b) => a.offset - b.offset);
                chunk.words.sort((a, b) => a.offset - b.offset);
                chunk.endOffset = chunk.words.map(w => w.offset + w.duration).reduce((p, c) => Math.max(p, c));
                chunk.duration = chunk.endOffset - chunk.startOffset;

                // make sure replacements are swapped back in
                chunk.words.forEach((w, i) => {
                    if (w.textOffset === -1) {
                        // find the first replacement where the text is the same and it's after the previous offset
                        const replacement = this.verse.aliases.find(r => r.replacement === w.word);

                        if (replacement) {
                            // console.info(`Replaced '${w.word}' with '${replacement.original}'`);
                            w.word = replacement.original;
                        }
                    }
                });

                chunkAudio.push({ metadata: chunk, audio: result.audioData });

                // wait 2 secs in between generating text to avoid the 20 requests / minute rate limiting
                await sleep(2000);
            } else {
                const msg = `${result.reason} ${result.errorDetails}`;
                console.error(msg);
                throw new Error(msg);
            }
        }

        console.info("Closing the synthesizer");
        synthesizer.close();

        return {
            verse: synthesizedVerse,
            chunks: chunkAudio
        };
    }
}

const sleep = (ms: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

interface IChunkDefinition {
    id: number;
    tokenId: number;
    type: 'all' | 'chunk' | 'reference';
    start: number;
    end: number;
}

const getChunkDefinitions = (verse: ISelectedVerse): IChunkDefinition[] => {
    const output: IChunkDefinition[] = [];

    verse.breaks.forEach((b, i) => {
        output.push({
            id: i,
            tokenId: b.id,
            type: 'chunk',
            start: 0,
            end: b.textEnd
        });
    });

    // always generate a full-verse chunk
    output.push({
        id: verse.breaks.length,
        tokenId: 0,
        type: 'all',
        start: 0,
        end: verse.verseText.length - 1
    });

    // always generate a reference chunk
    output.push({
        id: verse.breaks.length + 1,
        tokenId: 0,
        type: 'reference',
        // start end aren't relevant for the reference since we'd never partially say that
        start: 0,
        end: `${verse.bookName} ${verse.chapterNumber}:${verse.verseNumber}`.length - 1
    });

    return output;
};

const replacePronunciation = (text: string, aliases: IAlias[]): string => {
    let output = text;

    console.info(aliases);

    // subsitutions
    aliases.forEach(sub => {
        // trim puncuation characters
        const original = sub.original.replace(/['!"&(),.:;?]/gi, '');
        const regex = new RegExp(`(\\b${original}\\b)`, 'gi');
        output = output.replace(regex, `<sub alias="${sub.replacement}">$1</sub>`);
    });

    return output;
};