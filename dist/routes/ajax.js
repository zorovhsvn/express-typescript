"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sequelize_1 = require("../sequelize");
const md5_1 = __importDefault(require("md5"));
const router = express_1.Router();
router.get("/generate", (req, res) => {
    const { username, password } = req.query;
    if (username && password) {
        sequelize_1.User.create({
            username: String(username),
            password: md5_1.default(String(password)),
            ugroup: "admin"
        }).then(() => {
            res.json({
                status: 1
            });
        }).catch(() => {
            res.json({
                status: 0
            });
        });
    }
    else {
        res.json({
            status: 0,
            msg: "Thiếu dữ liệu"
        });
    }
});
router.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        sequelize_1.User.findOne({
            where: {
                username
            }
        }).then((user) => {
            if (user != null) {
                if (user.password === md5_1.default(password)) {
                    req.session.userid = user.id;
                    req.session.username = user.username;
                    req.session.ugroup = user.ugroup;
                    res.json({
                        status: 1,
                        msg: "Đăng nhập thành công",
                        data: user
                    });
                }
                else {
                    res.json({
                        status: 0,
                        msg: "Sai thông tin đăng nhập"
                    });
                }
            }
            else {
                res.json({
                    status: 0,
                    msg: "Sai thông tin đăng nhập"
                });
            }
        });
    }
    else {
        res.json({
            status: 0,
            msg: "Thiếu dữ liệu"
        });
    }
});
exports.default = router;
