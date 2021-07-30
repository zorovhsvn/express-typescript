import {
    Model,
    DataTypes,
    Optional,
    Sequelize,
} from "sequelize";
import {
    dbConfig
} from "../sequelize";

export interface UserAttributes {
    id?: number;
    username?: string;
    password?: string;
    ugroup?: "admin" | "uploader" | "subber";
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}
interface UserCreationAttributes extends Optional<UserAttributes, "id"> { }

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public password!: string;
    public ugroup!: "admin" | "uploader" | "subber";
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: new DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: new DataTypes.STRING(32),
        allowNull: false
    },
    ugroup: {
        type: new DataTypes.ENUM("admin", "uploader", "subber"),
        allowNull: false
    }
}, {
    sequelize: dbConfig,
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

export default User;