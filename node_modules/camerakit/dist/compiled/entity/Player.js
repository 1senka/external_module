"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var FallbackPlayer_1 = require("./FallbackPlayer");
exports.Loader = FallbackPlayer_1.OGVLoader;
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    /**
     * Recorder is used to take recordings of the CaptureStream
     * @param {string} [mimeType] - Mime type you plan to be exporting in
     * @returns {HTMLVideoElemement | FallbackPlayer} Appropriate video element that supports requested mimeType
     */
    function Player(mimeType) {
        if (mimeType === void 0) { mimeType = "video/webm"; }
        var _this = _super.call(this) || this;
        var videoElem = document.createElement("video");
        if (!videoElem.canPlayType(mimeType)) {
            return new FallbackPlayer_1.FallbackPlayer();
        }
        return videoElem;
    }
    return Player;
}(FallbackPlayer_1.FallbackPlayer));
exports.Player = Player;
//# sourceMappingURL=Player.js.map