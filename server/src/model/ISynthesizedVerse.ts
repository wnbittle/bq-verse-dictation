import IAudioChunkMetadata from "./IAudioChunkMetadata";
import ISelectedVerse from "./ISelectedVerse";
import ISettings from "./ISettings";

export default interface ISynthesizedVerse extends ISelectedVerse, ISettings {
    chunks: IAudioChunkMetadata[];
}