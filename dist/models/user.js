"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: new sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: new sequelize_1.DataTypes.STRING(32),
        allowNull: false
    },
    ugroup: {
        type: new sequelize_1.DataTypes.ENUM("admin", "uploader", "subber"),
        allowNull: false
    }
}, {
    sequelize: sequelize_2.dbConfig,
    tableName: "tb_users",
    underscored: true,
    indexes: [{
            name: "username",
            fields: ["username"],
            unique: true
        }, {
            name: "ugroup",
            fields: ["ugroup"]
        }]
});
exports.default = User;
