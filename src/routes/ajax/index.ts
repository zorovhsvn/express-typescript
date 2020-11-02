import {
    Router,
    Request,
    Response
} from "express";
import md5 from "md5";
import { User } from "../../models/user.model";
import { Random } from "../../library/functions";
const router = Router();

router.get("/generate", (req: Request, res: Response) => {
    const username = req.query.username;
    const password = req.query.password;
    if (username && password) {
        User.count({}).then((count: number) => {
            if (count === 0) {
                const codesecurity = Random(1000, 9999);
                const pwd = md5(md5(String(password)) + codesecurity);
                User.create({
                    username,
                    password: pwd,
                    codesecurity
                }).then((data: any) => {
                    req.session.userid = data.id;
                    req.session.username = data.username;
                    res.redirect("/");
                }).catch((err: any) => {
                    res.json({
                        status: 0,
                        msg: "Đã xảy ra lỗi",
                        err: JSON.stringify(err)
                    })
                })
            } else {
                res.json({
                    status: 0,
                    msg: "Đã tồn tại tài khoản"
                });
            }
        }).catch((err: any) => {
            res.json({
                status: 0,
                msg: "Đã xảy ra lỗi",
                err: JSON.stringify(err)
            });
        });
    } else {
        res.json({
            status: 0,
            msg: "Thiếu dữ liệu"
        });
    }
});

router.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        User.findOne({
            where: {
                username
            },
            rejectOnEmpty: true
        }).then((data: any) => {
            if (data.password === md5(md5(password) + data.codesecurity)) {
                req.session.userid = data.id;
                req.session.username = data.username;
                res.json({
                    status: 1,
                    msg: "Đăng nhập thành công"
                });
            } else {
                res.json({
                    status: 0,
                    msg: "Sai mật khẩu"
                });
            }
        }).catch(() => {
            res.json({
                status: 0,
                msg: "Không tìm thấy tài khoản"
            });
        })
    } else {
        res.json({
            status: 0,
            msg: "Thiếu dữ liệu"
        });
    }
});

export default router;