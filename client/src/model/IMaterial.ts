import ISelectedVerse from "./ISelectedVerse";
import ISettings from "./ISettings";

export default interface IMaterial {
    settings: ISettings;
    verses: ISelectedVerse[];
}