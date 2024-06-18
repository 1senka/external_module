import { CaptureStream, CaptureSource } from "../entity";
import { StorageMethod, FallbackMediaRecorderConfig } from "../types";
/**
 * Returns media devices available to browser
 * @param {Object} [opts]
 * @param {boolean} [opts.noRequest] - Return devices without requesting audio/video permissions
 * @returns {Promise<{audio: Array<CaptureSource>, video: Array<CaptureSource>}>} Available audio and video sources
 */
export declare function getDevices(opts?: {
    noRequest?: boolean;
}): Promise<{
    audio: CaptureSource[];
    video: CaptureSource[];
}>;
/**
 * Creates capture stream via chosen CaptureSource's
 * @param {Object} [opts]
 * @param {CaptureSource | "front" | "back"} [opts.video] - Video source to create CaptureStream from
 * @param {CaptureSource} [opts.video] - Audio source to create CaptureStream from
 * @returns {Promise<CaptureStream>} Freshly created CaptureStream from sources
 */
export declare function createCaptureStream({ video, audio, fallbackConfig }: {
    video?: CaptureSource | "front" | "back";
    audio?: CaptureSource;
    fallbackConfig?: Partial<FallbackMediaRecorderConfig>;
}): Promise<CaptureStream>;
/**
 * Registers a newly created video element and tells existing ones to restart
 * @param {HTMLVideoElement} [video] - Video source to be registered
 */
export declare function registerVideo(video?: HTMLVideoElement): void;
/**
 * Enables saving of images to LocalStorage or SessionStorage
 * @param {StorageMethod} [method] - String representing method to use
 */
export declare function enableStorage(method?: StorageMethod): void;
/**
 * Disables local storing of images
 */
export declare function disableStorage(): void;
/**
 * Enables debug features such as console logging
 */
export declare function enableDebug(): void;
/**
 * Disables any debug features
 */
export declare function disableDebug(): void;
