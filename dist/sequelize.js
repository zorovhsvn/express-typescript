"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = exports.sync = exports.User = exports.dbConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const configs_1 = require("./configs");
const sequelize_1 = require("sequelize");
exports.dbConfig = new sequelize_1.Sequelize(configs_1.database.database, null, null, {
    dialect: "mysql",
    port: 3306,
    replication: configs_1.database.replication,
    logging: configs_1.database.logging,
    timezone: '+07:00',
    pool: {
        max: 1000,
        min: 0,
        acquire: 1000000,
        idle: 500000
    }
});
const user_1 = __importDefault(require("./models/user"));
exports.User = user_1.default;
const sync = () => {
    return new Promise((resolve, reject) => {
        exports.dbConfig.sync(configs_1.database.sync).then(() => __awaiter(void 0, void 0, void 0, function* () {
            resolve("OK");
        })).catch((err) => {
            reject(err);
        });
    });
};
exports.sync = sync;
exports.DB = {
    User: user_1.default,
};
exports.default = exports.DB;
