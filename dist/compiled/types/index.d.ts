export declare type StorageMethod = "localStorage" | "sessionStorage" | null;
export declare type CKSettings = {
    debug: boolean;
    storageMethod: StorageMethod;
};
export declare type FallbackMediaRecorderConfig = {
    base: string;
    mimeType: string;
    width: number;
    height: number;
    bitrate: number;
    framerate: number;
};
