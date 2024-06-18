export declare class NativeMediaRecorder {
    private stream;
    private mediaRecorder;
    private blobs;
    private latestRecording;
    private mimeType;
    paused: boolean;
    static isTypeSupported(mimeType: string): boolean;
    constructor(stream: MediaStream);
    private destroy;
    private createRecorder;
    setMimeType(mimeType: string): boolean;
    resetRecording(): void;
    resume(): Promise<void>;
    pause(): Promise<void>;
    start(): Promise<void>;
    stop(): Promise<Blob>;
    getLatestRecording(): Blob | null;
}
