import express from 'express';
import IGenerateRequest from '../../model/IGenerateRequest';
import TextToSpeechConverter from '../../speech/TextToSpeechConverter';
import { promisify } from 'node:util';
import fs from 'fs';
import crypto from 'crypto';
import { Mutex } from 'async-mutex';

const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);

const mutex = new Mutex();

export const PrepareAudioPreview = async (request: express.Request, response: express.Response): Promise<void> => {
    const input: IGenerateRequest = request.body;

    const baseFileName = `${input.verse.bookName}-${input.verse.chapterNumber}-${input.verse.verseNumber}`;

    try {
        console.info(`Attempting to create tmp folder`);
        await mkdir(process.env.TEMP_OUT_DIR!, {
            recursive: true
        });
    } catch (err: any) {
        if (err.code == 'EEXIST') {
            // then we can ignore
        } else {
            throw err;
        }
    }

    // checksum the string
    // https://stackoverflow.com/questions/46860736/how-to-generate-and-verify-checksum-of-the-given-string-in-node-js
    var str = `${input.verse.id}${JSON.stringify(input.verse.aliases)}`;
    var cs = crypto.createHash('md5').update(str).digest("hex");
    console.info(`Checksum computed: ${cs}`);

    const fileName = `${process.env.TEMP_OUT_DIR}/${baseFileName}-${cs}.wav`;
    console.info(`Filename: ${fileName}`);

    const release = await mutex.acquire();
    try {
        // find a file with the the name {id}-{checksum}.wav
        // if not found, generate file & save locally

        if (!fs.existsSync(fileName)) {
            console.info(`File doesn't exist, converting: ${fileName}`);
            // generate the file
            const converter = new TextToSpeechConverter(input.settings, input.verse);
            const result = await converter.convert(false);
            console.info(`Chunk count: ${result.chunks.length}`);

            for (let i = 0; i < result.chunks.length; i++) {
                const chunk = result.chunks[i];
                console.info("Saving audio file");
                await writeFile(fileName, new Uint8Array(chunk.audio), null);
            }
        }
    } finally {
        release();
    }

    response.json({
        src: fileName
    });
};