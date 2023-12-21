import IAudioOffset from "./IAudioOffset";

export default interface IWordOffset extends IAudioOffset {
    /** The word */
    word: string;

    // https://learn.microsoft.com/en-us/javascript/api/microsoft-cognitiveservices-speech-sdk/speechsynthesisboundarytype?view=azure-node-latest
    /** What type of boundary: 'WordBoundary' or 'PunctuationBoundary' or 'SentenceBoundary' */
    boundaryType: string;

    /** The text-length of the word */
    wordLength: number;

    /** The duration of the word in ticks (1 tick = 100 nanoseconds) */
    duration: number;

    /** The text offset in the SSML */
    textOffset: number;
}