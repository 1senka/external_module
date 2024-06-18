"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("../main/logger");
var CK_IMAGE_KEY = "camerakit-images";
function getStorage(storageMethod) {
    if (storageMethod === null) {
        return false;
    }
    else if (storageMethod && storageMethod === "localStorage") {
        return localStorage;
    }
    else if (storageMethod && storageMethod === "sessionStorage") {
        return sessionStorage;
    }
    return localStorage;
}
function getImages(_a) {
    var storageMethod = (_a === void 0 ? {} : _a).storageMethod;
    var storageArea = getStorage(storageMethod);
    if (storageArea === false) {
        return;
    }
    var foundValue = storageArea.getItem(CK_IMAGE_KEY);
    var existing = foundValue ? JSON.parse(foundValue) : [];
    if (!(existing instanceof Array)) {
        logger_1.default.log("Error: Invalid value found in Storage.");
        existing = [];
    }
    return existing;
}
exports.getImages = getImages;
function saveImage(image, _a) {
    var storageMethod = (_a === void 0 ? {} : _a).storageMethod;
    var storageArea = getStorage(storageMethod);
    if (storageArea === false) {
        return;
    }
    var existing = getImages({ storageMethod: storageMethod });
    existing.push(image);
    storageArea.setItem(CK_IMAGE_KEY, JSON.stringify(existing));
}
exports.saveImage = saveImage;
//# sourceMappingURL=storage.js.map