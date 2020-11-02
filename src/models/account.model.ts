import {
    Model,
    DataTypes
} from "sequelize";
import { database } from "../sequelize";

export class Account extends Model {
    public id!: number;
    public uid!: string;
    public password!: string;
    public cookies!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Account.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        uid: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        password: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        cookie: {
            type: new DataTypes.TEXT("long"),
            allowNull: false,
        },
    },
    {
        sequelize: database,
        tableName: "tb_accounts",
        timestamps: false
    }
);
export default Account;