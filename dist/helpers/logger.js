"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const path_1 = __importDefault(require("path"));
const Logger = winston_1.createLogger({
    format: winston_1.format.combine(winston_1.format.splat(), winston_1.format.timestamp({
        format: "DD/MM/YYYY HH:mm:ss"
    }), winston_1.format.colorize(), winston_1.format.printf(log => {
        if (log.stack)
            return `[${log.timestamp}] ${log.stack}`;
        return `[${log.timestamp}] ${log.message}`;
    })),
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({
            level: 'error',
            filename: path_1.default.join(__dirname, '../../errors.log')
        })
    ]
});
exports.default = Logger;
