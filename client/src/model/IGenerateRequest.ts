import ISelectedVerse from "./ISelectedVerse";
import ISettings from "./ISettings";

export default interface IGenerateRequest {
    settings: ISettings;
    verse: ISelectedVerse;
}