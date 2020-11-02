import {
    Router,
    Request,
    Response
} from "express";
import { Account } from "../models/account.model";
import { Task } from "../models/task.model";
import ajax from "./ajax";
import account from "./account";
const router = Router();

router.use("/ajax", ajax);
router.use((req: Request, res: Response, next) => {
    if(req.session.userid && req.session.username) {
        res.locals.session = req.session;
        next();
    }
    else {
        if(req.method === "GET") res.render("login");
        else res.json({
            status: 0,
            msg: "Chưa đăng nhập"
        });
    }
});

router.get("/", (req: Request, res: Response) => {
    const prm: any[] = [];
    prm.push(Account.count({}));
    prm.push(Task.count({}));
    Promise.all(prm).then((values: any[]) => {
        console.log(values);
        res.render("home", {
            site: {
                title: "Trang Quản Trị",
                type: "dashboard"
            }
        });
    }).catch((err: any) => {
        res.json({
            status: 0,
            msg: "Đã xảy ra lỗi",
            err: JSON.stringify(err)
        })
    })
});

router.use("/account", account);

export default router;