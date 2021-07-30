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
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const sequelize_1 = require("./sequelize");
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const app = express_1.default();
app.set("views", path_1.default.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use(express_session_1.default({
    resave: true,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000
    }
}));
app.use(express_1.default.json({
    limit: "50mb"
}));
app.use(express_1.default.urlencoded({
    limit: "50mb",
    extended: true
}));
app.use("/assets", express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use("/", routes_1.default);
sequelize_1.sync().then(() => __awaiter(void 0, void 0, void 0, function* () {
    const server = app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`);
    });
})).catch((err) => {
    console.error(err);
});
