"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const database_1 = __importDefault(require("./database"));
exports.database = database_1.default;
exports.default = {
    database: database_1.default
};
