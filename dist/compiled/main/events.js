"use strict";
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
var eventMap = {};
function createEvent(event) {
    if (!eventMap[event]) {
        eventMap[event] = [];
    }
}
function triggerEvent(event, opts) {
    var e_1, _a;
    if (!eventMap[event]) {
        return false;
    }
    try {
        for (var _b = __values(eventMap[event]), _c = _b.next(); !_c.done; _c = _b.next()) {
            var callback = _c.value;
            callback();
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return true;
}
exports.triggerEvent = triggerEvent;
function registerEvent(event, callback) {
    if (!eventMap[event]) {
        createEvent(event);
    }
    eventMap[event].push(callback);
}
exports.registerEvent = registerEvent;
function unregisterEvent(event, callback) {
    if (!eventMap[event]) {
        return false;
    }
    var index = eventMap[event].indexOf(callback);
    if (index !== -1) {
        eventMap[event].splice(index, 1);
        return true;
    }
    return false;
}
exports.unregisterEvent = unregisterEvent;
function unregisterAllEvents(event) {
    delete eventMap[event];
    createEvent(event);
}
exports.unregisterAllEvents = unregisterAllEvents;
//# sourceMappingURL=events.js.map