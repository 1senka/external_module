"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var settings_1 = require("../main/settings");
var util_1 = require("../util");
var Shutter = /** @class */ (function () {
    /**
     * Shutter is used for taking pictures from the video stream
     * @param {Object} opts
     * @param {HTMLVideoElement} opts.original - The raw, higher resolution video to pull photos from
     * @param {HTMLVideoElement} opts.preview - Another video stream, can be used as a downscaled preview of the original stream
     */
    function Shutter(_a) {
        var original = _a.original, preview = _a.preview;
        this.videoInput = original;
        this.previewInput = preview;
    }
    /**
     * Helper function for choosing correct video element
     * @param {Object} opts
     * @param {("original" | "preview")} [opts.source=original] - Which stream should be selected
     * @returns {HTMLVideoElement} The video element all changes should be applied to
     */
    Shutter.prototype.selectVideoInput = function (_a) {
        var source = (_a === void 0 ? {} : _a).source;
        source = source || "original";
        if (source === "preview") {
            return this.previewInput;
        }
        return this.videoInput;
    };
    /**
     * Takes and possibly saves a photo of the specified stream
     * @param {Object} opts
     * @param {StorageMethod} [opts.save] - If the photo should be saved to LocalStorage
     * @param {("original" | "preview")} [opts.source=original] - Which stream the capture should be performed on
     * @returns {string} Photo represented as data URL
     */
    Shutter.prototype.capture = function (_a) {
        var _b = _a === void 0 ? {} : _a, save = _b.save, source = _b.source;
        var videoInput = this.selectVideoInput({ source: source });
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        canvas.width = videoInput.videoWidth;
        canvas.height = videoInput.videoHeight;
        context.drawImage(videoInput, 0, 0, videoInput.videoWidth, videoInput.videoHeight);
        this.latestCapture = canvas.toDataURL("image/png");
        if (save || settings_1.default.storageMethod) {
            util_1.saveImage(this.latestCapture, {
                storageMethod: save || settings_1.default.storageMethod
            });
        }
        return this.latestCapture;
    };
    /**
     * Captures an image from the video stream and downloads it to the browser
     * @param {Object} opts
     * @param {("original" | "preview")} [opts.source=original] - Which stream the capture should be performed on
     * @param {string} [opts.filename] - Name to use for downloaded image
     * @returns {boolean} If the image was downloaded successfully
     */
    Shutter.prototype.captureAndDownload = function (_a) {
        var source = _a.source, filename = _a.filename;
        return util_1.downloadImage(this.capture({ source: source }), filename);
    };
    /**
     * Downloads the image last captured by the shutter
     * @param {string} [filename] - Name to use for downloaded image
     * @returns {boolean} If the iamge was downloaded successfully
     */
    Shutter.prototype.downloadLatestCapture = function (filename) {
        if (!this.latestCapture) {
            return false;
        }
        return util_1.downloadImage(this.latestCapture, filename);
    };
    return Shutter;
}());
exports.Shutter = Shutter;
//# sourceMappingURL=Shutter.js.map