import dotenv from "dotenv";
dotenv.config();
import {
    Sequelize
} from "sequelize";
const mysql = {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: JSON.parse(process.env.DB_LOGGING),
    sync: JSON.parse(process.env.DB_SYNC)
}
export const database = new Sequelize(mysql.database, mysql.username, mysql.password, {
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
export const sync = () => {
    return new Promise((resolve, reject) => {
        database.sync({
            force: mysql.sync
        }).then(async () => {
            resolve();
        });
    });
}