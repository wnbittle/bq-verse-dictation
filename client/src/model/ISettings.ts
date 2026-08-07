import IQuality from "./IQuality";
import IVoice from "./IVoice";

export default interface ISettings {
    name: string;
    voice: IVoice;
    videoFPS: number;           // 24
    quality: IQuality;
    colors: string[];
}