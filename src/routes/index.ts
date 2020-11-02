import {
    Router,
    Request,
    Response
} from "express";
import ajax from "./ajax";
const router = Router();

router.use("/ajax", ajax);

export default router;