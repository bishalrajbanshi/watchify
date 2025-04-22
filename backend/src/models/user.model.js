import { sequelize } from "../config/dbconnection.js";
import  DataTypes  from "sequelize";
import {nanoid} from "nanoid";

const User = sequelize.define(
    'User',
    {
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            unique: true,
            defaultValue: () => nanoid(),
        },
        fullName : {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value){
                this.setDataValue('password',value.trim())
            }
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "user"
        },
        isLoggedIn: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        refreshToken: {
            type: DataTypes.STRING,
          },
    },{
        tableName: "users",
        timestamps: true
    }
);

export default User;