import IRenderer from "./IRenderer";
import nodeHtmlToImage from 'node-html-to-image'
import fs from 'fs';
import { promisify } from 'node:util';
import { convertOffsetToSeconds } from "../Helpers";

import IAudioChunkMetadata from "../model/IAudioChunkMetadata";
import ISynthesizedVerse from "../model/ISynthesizedVerse";

const copyFile = promisify(fs.copyFile);

interface IVideoFrame {
    verseText: string;
    referenceText: string;
}

interface IUniqueVideoFrame extends IVideoFrame {
    frameNumber: number;
    frames: number;
    fileName: string;
}

export default class HTML5Renderer implements IRenderer {
    private readonly path: string;
    private readonly chunk: IAudioChunkMetadata;
    private readonly verse: ISynthesizedVerse;

    private readonly bookOffset: number;
    private readonly chapterOffset: number;
    private readonly verseOffset: number;

    private lastWord: string = '';
    private lastColor: string = '';

    constructor(path: string, verse: ISynthesizedVerse, chunk: IAudioChunkMetadata) {
        this.path = path;
        this.chunk = chunk;
        this.verse = verse;

        this.bookOffset = convertOffsetToSeconds(chunk.bookmarks.find(b => b.bookmark === 'reference-start')?.offset ?? Number.MAX_VALUE);
        this.chapterOffset = convertOffsetToSeconds(chunk.bookmarks.find(b => b.bookmark === 'chapter-start')?.offset ?? Number.MAX_VALUE);
        this.verseOffset = convertOffsetToSeconds(chunk.bookmarks.find(b => b.bookmark === 'verse-start')?.offset ?? Number.MAX_VALUE);

        this.lastColor = verse.colors[0];
    }

    async render(): Promise<void> {
        // get the total video time
        const totalTime: number = convertOffsetToSeconds(this.chunk.duration);
        console.info(`Chunk duration: ${totalTime}s`);
        console.info(`Book offset: ${this.bookOffset}s`);
        console.info(`Chapter offset: ${this.chapterOffset}s`);
        console.info(`Verse offset: ${this.verseOffset}s`);

        const start: number = convertOffsetToSeconds(this.chunk.startOffset);
        const end: number = convertOffsetToSeconds(this.chunk.endOffset);
        console.info(`Start time: ${start}s`);
        console.info(`End time: ${end}s`);

        // compute the total number of frames based on Frames/Second
        const frameCount: number = Math.ceil(totalTime * this.verse.videoFPS);
        console.info(`Calculated frame count: ${frameCount}`);

        const secondsPerFrame: number = 1.0 / this.verse.videoFPS;
        console.info(`Calculated seconds per frame: ${secondsPerFrame}`);

        const startFrame = Math.floor(start / secondsPerFrame);
        try {
            const frames: IUniqueVideoFrame[] = [];
            console.info("generating frame content");
            for (let currentFrame = 0; currentFrame < frameCount; ++currentFrame) {
                const currentTimeInSeconds: number = secondsPerFrame * (startFrame + currentFrame);

                // generate the HTML for this frame
                const frame = this.generateFrame(currentTimeInSeconds);

                if (frames.length > 0) {
                    const lastFrame = frames[frames.length - 1];
                    if (lastFrame.verseText === frame.verseText && lastFrame.referenceText === frame.referenceText) {
                        lastFrame.frames++;
                    } else {
                        frames.push({
                            frames: 1,
                            frameNumber: currentFrame + 1,
                            fileName: `${this.path}/${currentFrame + 1}.png`,
                            verseText: frame.verseText,
                            referenceText: frame.referenceText
                        });
                    }
                } else {
                    frames.push({
                        frames: 1,
                        frameNumber: currentFrame + 1,
                        fileName: `${this.path}/${currentFrame + 1}.png`,
                        verseText: frame.verseText,
                        referenceText: frame.referenceText
                    });
                }
            }

            // const baseFontSize = 65.0;
            // const baseFontLineHeight = 110.0;
            // const baseReferenceGap = 50.0;
            const basePadding = 44.0;

            // all verse sizing is based on 480p (854x480)
            const scaleRatio = this.verse.quality.height / 480.0;

            const fontSize = this.verse.sizing.fontSize * scaleRatio;
            const fontLineHeight = this.verse.sizing.lineHeight * scaleRatio;
            const referenceGap = this.verse.sizing.referenceSpacing * scaleRatio;
            const padding = basePadding * scaleRatio;

            console.info(`Rendering with metrics: ${this.verse.quality.width}x${this.verse.quality.height} fs=${fontSize} lh=${fontLineHeight} rp=${referenceGap} p=${padding}`);

            const html = `<html>
                    <body style="background-color: black; color: white; width: ${this.verse.quality.width}px; height: ${this.verse.quality.height}px; font-size: ${fontSize}px; padding: ${padding}px; box-sizing: border-box; font-family: sans-serif; line-height: ${fontLineHeight}px; text-align: center;">
                        <div style="display: flex; justify-content: center; align-items: center; flex-direction: column; height: 100%; width: 100%;">
                            <div style="padding-bottom: ${referenceGap}px;">{{{verseText}}}</div>
                            <div>{{{referenceText}}}</div>
                        </div>
                    </body>
                </html>`;

            // generate all the unique frames
            console.log("Rendering frames");
            await nodeHtmlToImage({
                html: html,
                type: 'png',
                content: frames.map((f, i) => {
                    return {
                        verseText: f.verseText,
                        referenceText: f.referenceText,
                        output: f.fileName
                    };
                })
            });

            console.log("Copying frames");
            // now make copies of the unique ones based on the frame counts
            for (let i = 0; i < frames.length; i++) {
                const frame = frames[i];
                for (let j = 1; j < frame.frames; j++) {
                    await copyFile(frame.fileName, `${this.path}/${frame.frameNumber + j}.png`);
                }
            }
        } finally {

        }
    }

