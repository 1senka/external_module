"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var entity_1 = require("../entity");
var util_1 = require("../util");
var events_1 = require("./events");
var logger_1 = require("./logger");
var settings_1 = require("./settings");
/**
 * Returns media devices available to browser
 * @param {Object} [opts]
 * @param {boolean} [opts.noRequest] - Return devices without requesting audio/video permissions
 * @returns {Promise<{audio: Array<CaptureSource>, video: Array<CaptureSource>}>} Available audio and video sources
 */
function getDevices(opts) {
    if (opts === void 0) { opts = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var video, audio, devices;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!opts.noRequest) return [3 /*break*/, 2];
                    return [4 /*yield*/, util_1.requestAndCloseStream()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    video = [];
                    audio = [];
                    return [4 /*yield*/, navigator.mediaDevices.enumerateDevices()];
                case 3:
                    devices = _a.sent();
                    devices.forEach(function (device) {
                        switch (device.kind) {
                            case "videoinput":
                                video.push(new entity_1.CaptureSource({
                                    device: device,
                                    label: device.label || "Unnamed video input"
                                }));
                                break;
                            case "audioinput":
                                audio.push(new entity_1.CaptureSource({
                                    device: device,
                                    label: device.label || "Unnamed audio input"
                                }));
                                break;
                            default:
                                logger_1.default.log("Other input type detected:", device.kind);
                        }
                    });
                    return [2 /*return*/, { audio: audio, video: video }];
            }
        });
    });
}
exports.getDevices = getDevices;
/**
 * Creates capture stream via chosen CaptureSource's
 * @param {Object} [opts]
 * @param {CaptureSource | "front" | "back"} [opts.video] - Video source to create CaptureStream from
 * @param {CaptureSource} [opts.video] - Audio source to create CaptureStream from
 * @returns {Promise<CaptureStream>} Freshly created CaptureStream from sources
 */
function createCaptureStream(_a) {
    var video = _a.video, audio = _a.audio, fallbackConfig = _a.fallbackConfig;
    return __awaiter(this, void 0, void 0, function () {
        var captureStream;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    captureStream = new entity_1.CaptureStream({ video: video, audio: audio, fallbackConfig: fallbackConfig });
                    return [4 /*yield*/, captureStream.init()];
                case 1:
                    _b.sent();
                    return [2 /*return*/, captureStream];
            }
        });
    });
}
exports.createCaptureStream = createCaptureStream;
/**
 * Registers a newly created video element and tells existing ones to restart
 * @param {HTMLVideoElement} [video] - Video source to be registered
 */
function registerVideo(video) {
    if (!video) {
        // Tell all the other video elements they need to be restarted
        events_1.triggerEvent("video");
        return;
    }
    // Register this video for restarting incase we do it internally
    util_1.registerVideoElement(video);
}
exports.registerVideo = registerVideo;
/**
 * Enables saving of images to LocalStorage or SessionStorage
 * @param {StorageMethod} [method] - String representing method to use
 */
function enableStorage(method) {
    if (method !== undefined) {
        settings_1.default.storageMethod = method;
    }
    else {
        settings_1.default.storageMethod = "localStorage";
    }
}
exports.enableStorage = enableStorage;
/**
 * Disables local storing of images
 */
function disableStorage() {
    settings_1.default.storageMethod = null;
}
exports.disableStorage = disableStorage;
/**
 * Enables debug features such as console logging
 */
function enableDebug() {
    settings_1.default.debug = true;
}
exports.enableDebug = enableDebug;
/**
 * Disables any debug features
 */
function disableDebug() {
    settings_1.default.debug = false;
}
exports.disableDebug = disableDebug;
//# sourceMappingURL=index.js.map