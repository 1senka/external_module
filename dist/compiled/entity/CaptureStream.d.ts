import { Shutter } from "./Shutter";
import { Recorder } from "./Recorder";
import { CaptureSource } from "./CaptureSource";
import { FallbackMediaRecorderConfig } from "../types";
export declare class CaptureStream {
    private mediaStream;
    private previewStream;
    private videoSource;
    private audioSource;
    private previewVideoSource;
    private previewAudioSource;
    private fallbackConfig;
    shutter: Shutter;
    recorder: Recorder;
    /**
     * CaptureStream provides access to streaming related functions
     * @param {Object} opts
     * @param {CaptureSource | MediaTrackConstraints | "front" | "back"} [opts.video] - Video source to create CaptureStream from
     * @param {CaptureSource | MediaTrackConstraints} [opts.audio] - Audio source to create CaptureStream from
     * @param {Partial<FallbackMediaRecorderConfig>} [opts.fallbackConfig] - Optional config for FallbackMediaRecorder
     */
    constructor({ video, audio, fallbackConfig }: {
        video?: CaptureSource | MediaTrackConstraints | "front" | "back";
        audio?: CaptureSource | MediaTrackConstraints;
        fallbackConfig?: Partial<FallbackMediaRecorderConfig>;
    });
    /**
     * Utility method for generating constraints for getUserMedia based on stream
     * @param {Object} [opts={}]
     * @param {("original" | "preview")} [opts.source=original] - Which stream contrains should be generated for
     * @returns {MediaStreamConstraints} Generated constrains for input source
     */
    private generateConstraints;
    /**
     * Helper function for choosing correct media stream
     * @param {Object} opts
     * @param {("original" | "preview")} [opts.source=original] - Which stream should be selected
     * @returns {MediaStream} The media stream all changes should be applied to
     */
    private selectMediaStream;
    /**
     * Generates constraints and requests media stream
     * @returns {Promise<MediaStream>} Newly created MediaStream to be used
     */
    private initalizeMediaStream;
    /**
     * Sets up internal Shutter instance from MediaStream
     * @returns {Promise<Shutter>} Newly created shutter instance
     */
    private initalizeShutter;
    /**
     * Sets up internal Recorder instance from MediaStream
     * @returns {Promise<Recorder>} Newly created recorder instance
     */
    private initalizeRecorder;
    /**
     * Requests stream permissions, generates Shutter and recorder.
     */
    init(): Promise<void>;
    /**
     * Retrieves preview with appropriate attributes used for display
     * @param {Object} [opts={}]
     * @param {("original" | "preview")} [opts.source=original] - Which stream which to recieve a preview for
     * @returns {HTMLVideoElement} A video element watching the MediaStream
     */
    getPreview({ source }?: {
        source?: "original" | "preview";
    }): HTMLVideoElement;
    /**
     * Sets the resolution of the specified media stream
     * @param {Object} [opts={}]
     * @param {number} [opts.width] - Video width
     * @param {number} [opts.height] - Video height
     * @param {number} [opts.aspect] - Video aspect ratio
     * @param {("original" | "preview")} [opts.source=original] - Which stream the resolution should change for
     * @returns {Promise<MediaStream>} The updated MediaStream with new resolution
     */
    setResolution({ width, height, aspect, source }?: {
        width?: number;
        height?: number;
        aspect?: number;
        source?: "original" | "preview";
    }): Promise<MediaStream>;
    /**
     * Re-sets the audio/video source for the specified stream
     * @param {Object} [opts={}]
     * @param {CaptureSource | MediaTrackConstraints | "front" | "back"} [opts.video] - New video source
     * @param {CaptureSource | MediaTrackConstraints} [opts.audio] - New audio source
     * @param {("original" | "preview")} [opts.source=original] - Which stream the to set the new sources
     * @returns {Promise<MediaStream>} The new stream with updated source
     */
    setSource({ video, audio, source }: {
        video?: CaptureSource;
        audio?: CaptureSource;
        source?: "original" | "preview";
    }): Promise<MediaStream>;
    /**
     * Retrieves the raw MediaStream for use in video display
     * @param opts
     * @param {("original" | "preview")} [opts.source=original] - Which stream to use
     */
    getMediaStream({ source }?: {
        source?: "original" | "preview";
    }): MediaStream;
    /**
     * Closes all open video streams for when usage is complete
     */
    destroy(): void;
}
