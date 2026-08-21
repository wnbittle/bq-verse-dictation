import IAlias from "./IAlias";
import IBreak from "./IBreak";
import IPhenome from "./IPhenome";
import ISizing from "./ISizing";
import IVoice from "./IVoice";

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

    /** The user-defined phenomes for correcting pronunciation */
    phenomes: IPhenome[];

    /** The render sizing */
    sizing: ISizing;
    
    /** The voice for the verse */
    voice: IVoice;
}