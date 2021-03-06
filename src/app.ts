import dotenv from "dotenv";
import express from "express";
import path from "path";
import session from "express-session";
import bodyParser from "body-parser";
import compression from "compression";
import * as sequelize from "./sequelize";
import morgan from "morgan";
import router from "./routes";
dotenv.config();
const port = process.env.PORT;
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
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
if (process.env.NODE_ENV === "development") {
    app.use("/assets", express.static(path.join(__dirname, "../public")));
    app.use(morgan("dev"));
} else {
    app.use("/assets", express.static(path.join(__dirname, "../public"), {
        maxAge: 86400000 * 30
    }));
    app.use(compression());
}

app.use("/", router);

// using wepack
type ModuleId = string | number;
interface WebpackHotModule {
    hot?: {
        data: any;
        accept(
            dependencies: string[],
            callback?: (updatedDependencies: ModuleId[]) => void,
        ): void;
        accept(dependency: string, callback?: () => void): void;
        accept(errHandler?: (err: Error) => void): void;
        dispose(callback: (data: any) => void): void;
    };
}
declare const module: WebpackHotModule;

sequelize.sync().then(() => {
    const server = app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => server.close());
    }
}).catch((err) => {
    console.error(err);
});