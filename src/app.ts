import dotenv from "dotenv";
import express from "express";
import path from "path";
import session from "express-session";
import { sync } from "./sequelize";
import router from "./routes";
dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000
    }
}));
app.use(express.json({
    limit: "50mb"
}));
app.use(express.urlencoded({
    limit: "50mb",
    extended: true
}));
app.use("/assets", express.static(path.join(__dirname, "../public")));
app.use("/", router);
sync().then(async() => {
    const server = app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error(err);
});