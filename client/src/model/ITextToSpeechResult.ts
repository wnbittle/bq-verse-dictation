import IAudioChunk from "./IAudioChunk";
import ISynthesizedVerse from "./ISynthesizedVerse";

export default interface ITextToSpeechResult {
    verse: ISynthesizedVerse;
    chunks: IAudioChunk[];
}