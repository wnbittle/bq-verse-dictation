import IBookmarkOffset from "./IBookmarkOffset";
import IWordOffset from "./IWordOffset";

export default interface IAudioChunkMetadata {
    /** The chunk number */
    id: number;

    /** 
     * The type of chunk:
     * - all - the entire audio
     * - chunk - a piece of the audio
     * - reference - just the verse reference
     */
    type: 'all' | 'chunk' | 'reference';

    /** The filename for the audio when written to disk */
    audioFileName: string;

    /** The start offset in ticks (1 tick = 100 nanoseconds) */
    startOffset: number;

    /** The end offset in ticks (1 tick = 100 nanoseconds) (start + duration) */
    endOffset: number;

    /** The duration in ticks (1 tick = 100 nanoseconds) */
    duration: number;

    /** The start offset in the SSML */
    textStart: number;

    /** The end offset in the SSML */
    textEnd: number;

    /** The length in the SSML */
    textLength: number;

    /** The bookmark offsets in the audio */
    bookmarks: IBookmarkOffset[];

    /** The word offsets in the audio */
    words: IWordOffset[];
}