import dotenv from "dotenv";
dotenv.config();
import {
    Sequelize
} from "sequelize";
// import * as AccountModel from "./models/accounts";
const AccountModel = require("./models/accounts");
const UserModel = require("./models/user");
const mysql = {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: JSON.parse(process.env.DB_LOGGING),
    sync: JSON.parse(process.env.DB_SYNC)
}
const sequelize = new Sequelize(mysql.database, mysql.username, mysql.password, {
    host: mysql.host,
    dialect: 'mysql',
    pool: {
        max: 100,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: mysql.logging
});
export const Account = AccountModel(sequelize);
export const User = UserModel(sequelize);
export const sync = () => {
    return new Promise((resolve, reject) => {
        sequelize.sync({
            force: mysql.sync
        }).then(async () => {
            resolve();
        });
    });
}