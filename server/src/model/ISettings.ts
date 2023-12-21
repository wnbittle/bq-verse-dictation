import IQuality from "./IQuality";

export default interface ISettings {
    name: string;
    speechVoice: string;        // 'en-US-JaneNeural';
    speechStyle: string;        // 'sad';
    speechRate: string;         //'-10.00%';
    videoFPS: number;           // 24
    quality: IQuality;
    colors: string[];
}