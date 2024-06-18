import { FallbackMediaRecorderConfig } from "../types";
export declare class Recorder {
    private mediaRecorder;
    private mediaStream;
    private previewStream;
    private fallbackConfig;
    /**
     * Recorder is used to take recordings of the CaptureStream
     * @param {Object} opts
     * @param {MediaStream} opts.original - The raw, higher resolution stream to record
     * @param {MediaStream} opts.preview - Another stream, can be used as a downscaled preview of the original stream
     * @param {Partial<FallbackMediaRecorderConfig>} [opts.fallbackConfig] - Optional config for FallbackMediaRecorder
     */
    constructor({ original, preview, fallbackConfig }: {
        original: MediaStream;
        preview: MediaStream;
        fallbackConfig?: Partial<FallbackMediaRecorderConfig>;
    });
    /**
     * Helper function for choosing correct media stream
     * @param {Object} opts
     * @param {("original" | "preview")} [opts.source=original] - Which stream should be selected
     * @returns {MediaStream} The media stream all changes should be applied to
     */
    private selectMediaStream;
    /**
     * Starts or resumes video recording on specified stream
     * @param {Object} [opts={}]
     * @param {("original" | "preview")} [opts.source=original] - Which stream should be selected
     */
    start(opts?: {
        source?: "original" | "preview";
    }): Promise<void>;
    /**
     * Temporarily pauses video recording
     * @returns {Promise<void>}
     */
    pause(): Promise<void>;
    /**
     * Stops video recording
     * @returns {Promise<(Blob | null)>} The completed video recording stored in a Blob
     */
    stop(): Promise<Blob | null>;
    /**
     * Retrieves the latest video recorded by the Recorder
     * @returns {(Blob | null)} The video recording stored in a Blob
     */
    getLatestRecording(): Blob | null;
    /**
     * Downloads the latest video recording to the browser
     * @param {string} [filename] - Name to use for downloaded video
     * @returns {boolean} If the recording was successfully downloaded
     */
    downloadLatestRecording(filename?: string): boolean;
    /**
     * Sets the mime type for all recorded videos
     * @param {string} mimeType - Mime type to be used
     * @returns {boolean} If the mime type was set successfully
     */
    setMimeType(mimeType: string): boolean;
}
