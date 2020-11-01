import {
    Model,
    DataTypes,
    Optional,
} from "sequelize";

interface UserAttributes {
    id: number;
    username: string;
    password: string;
    codesecurity: number;
    ugroup: string;
}
interface UserCreationAttributes extends Optional<UserAttributes, "id"> { }
class User extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes {
    public id!: number;
    public username!: string;
    public password!: string;
    public ugroup!: string;
    public codesecurity!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

module.exports = (sequelize: any) => {
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
            },
            password: {
                type: new DataTypes.STRING(255),
                allowNull: false,
            },
            codesecurity: {
                type: new DataTypes.INTEGER,
                allowNull: false
            },
            ugroup: {
                type: new DataTypes.ENUM({
                    values: ["member","admin"]
                }),
                allowNull: false,
                defaultValue: "member"
            },
        },
        {
            sequelize,
            tableName: "tb_users",
        }
    );
};