import IChapter from "./IChapter";

export default interface IBook {
    number: number;
    name: string;
    chapters: IChapter[];
}