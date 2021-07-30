import dotenv from "dotenv";
dotenv.config();
import { database } from "./configs";
import {
    Sequelize
} from "sequelize";
export const dbConfig = new Sequelize(database.database, null, null, {
    dialect: "mysql",
    port: 3306,
    replication: database.replication,
    logging: database.logging,
    timezone: '+07:00',
    pool: {
        max: 1000,
        min: 0,
        acquire: 1000000,
        idle: 500000
    }
});
import User from "./models/user";

export {
    User,
};
export const sync = () => {
    return new Promise((resolve, reject) => {
        dbConfig.sync(database.sync).then(async () => {
            resolve("OK");
        }).catch((err) => {
            reject(err)
        });
    });
}
export const DB = {
    User,
};
export default DB;