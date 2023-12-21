import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs, { write } from 'fs';
import { exec } from 'child_process';
import path from 'path';
import { promisify } from 'node:util';
import HTML5Renderer from '../../renderer/HTML5Renderer';
import ISynthesizedVerse from '../../model/ISynthesizedVerse';
import getVideoDurationInSeconds from 'get-video-duration';

const mkdir = promisify(fs.mkdir);
const rm = promisify(fs.rm);
const copyFile = promisify(fs.copyFile);
const writeFile = promisify(fs.writeFile);

const videoOnlyFileName = 'video.mp4';
const combinedFileName = 'combined.mp4';
const repeatedFileName = 'repeated.mp4';
const withReferenceFileName = 'withref.mp4';

interface IChapter {
    length: number;
    name: string;
    start: string;
}

export const GenerateVideo = async (request: express.Request, response: express.Response): Promise<void> => {
    const input: ISynthesizedVerse = request.body;

    const baseFileName = `${input.bookName}-${input.chapterNumber}-${input.verseNumber}`;
    const referenceVideoFileName = `${baseFileName}-ref.mp4`;

    // generate the video for the reference first
    {
        console.info(`Generating video for reference`);
        const chunk = input.chunks.find(c => c.type === 'reference')!;

        // generate a video for the chunk
        // create a temp directory for the work
        const id = uuidv4();
        const path = `${process.env.DATA_OUT_DIR}/${id.replace(/-/gi, '')}`;
        console.info(`Generating video in ${path}`);

        await mkdir(path);

        // render all the video frames
        const renderer = new HTML5Renderer(path, input, chunk);
        await renderer.render();
        console.info(`Frames rendered`);

        // combine the frames into a video
        await combineFrameIntoVideo(path, input.videoFPS, videoOnlyFileName);
        console.info(`Video created`);

        // combine the video and audio together
        await combineVideoAndAudio(path, videoOnlyFileName, chunk.audioFileName, referenceVideoFileName);
        console.info(`Audio added`);

        // copy it to parent folder
        await copyFile(`${path}/${referenceVideoFileName}`, `${process.env.DATA_OUT_DIR}/${referenceVideoFileName}`);
        console.info(`Result copied out`);

        // remove the folder
        await rm(path, { recursive: true, force: true });
        console.info(`clean up complete`);
    }

    // now generate videos for all the chunks
    const chapters: IChapter[] = [];
    const fileNames: string[] = [];
    for (let i = 0; i < input.chunks.length; i++) {
        const chunk = input.chunks[i];

        // skip reference (we did that above)
        if (chunk.type === 'reference') {
            continue;
        }

        // generate a video for the chunk
        // create a temp directory for the work
        const id = uuidv4();
        const path = `${process.env.DATA_OUT_DIR}/${id.replace(/-/gi, '')}`;
        console.info(`Generating video in ${path}`);

        await mkdir(path);

        // render all the video frames
        const renderer = new HTML5Renderer(path, input, chunk);
        await renderer.render();
        console.info(`Frames rendered`);

        // combine the frames into a video
        await combineFrameIntoVideo(path, input.videoFPS, videoOnlyFileName);
        console.info(`Video created`);

        // combine the video and audio together
        await combineVideoAndAudio(path, videoOnlyFileName, chunk.audioFileName, combinedFileName);
        console.info(`Audio added`);

        // repeat the video 4 more times
        await repeatVideo(path, combinedFileName, repeatedFileName, 4);
        console.info(`Repeat added`);

        // copy reference video in folder
        await copyFile(`${process.env.DATA_OUT_DIR}/${referenceVideoFileName}`, `${path}/${referenceVideoFileName}`);
        console.info(`Ref copied in`);

        // concat the reference video
        await concatVideo(path, [repeatedFileName, referenceVideoFileName], withReferenceFileName);
        console.info(`Reference added`);

        // repeat that whole thing 2 more times
        const finalVideoFileName = `${baseFileName}-part${chunk.id}.mp4`;
        await repeatVideo(path, withReferenceFileName, finalVideoFileName, 2);
        console.info(`Repeat added`);

        // move the video to parent folder
        await copyFile(`${path}/${finalVideoFileName}`, `${process.env.DATA_OUT_DIR}/${finalVideoFileName}`);
        console.info(`Result copied out`);

        // get the video duration
        const lengthInSeconds = await getVideoDurationInSeconds(`${process.env.DATA_OUT_DIR}/${finalVideoFileName}`);
        const totalLength = chapters.reduce((p, c) => c.length + p, 0);
        const minutes = Math.floor(totalLength / 60);
        const seconds = totalLength - (minutes * 60);
        const time = `${minutes.toFixed(0)}:${seconds.toFixed(0).padStart(2, '0')}`;
        console.info(`Total duration: ${time}`);
        chapters.push({
            length: lengthInSeconds,
            name: chunk.type === 'all' ? 'Whole Verse' : `Part ${chapters.length + 1}`,
            start: time
        });

        if (chunk.type === 'all') {
            // pull out a frame to use as the thumbnail
            await copyFile(`${path}/20.png`, `${process.env.DATA_OUT_DIR}/${baseFileName}-thumb.png`);
            console.info(`Thumbnail copied`);
        }

        // remove the folder
        await rm(path, { recursive: true, force: true });
        console.info(`clean up complete`);
        
        fileNames.push(finalVideoFileName);
    }

    // save a text file with chapter information
    await writeFile(`${process.env.DATA_OUT_DIR}/${baseFileName}-chapters.txt`, chapters.map(c => `${c.start} ${c.name}`).join('\r\n'));

    // finally concat all the chunks
    await concatVideo(process.env.DATA_OUT_DIR!, fileNames, `${baseFileName}.mp4`);
    console.info(`Result copied out`);

    // // and then remove the temp videos
    // const filesToCleanUp = [...fileNames, referenceVideoFileName];
    // for (let i = 0; i < filesToCleanUp.length; i++) {
    //     await rm(`${process.env.DATA_OUT_DIR}/${filesToCleanUp[i]}`);
    // }

    response.json(input);
};

