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
var events_1 = require("../main/events");
function closeStream(stream) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            stream.getVideoTracks().forEach(function (track) { return track.stop(); });
            stream.getAudioTracks().forEach(function (track) { return track.stop(); });
            return [2 /*return*/];
        });
    });
}
exports.closeStream = closeStream;
// Used if we want viewing permissions, but don't need to use it yet
function requestAndCloseStream(opts) {
    if (opts === void 0) { opts = {
        video: true,
        audio: true
    }; }
    return __awaiter(this, void 0, void 0, function () {
        var stream;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, navigator.mediaDevices.getUserMedia(opts)];
                case 1:
                    stream = _a.sent();
                    return [4 /*yield*/, closeStream(stream)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, stream];
            }
        });
    });
}
exports.requestAndCloseStream = requestAndCloseStream;
function getVideoSpecs(stream) {
    var videoTrack = stream.getVideoTracks()[0];
    if (!videoTrack) {
        return null;
    }
    var _a = videoTrack.getSettings(), width = _a.width, height = _a.height, frameRate = _a.frameRate;
    if (width && height && frameRate) {
        return { width: width, height: height, framerate: frameRate };
    }
    return null;
}
exports.getVideoSpecs = getVideoSpecs;
function registerVideoElement(video) {
    if (video.paused) {
        // The video won't affect other videos if it's paused
        video.addEventListener("playing", function () { return events_1.triggerEvent("video"); }, { once: true });
    }
    else {
        events_1.triggerEvent("video");
    }
    events_1.registerEvent("video", function () {
        video.pause();
        video.play();
    });
}
exports.registerVideoElement = registerVideoElement;
function createVideoElement(stream) {
    var video = document.createElement("video");
    video.srcObject = stream;
    video.muted = true;
    // @ts-ignore: playsInline is a Apple webkit only option
    video.playsInline = true;
    video.play();
    registerVideoElement(video);
    return video;
}
exports.createVideoElement = createVideoElement;
function toTrackConstraints(input) {
    if (input === undefined) {
        return {};
    }
    if (typeof input === "string") {
        if (!["front", "back"].includes(input)) {
            throw new Error("Unknown media selector: " + input);
        }
        return {
            facingMode: input === "front" ? "user" : "environment"
        };
    }
    if (input instanceof entity_1.CaptureSource) {
        return {
            deviceId: {
                exact: input.device.deviceId
            }
        };
    }
    if (input instanceof Object) {
        return input;
    }
    return {};
}
exports.toTrackConstraints = toTrackConstraints;
//# sourceMappingURL=stream.js.map