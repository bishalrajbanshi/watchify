import { sequelize } from "../config/dbconnection.js";
import { DataTypes } from "sequelize";
import {nanoid} from "nanoid";
import User from "./user.model.js";

const Channel = sequelize.define(
    'Channel',
    {
        channelId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true,
            defaultValue: () => nanoid()
        },
        user_Id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: User,
                key:"userId"
            },
            onDelete:"CASCADE",
        },
        handel: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
           set(value){
            let cleaned = value.toLowerCase().trim();
            if (!cleaned.startsWith('@')) {
                cleaned = '@' + cleaned
            }
            this.setDataValue('handel',cleaned)
           },
        },
        channelName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profileImg: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        coverImg: {
            type: DataTypes.STRING,
            defaultValue: null
        }
    }, {
        timestamps: true,
        tableName:"channels"
    }
)

export default Channel;