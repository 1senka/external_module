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
var logger_1 = require("../main/logger");
var NativeMediaRecorder = /** @class */ (function () {
    function NativeMediaRecorder(stream) {
        this.mimeType = "video/webm;codecs=vp8";
        this.stream = stream;
        this.blobs = [];
        this.mediaRecorder = null;
    }
    NativeMediaRecorder.isTypeSupported = function (mimeType) {
        return MediaRecorder.isTypeSupported(mimeType);
    };
    NativeMediaRecorder.prototype.destroy = function () {
        // TODO: any needed cleanup
    };
    NativeMediaRecorder.prototype.createRecorder = function () {
        var _this = this;
        this.mediaRecorder = null;
        try {
            this.mediaRecorder = new MediaRecorder(this.stream, {
                mimeType: this.mimeType
            });
        }
        catch (e) {
            logger_1.default.error("Exception while creating MediaRecorder:", e);
            return;
        }
        logger_1.default.log("Created MediaRecorder", this.mediaRecorder);
        this.mediaRecorder.onstop = function (event) {
            logger_1.default.log("Recorder stopped: ", event);
        };
        this.mediaRecorder.ondataavailable = function (event) {
            if (event.data && event.data.size > 0) {
                _this.blobs.push(event.data);
            }
        };
        this.mediaRecorder.start(10); // collect 10ms of data
        logger_1.default.log("MediaRecorder started", this.mediaRecorder);
    };
    NativeMediaRecorder.prototype.setMimeType = function (mimeType) {
        this.mimeType = mimeType;
        return true;
    };
    NativeMediaRecorder.prototype.resetRecording = function () {
        this.blobs = [];
        this.paused = false;
        this.latestRecording = null;
    };
    NativeMediaRecorder.prototype.resume = function () {
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
    NativeMediaRecorder.prototype.pause = function () {
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
    NativeMediaRecorder.prototype.start = function () {
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
    NativeMediaRecorder.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.destroy();
                this.latestRecording = new Blob(this.blobs, {
                    type: this.mimeType
                });
                return [2 /*return*/, this.latestRecording];
            });
        });
    };
    NativeMediaRecorder.prototype.getLatestRecording = function () {
        return this.latestRecording;
    };
    return NativeMediaRecorder;
}());
exports.NativeMediaRecorder = NativeMediaRecorder;
//# sourceMappingURL=NativeMediaRecorder.js.map