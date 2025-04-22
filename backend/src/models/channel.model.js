import { sequelize } from "../config/dbconnection.js";
import { DataTypes } from "sequelize";
import {nanoid} from "nanoid";

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
        handel: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
           set(value){
            const cleaned = value.toLowerCase().trim();
            if (!cleaned.startsWith('@')) {
                cleaned = '@' + cleaned
            }
            this.setDataValue('handel',cleaned)
           }
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