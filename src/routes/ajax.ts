import { Router, Request, Response, NextFunction } from "express";
import { User } from "../sequelize";
import md5 from "md5";
const router = Router();

router.get("/generate", (req: Request, res: Response) => {
    const {
        username,
        password
    } = req.query;
    if(username && password) {
        User.create({
            username: String(username),
            password: md5(String(password)),
            ugroup: "admin"
        }).then(() => {
            res.json({
                status: 1
            })
        }).catch(() => {
            res.json({
                status: 0
            })
        })
    } else {
        res.json({
            status: 0,
            msg: "Thiếu dữ liệu"
        })
    }
});

router.post("/login", (req: Request, res: Response) => {
    const {
        username,
        password
    } = req.body;
    if(username && password) {
        User.findOne({
            where: {
                username
            }
        }).then((user) => {
            if(user != null) {
                if(user.password === md5(password)) {
                    req.session.userid = user.id;
                    req.session.username = user.username;
                    req.session.ugroup = user.ugroup;
                    res.json({
                        status: 1,
                        msg: "Đăng nhập thành công",
                        data: user
                    })
                } else {
                    res.json({
                        status: 0,
                        msg: "Sai thông tin đăng nhập"
                    })
                }
            } else {
                res.json({
                    status: 0,
                    msg: "Sai thông tin đăng nhập"
                })
            }
        })
    } else {
        res.json({
            status: 0,
            msg: "Thiếu dữ liệu"
        })
    }
});

export default router;