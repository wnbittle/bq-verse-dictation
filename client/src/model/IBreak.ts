export default interface IBreak {
    /** The break point number */
    id: number;

    /** The "word" at the breakpoint */
    text: string;

    /** The start location in the original text of the breakpoint word */
    textStart: number;

    /** The end location in the original text of the breakpoint word */
    textEnd: number;

    /** The word length */
    textLength: number;

    /** The break location.  Same as end location. */
    textPosition: number;
}