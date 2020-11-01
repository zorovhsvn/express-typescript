import {
    Model,
    DataTypes,
    Optional,
} from "sequelize";

interface AccountAttributes {
    id: number;
    uid: string;
    password: string;
    cookie: string;
}
interface AccountCreationAttributes extends Optional<AccountAttributes, "id"> { }
class Account extends Model<AccountAttributes, AccountCreationAttributes>
    implements AccountAttributes {
    public id!: number;
    public uid!: string;
    public password!: string;
    public cookie!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

module.exports = (sequelize: any) => {
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
            sequelize,
            tableName: "tb_accounts",
        }
    );
};