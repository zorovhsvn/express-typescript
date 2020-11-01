import dotenv from "dotenv";
import express from "express";
import path from "path";
import session from "express-session";
import bodyParser from "body-parser";
import compression from "compression";
import * as sequelize from "./sequelize";
import morgan from "morgan";
dotenv.config();
const app = express();

const port = process.env.PORT;
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET
}));
app.use(bodyParser.json());

app.use("/", require("./routes"));

if(process.env.NODE_ENV === "development") {
    app.use("/assets", express.static(path.join(__dirname, "../public")));
    app.use(morgan("dev"));
} else {
    app.use("/assets", express.static(path.join(__dirname, "../public"), {
        maxAge: 86400000 * 30
    }));
    app.use(compression());
}

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });
}).catch((err) => {
    console.error(err);
});