import { FallbackMediaRecorderConfig } from "../types";
export declare class FallbackMediaRecorder {
    private config;
    private stream;
    private mediaRecorder;
    private blobs;
    private latestRecording;
    private mimeType;
    paused: boolean;
    static isTypeSupported(mimeType: string): boolean;
    constructor(stream: MediaStream, config?: Partial<FallbackMediaRecorderConfig>);
    private createRecorder;
    private stopAndAwait;
    setMimeType(mimeType: string): boolean;
    resetRecording(): void;
    resume(): Promise<void>;
    pause(): Promise<void>;
    start(): Promise<void>;
    stop(): Promise<Blob>;
    getLatestRecording(): Blob | null;
}
