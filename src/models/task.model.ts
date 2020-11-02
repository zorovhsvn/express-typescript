import {
    Model,
    DataTypes
} from "sequelize";
import { database } from "../sequelize";

export class Task extends Model {
    public id!: number;
    public fbid!: string;
    public amount!: number;
    public status!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Task.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        fbid: {
            type: new DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        amount: {
            type: new DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
                max: 10000
            }
        },
        status: {
            type: new DataTypes.ENUM({
                values: ["pending", "processing", "ready", "error"]
            }),
            allowNull: false,
            defaultValue: "pending"
        }
    },
    {
        sequelize: database,
        tableName: "tb_tasks",
    }
);
export default Task;