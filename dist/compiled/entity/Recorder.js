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
var NativeMediaRecorder_1 = require("./NativeMediaRecorder");
var FallbackMediaRecorder_1 = require("./FallbackMediaRecorder");
var util_1 = require("../util");
var Recorder = /** @class */ (function () {
    /**
     * Recorder is used to take recordings of the CaptureStream
     * @param {Object} opts
     * @param {MediaStream} opts.original - The raw, higher resolution stream to record
     * @param {MediaStream} opts.preview - Another stream, can be used as a downscaled preview of the original stream
     * @param {Partial<FallbackMediaRecorderConfig>} [opts.fallbackConfig] - Optional config for FallbackMediaRecorder
     */
    function Recorder(_a) {
        var original = _a.original, preview = _a.preview, fallbackConfig = _a.fallbackConfig;
        this.mediaStream = original;
        this.previewStream = preview;
        this.fallbackConfig = fallbackConfig || undefined;
    }
    /**
     * Helper function for choosing correct media stream
     * @param {Object} opts
     * @param {("original" | "preview")} [opts.source=original] - Which stream should be selected
     * @returns {MediaStream} The media stream all changes should be applied to
     */
    Recorder.prototype.selectMediaStream = function (_a) {
        var source = (_a === void 0 ? {} : _a).source;
        return source === "preview" ? this.previewStream : this.mediaStream;
    };
    /**
     * Starts or resumes video recording on specified stream
     * @param {Object} [opts={}]
     * @param {("original" | "preview")} [opts.source=original] - Which stream should be selected
     */
    Recorder.prototype.start = function (opts) {
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var ChosenMediaRecorder;
            return __generator(this, function (_a) {
                if (this.mediaRecorder && this.mediaRecorder.paused) {
                    this.mediaRecorder.resume();
                }
                ChosenMediaRecorder = typeof MediaRecorder === "undefined"
                    ? FallbackMediaRecorder_1.FallbackMediaRecorder
                    : NativeMediaRecorder_1.NativeMediaRecorder;
                this.mediaRecorder = new ChosenMediaRecorder(this.selectMediaStream(opts), this.fallbackConfig);
                return [2 /*return*/, this.mediaRecorder.start()];
            });
        });
    };
    /**
     * Temporarily pauses video recording
     * @returns {Promise<void>}
     */
    Recorder.prototype.pause = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.mediaRecorder) {
                    return [2 /*return*/, this.mediaRecorder.pause()];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Stops video recording
     * @returns {Promise<(Blob | null)>} The completed video recording stored in a Blob
     */
    Recorder.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.mediaRecorder) {
                    return [2 /*return*/, this.mediaRecorder.stop()];
                }
                return [2 /*return*/, null];
            });
        });
    };
    /**
     * Retrieves the latest video recorded by the Recorder
     * @returns {(Blob | null)} The video recording stored in a Blob
     */
    Recorder.prototype.getLatestRecording = function () {
        if (this.mediaRecorder) {
            return this.mediaRecorder.getLatestRecording();
        }
        return null;
    };
    /**
     * Downloads the latest video recording to the browser
     * @param {string} [filename] - Name to use for downloaded video
     * @returns {boolean} If the recording was successfully downloaded
     */
    Recorder.prototype.downloadLatestRecording = function (filename) {
        if (!this.mediaRecorder) {
            return false;
        }
        var latestRecording = this.mediaRecorder.getLatestRecording();
        if (!latestRecording) {
            return false;
        }
        return util_1.downloadVideo(latestRecording, filename);
    };
    /**
     * Sets the mime type for all recorded videos
     * @param {string} mimeType - Mime type to be used
     * @returns {boolean} If the mime type was set successfully
     */
    Recorder.prototype.setMimeType = function (mimeType) {
        var ChosenMediaRecorder = typeof MediaRecorder === "undefined"
            ? FallbackMediaRecorder_1.FallbackMediaRecorder
            : NativeMediaRecorder_1.NativeMediaRecorder;
        if (ChosenMediaRecorder.isTypeSupported(mimeType) && this.mediaRecorder) {
            return this.mediaRecorder.setMimeType(mimeType);
        }
        return false;
    };
    return Recorder;
}());
exports.Recorder = Recorder;
//# sourceMappingURL=Recorder.js.map