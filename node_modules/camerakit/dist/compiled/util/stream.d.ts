import { CaptureSource } from "../entity";
export declare function closeStream(stream: MediaStream): Promise<void>;
export declare function requestAndCloseStream(opts?: MediaStreamConstraints): Promise<MediaStream>;
export declare function getVideoSpecs(stream: MediaStream): {
    width: number;
    height: number;
    framerate: number;
} | null;
export declare function registerVideoElement(video: HTMLVideoElement): void;
export declare function createVideoElement(stream: MediaStream): HTMLVideoElement;
export declare function toTrackConstraints(input: CaptureSource | MediaTrackConstraints | "front" | "back" | undefined): MediaTrackConstraints;
