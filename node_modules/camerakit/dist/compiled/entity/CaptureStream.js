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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Shutter_1 = require("./Shutter");
var Recorder_1 = require("./Recorder");
var util_1 = require("../util");
var CaptureStream = /** @class */ (function () {
    /**
     * CaptureStream provides access to streaming related functions
     * @param {Object} opts
     * @param {CaptureSource | MediaTrackConstraints | "front" | "back"} [opts.video] - Video source to create CaptureStream from
     * @param {CaptureSource | MediaTrackConstraints} [opts.audio] - Audio source to create CaptureStream from
     * @param {Partial<FallbackMediaRecorderConfig>} [opts.fallbackConfig] - Optional config for FallbackMediaRecorder
     */
    function CaptureStream(_a) {
        var video = _a.video, audio = _a.audio, fallbackConfig = _a.fallbackConfig;
        this.previewVideoSource = this.videoSource;
        this.previewAudioSource = this.audioSource;
        this.previewVideoSource = this.videoSource = video;
        this.previewAudioSource = this.audioSource = audio;
        this.fallbackConfig = fallbackConfig;
        if (!video && !audio) {
            throw new Error("No media source provided to stream");
        }
    }
    /**
     * Utility method for generating constraints for getUserMedia based on stream
     * @param {Object} [opts={}]
     * @param {("original" | "preview")} [opts.source=original] - Which stream contrains should be generated for
     * @returns {MediaStreamConstraints} Generated constrains for input source
     */
    CaptureStream.prototype.generateConstraints = function (_a) {
        var source = (_a === void 0 ? {} : _a).source;
        var videoSource = source === "preview" ? this.previewVideoSource : this.videoSource;
        var audioSource = source === "preview" ? this.previewAudioSource : this.audioSource;
        if (!videoSource) {
            throw new Error("No video source specified");
        }
        var constraints = {
            video: util_1.toTrackConstraints(videoSource)
        };
        if (audioSource) {
            constraints.audio = util_1.toTrackConstraints(audioSource);
        }
        return constraints;
    };
    /**
     * Helper function for choosing correct media stream
     * @param {Object} opts
     * @param {("original" | "preview")} [opts.source=original] - Which stream should be selected
     * @returns {MediaStream} The media stream all changes should be applied to
     */
    CaptureStream.prototype.selectMediaStream = function (_a) {
        var source = (_a === void 0 ? {} : _a).source;
        return source === "preview" ? this.previewStream : this.mediaStream;
    };
    /**
     * Generates constraints and requests media stream
     * @returns {Promise<MediaStream>} Newly created MediaStream to be used
     */
    CaptureStream.prototype.initalizeMediaStream = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, navigator.mediaDevices.getUserMedia(this.generateConstraints({ source: "original" }))];
                    case 1:
                        _a.mediaStream = _b.sent();
                        this.previewStream = this.mediaStream.clone();
                        return [2 /*return*/, this.mediaStream];
                }
            });
        });
    };
    /**
     * Sets up internal Shutter instance from MediaStream
     * @returns {Promise<Shutter>} Newly created shutter instance
     */
    CaptureStream.prototype.initalizeShutter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var original, preview;
            return __generator(this, function (_a) {
                original = util_1.createVideoElement(this.mediaStream);
                preview = util_1.createVideoElement(this.previewStream);
                this.shutter = new Shutter_1.Shutter({ original: original, preview: preview });
                return [2 /*return*/, this.shutter];
            });
        });
    };
    /**
     * Sets up internal Recorder instance from MediaStream
     * @returns {Promise<Recorder>} Newly created recorder instance
     */
    CaptureStream.prototype.initalizeRecorder = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.recorder = new Recorder_1.Recorder({
                    original: this.mediaStream,
                    preview: this.previewStream,
                    fallbackConfig: this.fallbackConfig
                });
                return [2 /*return*/, this.recorder];
            });
        });
    };
    /**
     * Requests stream permissions, generates Shutter and recorder.
     */
    CaptureStream.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initalizeMediaStream()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.initalizeShutter()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.initalizeRecorder()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Retrieves preview with appropriate attributes used for display
     * @param {Object} [opts={}]
     * @param {("original" | "preview")} [opts.source=original] - Which stream which to recieve a preview for
     * @returns {HTMLVideoElement} A video element watching the MediaStream
     */
    CaptureStream.prototype.getPreview = function (_a) {
        var source = (_a === void 0 ? {} : _a).source;
        var e_1, _b;
        var stream = this.selectMediaStream({ source: source }).clone();
        var audioTracks = stream.getAudioTracks();
        try {
            for (var audioTracks_1 = __values(audioTracks), audioTracks_1_1 = audioTracks_1.next(); !audioTracks_1_1.done; audioTracks_1_1 = audioTracks_1.next()) {
                var track = audioTracks_1_1.value;
                stream.removeTrack(track);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (audioTracks_1_1 && !audioTracks_1_1.done && (_b = audioTracks_1.return)) _b.call(audioTracks_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return util_1.createVideoElement(stream);
    };
    /**
     * Sets the resolution of the specified media stream
     * @param {Object} [opts={}]
     * @param {number} [opts.width] - Video width
     * @param {number} [opts.height] - Video height
     * @param {number} [opts.aspect] - Video aspect ratio
     * @param {("original" | "preview")} [opts.source=original] - Which stream the resolution should change for
     * @returns {Promise<MediaStream>} The updated MediaStream with new resolution
     */
    CaptureStream.prototype.setResolution = function (_a) {
        var _b = _a === void 0 ? {} : _a, width = _b.width, height = _b.height, aspect = _b.aspect, source = _b.source;
        return __awaiter(this, void 0, void 0, function () {
            var stream, track, constraints;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        stream = this.selectMediaStream({ source: source });
                        track = stream.getVideoTracks()[0];
                        if (!track) {
                            throw new Error("No video stream to set resolution");
                        }
                        constraints = track.getConstraints();
                        if (width) {
                            constraints.width = { exact: width };
                        }
                        if (height) {
                            constraints.height = { exact: height };
                        }
                        if (aspect) {
                            constraints.aspectRatio = { exact: aspect };
                        }
                        return [4 /*yield*/, track.applyConstraints(constraints)];
                    case 1:
                        _c.sent();
                        return [2 /*return*/, this.selectMediaStream({ source: source })];
                }
            });
        });
    };
    /**
     * Re-sets the audio/video source for the specified stream
     * @param {Object} [opts={}]
     * @param {CaptureSource | MediaTrackConstraints | "front" | "back"} [opts.video] - New video source
     * @param {CaptureSource | MediaTrackConstraints} [opts.audio] - New audio source
     * @param {("original" | "preview")} [opts.source=original] - Which stream the to set the new sources
     * @returns {Promise<MediaStream>} The new stream with updated source
     */
    CaptureStream.prototype.setSource = function (_a) {
        var video = _a.video, audio = _a.audio, source = _a.source;
        return __awaiter(this, void 0, void 0, function () {
            var newStream;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!video && !audio) {
                            throw new Error("No media source provided to stream");
                        }
                        if (source === "preview") {
                            this.previewVideoSource = video;
                            this.previewAudioSource = audio;
                        }
                        else {
                            this.videoSource = video;
                            this.audioSource = audio;
                        }
                        return [4 /*yield*/, navigator.mediaDevices.getUserMedia(this.generateConstraints({ source: source }))];
                    case 1:
                        newStream = _b.sent();
                        if (source === "preview") {
                            this.previewStream = newStream;
                        }
                        else {
                            this.mediaStream = newStream;
                        }
                        return [2 /*return*/, newStream];
                }
            });
        });
    };
    /**
     * Retrieves the raw MediaStream for use in video display
     * @param opts
     * @param {("original" | "preview")} [opts.source=original] - Which stream to use
     */
    CaptureStream.prototype.getMediaStream = function (_a) {
        var source = (_a === void 0 ? {} : _a).source;
        return source === "preview" ? this.previewStream : this.mediaStream;
    };
    /**
     * Closes all open video streams for when usage is complete
     */
    CaptureStream.prototype.destroy = function () {
        var e_2, _a;
        var tracks = this.mediaStream
            .getTracks()
            .concat(this.previewStream.getTracks());
        try {
            for (var tracks_1 = __values(tracks), tracks_1_1 = tracks_1.next(); !tracks_1_1.done; tracks_1_1 = tracks_1.next()) {
                var track = tracks_1_1.value;
                track.stop();
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (tracks_1_1 && !tracks_1_1.done && (_a = tracks_1.return)) _a.call(tracks_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    return CaptureStream;
}());
exports.CaptureStream = CaptureStream;
//# sourceMappingURL=CaptureStream.js.map