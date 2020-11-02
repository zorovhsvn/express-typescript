import {
    Model,
    DataTypes
} from "sequelize";
import { database } from "../sequelize";

export class User extends Model {
    public id!: number;
    public username!: string;
    public password!: string;
    public codesecurity!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: new DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        password: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        codesecurity: {
            type: new DataTypes.INTEGER({
                length: 4
            }),
            allowNull: false
        }
    },
    {
        sequelize: database,
        tableName: "tb_users",
    }
);
export default User;