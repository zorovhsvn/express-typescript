import { UserAttributes } from "../models/user";
declare module "express" {
    interface Request {
        userid?: number;
        username?: string;
        ugroup?: "admin" | "uploader" | "subber";
        user?: UserAttributes;
    }
}
declare module "express-session" {
    interface Session {
        userid?: number;
        username?: string;
        ugroup?: "admin" | "uploader" | "subber";
        user?: UserAttributes;
    }
}
export default global;