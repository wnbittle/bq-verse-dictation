import express from 'express';
import fs from 'fs';
import { promisify } from 'util';

const stat = promisify(fs.stat);

export const PreviewAudio = async (request: express.Request, response: express.Response): Promise<void> => {
    const fileName = request.query.fileName as string;

    var fileDetails = await stat(fileName);

    // finally stream audio from file
    // https://medium.com/@yelee2369/node-js-streaming-audio-files-10dd5e8670d0
    const range = request.headers.range;
    let readStream;

    // if there is no request about range
    if (range !== undefined) {
        // remove 'bytes=' and split the string by '-'
        var parts = range.replace(/bytes=/, "").split("-");

        var partial_start = parts[0];
        var partial_end = parts[1];

        // if ((isNaN(partial_start) && partial_start.length > 1) || (isNaN(partial_end) && partial_end.length > 1)) {
        //     response.sendStatus(500);
        //     return;
        // }
        // convert string to integer (start)
        var start = parseInt(partial_start, 10);
        // convert string to integer (end)
        // if partial_end doesn't exist, end equals whole file size - 1
        var end = partial_end ? parseInt(partial_end, 10) : fileDetails.size - 1;
        // content length
        var content_length = (end - start) + 1;

        response.status(206).header({
            'Content-Type': 'audio/mpeg',
            'Content-Length': content_length,
            'Content-Range': "bytes " + start + "-" + end + "/" + fileDetails.size
        });

        // Read the stream of starting & ending part
        readStream = fs.createReadStream(fileName, { start: start, end: end });
    } else {
        response.header({
            'Content-Type': 'audio/mpeg',
            'Content-Length': fileDetails.size
        });
        readStream = fs.createReadStream(fileName);
    }
    
    readStream.pipe(response);
};