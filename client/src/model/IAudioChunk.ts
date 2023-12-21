import IAudioChunkMetadata from "./IAudioChunkMetadata";

export default interface IAudioChunk {
    metadata: IAudioChunkMetadata;
    audio: ArrayBuffer;
}