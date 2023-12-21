import IAlias from "./IAlias";
import IBreak from "./IBreak";
import ISizing from "./ISizing";

export default interface ISelectedVerse {
    /** The verse id {booknumber}-{chapternumber}-{versenumber} */
    id: string;

    /** The verse of study number */
    studyNumber: number;

    /** The book number */
    bookNumber: number;

    /** The book name */
    bookName: string;

    /** The chapter number */
    chapterNumber: number;

    /** The verse number */
    verseNumber: number;

    /** The verse text */
    verseText: string;

    /** The user-defined break points for chunking the speech synthesis output */
    breaks: IBreak[];

    /** The user-defined aliases for correcting pronunciation */
    aliases: IAlias[];

    /** The render sizing */
    sizing: ISizing;
}