const combineFrameIntoVideo = async (rootPath: string, fps: number, outputFileName: string): Promise<void> => {
    const ffmpeg = path.normalize(path.resolve(process.env.FFMPEG_PATH!));
    const cwd = path.normalize(path.resolve(rootPath));

    // ffmpeg.exe -y -framerate 24 -i %d.png -c:v libx264 -pix_fmt yuv420p test.mp4
    const command = `${ffmpeg} -y -framerate ${fps} -i %d.png -c:v libx264 -pix_fmt yuv420p ${outputFileName}`;
    console.info(command);
    return await new Promise((resolve, reject) => {
        exec(command, {
            cwd: cwd
        }, (err, stdout, stderr) => {
            resolve();
        });
    });
};

const combineVideoAndAudio = async (rootPath: string, videoFileName: string, audioFileName: string, outputFileName: string): Promise<void> => {
    const ffmpeg = path.normalize(path.resolve(process.env.FFMPEG_PATH!));
    const cwd = path.normalize(path.resolve(rootPath));

    const audioPath = path.normalize(`../${audioFileName}`);

    // ffmpeg.exe -i test.mp4 -i 44-1-1.wav -c:v copy -c:a aac output.mp4
    const command = `${ffmpeg} -y -i ${videoFileName} -i ${audioPath} -c:v copy -c:a aac ${outputFileName}`;
    console.info(command);
    return await new Promise((resolve, reject) => {
        exec(command, {
            cwd: cwd
        }, (err, stdout, stderr) => {
            resolve();
        });
    });
};

const repeatVideo = async (rootPath: string, inputFileName: string, outputFileName: string, repeatCount: number): Promise<void> => {
    const ffmpeg = path.normalize(path.resolve(process.env.FFMPEG_PATH!));
    const cwd = path.normalize(path.resolve(rootPath));

    // ffmpeg.exe -stream_loop 15 -i output.mp4 -c copy output2.mp4
    const command = `${ffmpeg} -y -stream_loop ${repeatCount} -i ${inputFileName} -c copy ${outputFileName}`;
    console.info(command);
    return await new Promise((resolve, reject) => {
        exec(command, {
            cwd: cwd
        }, (err, stdout, stderr) => {
            resolve();
        });
    });
};

const concatVideo = async (rootPath: string, videoFileNames: string[], outputFileName: string): Promise<void> => {
    const ffmpeg = path.normalize(path.resolve(process.env.FFMPEG_PATH!));
    const cwd = path.normalize(path.resolve(rootPath));

    const files = videoFileNames.map(f => `file '${f}'`).join("\n");
    const id = uuidv4().replace(/-/gi, '');
    const tempFile = `${rootPath}/${id}.txt`;
    await writeFile(tempFile, files);

    // ffmpeg -i "concat:input1.ts|input2.ts" -c copy output.mp4
    const command = `${ffmpeg} -y -f concat -safe 0 -i ${tempFile} -c copy ${outputFileName}`;
    console.info(command);
    await new Promise<void>((resolve, reject) => {
        exec(command, {
            cwd: cwd
        }, (err, stdout, stderr) => {
            resolve();
        });
    });

    await rm(tempFile);
};