    private generateFrame(time: number): IVideoFrame {
        // for now we're going to stick with just text color change
        // so get what "word" should be highlighted at this time in the
        // timeline

        // we always render the text the same every frame with exception of the color
        // we're going to with a hack where we use HTML2Canvas to render HTML to a canvas
        // capture that as an image, then render the image to the konva layer
        const defaultColor: string = 'inherit';

        const lowFocus = "<span style='color: #222;'>";
        let verseText = lowFocus;
        let referenceText = '';

        if (this.chunk.type !== 'reference') {
            this.chunk.words.forEach((w, i) => {
                if (w.offset > this.chunk.startOffset) {
                    // we're starting the text for this chunk, so wrap anything prior in a span
                    if (verseText) {
                        verseText += "</span>";
                    }
                }

                // convert from offset to seconds
                const offsetInSeconds = convertOffsetToSeconds(w.offset);
                const endInSeconds = convertOffsetToSeconds(w.offset + w.duration);
                const isWord = w.boundaryType === 'WordBoundary';
                const nextIsWord = i + 1 < this.chunk.words.length ? this.chunk.words[i + 1].boundaryType === 'WordBoundary' : false;
                const highlight =
                    time > offsetInSeconds &&
                    time <= endInSeconds &&
                    w.offset > this.chunk.startOffset &&
                    w.offset <= this.chunk.endOffset &&
                    isWord;

                let highlightedColor = this.lastColor;
                if (highlight && this.lastWord != w.word) {
                    let nextColorIndex = this.verse.colors.indexOf(this.lastColor) + 1;
                    if (nextColorIndex >= this.verse.colors.length) {
                        nextColorIndex = 0;
                    }

                    this.lastWord = w.word;
                    this.lastColor = highlightedColor = this.verse.colors[nextColorIndex];
                }

                const color = highlight ? highlightedColor : defaultColor;
                verseText += `<span style="color: ${color}">${w.word}${nextIsWord ? ' ' : ''}</span>`;
            });

            // if audio ends early, then fill in the rest of the verse text
            if (this.chunk.textEnd < this.verse.verseText.length) {
                verseText += `${lowFocus}${this.verse.verseText.substring(this.chunk.textEnd, this.verse.verseText.length)}</span>`;
            }

            // verseText += '</span>';
            referenceText = `${lowFocus}${this.verse.bookName} ${this.verse.chapterNumber}:${this.verse.verseNumber}</span>`;
        } else {
            verseText += `${this.verse.verseText}</span>`;
            referenceText += `<span style="color: ${time >= this.bookOffset && time < this.chapterOffset ? this.verse.colors[0] : defaultColor}">${this.verse.bookName} </span>`;
            referenceText += `<span style="color: ${time >= this.chapterOffset && time < this.verseOffset ? this.verse.colors[1] : defaultColor}">${this.verse.chapterNumber}</span>`;
            referenceText += `:<span style="color: ${time >= this.verseOffset ? this.verse.colors[2] : defaultColor}">${this.verse.verseNumber}</span>`;
        }

        return {
            verseText: verseText,
            referenceText: referenceText
        };
    }
}