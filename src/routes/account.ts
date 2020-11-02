import {
    Router,
    Request,
    Response
} from "express";
const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.json({status:1,msg:"Account 123"});
});

export default router;