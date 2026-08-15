import IQuality from "./IQuality";
import IVoice from "./IVoice";

export default interface ISettings {
    name: string;
    voice: IVoice;
    chunkRepeatCount: number;        // 4
    chunkWithReferenceRepeatCount: number; // 2
    videoFPS: number;           // 24
    quality: IQuality;
    colors: string[];
}