declare type Logger = {
    log: (...args: any[]) => any;
    error: (...args: any[]) => any;
};
declare function setLogger(customLogger: Logger): void;
declare function log(...args: any[]): void;
declare function error(...args: any[]): void;
declare const _default: {
    setLogger: typeof setLogger;
    log: typeof log;
    error: typeof error;
};
export default _default;
