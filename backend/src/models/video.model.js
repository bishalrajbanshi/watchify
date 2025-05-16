import { nanoid } from "nanoid";
import { sequelize } from "../config/dbconnection.js";
import { DataTypes } from "sequelize";
import Channel from "./channel.model.js";
import User from "./user.model.js";

const Video = sequelize.define(
    'Video',
    {
        videoId: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            unique: true,
            defaultValue: () => nanoid()
        },
        channelId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Channel,
                key: "channelId"
            },
            onDelete:"CASCADE"
        },
        user_Id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: User,
                key: "userId"
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        thumbnail: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        video: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isAdult: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        duration: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        isPublished: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        publishTime: {
            type: DataTypes.TIME,
            defaultValue: null
        },
        publishDate: {
            type: DataTypes.DATE,
            defaultValue: null
        }
    },{
        tableName:"videos",
        timestamps: true
    }
);

export default Video;