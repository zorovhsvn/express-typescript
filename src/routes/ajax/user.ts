import express from "express";
import md5 from "md5";
const router = express.Router();

router.get("/login", (req,res) => {
    res.json({status:1});
});

export default router;