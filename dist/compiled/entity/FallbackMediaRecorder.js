"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var events_1 = require("../main/events");
var util_1 = require("../util");
var logger_1 = require("../main/logger");
var path = require("path");
var FediaRecorder = require("webm-media-recorder");
var WORKER_NAME = "encoderWorker.umd.js";
var WASM_NAME = "WebMOpusEncoder.wasm";
var DEFAULT_CONFIG = {
    base: "",
    mimeType: "video/webm",
    width: 640,
    height: 480,
    framerate: 30,
    bitrate: 1200
};
var FallbackMediaRecorder = /** @class */ (function () {
    function FallbackMediaRecorder(stream, config) {
        this.mimeType = "video/webm";
        // Stream must be cloned, otherwise there are audio recording issues
        this.stream = stream.clone();
        this.blobs = [];
        this.mediaRecorder = null;
        this.config = __assign({}, DEFAULT_CONFIG, util_1.getVideoSpecs(stream), config);
    }
    FallbackMediaRecorder.isTypeSupported = function (mimeType) {
        return FediaRecorder.isTypeSupported(mimeType);
    };
    FallbackMediaRecorder.prototype.createRecorder = function () {
        var _this = this;
        this.mediaRecorder = null;
        try {
            this.mediaRecorder = new FediaRecorder(this.stream, {
                mimeType: this.mimeType,
                videoBitsPerSecond: this.config.bitrate,
                width: this.config.width,
                height: this.config.height,
                framerate: this.config.framerate
            }, {
                encoderWorkerFactory: function () {
                    return new Worker(path.join(_this.config.base, WORKER_NAME));
                },
                WebmOpusEncoderWasmPath: path.join(this.config.base, WASM_NAME)
            });
        }
        catch (e) {
            logger_1.default.error("Exception while creating MediaRecorder:", e);
            return;
        }
        if (this.mediaRecorder) {
            this.mediaRecorder.addEventListener("videoplaying", function () {
                events_1.triggerEvent("video");
            });
            this.mediaRecorder.addEventListener("dataavailable", function (event) {
                if (event.data && event.data.size > 0) {
                    _this.blobs.push(event.data);
                }
            });
            this.mediaRecorder.start();
        }
        logger_1.default.log("MediaRecorder started", this.mediaRecorder);
    };
    FallbackMediaRecorder.prototype.stopAndAwait = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        if (_this.mediaRecorder) {
                            _this.mediaRecorder.addEventListener("stop", function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    resolve();
                                    return [2 /*return*/];
                                });
                            }); });
                            _this.mediaRecorder.stop();
                        }
                    })];
            });
        });
    };
    FallbackMediaRecorder.prototype.setMimeType = function (mimeType) {
        this.mimeType = mimeType;
        return true;
    };
    FallbackMediaRecorder.prototype.resetRecording = function () {
        this.blobs = [];
        this.paused = false;
        this.latestRecording = null;
    };
    FallbackMediaRecorder.prototype.resume = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.mediaRecorder) {
                    this.mediaRecorder.resume();
                    this.paused = false;
                }
                return [2 /*return*/];
            });
        });
    };
    FallbackMediaRecorder.prototype.pause = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.mediaRecorder) {
                    this.mediaRecorder.pause();
                    this.paused = true;
                }
                return [2 /*return*/];
            });
        });
    };
    FallbackMediaRecorder.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.paused) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.resume()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        this.createRecorder();
                        return [2 /*return*/];
                }
            });
        });
    };
    FallbackMediaRecorder.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: 
                    // Stops recorder properly and awaits `stop` event
                    return [4 /*yield*/, this.stopAndAwait()];
                    case 1:
                        // Stops recorder properly and awaits `stop` event
                        _b.sent();
                        _a = this;
                        return [4 /*yield*/, util_1.injectMetadata(new Blob(this.blobs, {
                                type: this.mimeType
                            }))];
                    case 2:
                        _a.latestRecording = _b.sent();
                        return [2 /*return*/, this.latestRecording];
                }
            });
        });
    };
    FallbackMediaRecorder.prototype.getLatestRecording = function () {
        return this.latestRecording;
    };
    return FallbackMediaRecorder;
}());
exports.FallbackMediaRecorder = FallbackMediaRecorder;
//# sourceMappingURL=FallbackMediaRecorder.js.map