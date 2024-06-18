declare type CallbackFunction = (opts?: Object) => any;
export declare function triggerEvent(event: string, opts?: Object): boolean;
export declare function registerEvent(event: string, callback: CallbackFunction): void;
export declare function unregisterEvent(event: string, callback: CallbackFunction): boolean;
export declare function unregisterAllEvents(event: string): void;
export {};
