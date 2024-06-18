"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function download(href, filename) {
    if (!href) {
        return false;
    }
    var a = document.createElement("a");
    a.download = filename || "CKW-" + new Date();
    a.href = href;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return true;
}
function downloadBlob(blob, filename) {
    if (!blob) {
        return false;
    }
    return download(window.URL.createObjectURL(blob), filename);
}
function downloadImage(image, filename) {
    if (!image) {
        return false;
    }
    return download(image, filename);
}
exports.downloadImage = downloadImage;
function downloadVideo(video, filename) {
    return downloadBlob(video, filename);
}
exports.downloadVideo = downloadVideo;
//# sourceMappingURL=download.js.map