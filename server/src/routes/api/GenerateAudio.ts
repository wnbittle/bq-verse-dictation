import express from 'express';
import fs from 'fs';
import { promisify } from 'node:util';

import IGenerateRequest from '../../model/IGenerateRequest';
import TextToSpeechConverter from '../../speech/TextToSpeechConverter';

const writeFile = promisify(fs.writeFile);

export const GenerateAudio = async (request: express.Request, response: express.Response): Promise<void> => {
    const input: IGenerateRequest = request.body;

    const baseFileName = `${input.verse.bookName}-${input.verse.chapterNumber}-${input.verse.verseNumber}`;
    const jsonFileName = `${baseFileName}.json`;

    const converter = new TextToSpeechConverter(input.settings, input.verse);
    const result = await converter.convert();
 
    for (let i = 0; i < result.chunks.length; i++) {
        const chunk = result.chunks[i];
        console.info("Saving audio file");
        await writeFile(`${process.env.DATA_OUT_DIR}/${chunk.metadata.audioFileName}`, new Uint8Array(chunk.audio), null);
    }

    console.info("Saving json file");
    await writeFile(`${process.env.DATA_OUT_DIR}/${jsonFileName}`, JSON.stringify(result.verse), null);

    console.info("Files saved successfully");
    response.json(result.verse);
};