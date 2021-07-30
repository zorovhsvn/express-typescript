"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = exports.timenow = exports.sleep = void 0;
const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
exports.sleep = sleep;
const timenow = () => {
    return Date.now();
};
exports.timenow = timenow;
const random = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};
exports.random = random;
exports.default = {
    sleep: exports.sleep,
    timenow: exports.timenow,
    random: exports.random
};
