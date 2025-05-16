import { sequelize } from "../config/dbconnection.js";
import { DataTypes } from "sequelize";
import { nanoid } from "nanoid";
import User from "./user.model.js";

/** like model */
const Like = sequelize.define(
    'Like',
    {
        likeId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,
            primaryKey: true,
            defaultValue:()=>nanoid()
        },
        user_Id: {
            type:DataTypes.STRING,
            allowNull: false,
            references: {
                model:User,
                key:"userId"
            },
            onDelete:"CASCADE"
        },
        targetId: {
            type:DataTypes.STRING,
            allowNull:false
        },
        targetType: {
            type: DataTypes.ENUM('video','comment','tweet'),
            allowNull: true,
            defaultValue:null
        },
        isLike: {
            type:DataTypes.BOOLEAN,
            allowNull:true,
            defaultValue:null
        }
    },
    { tableName: "likes", timestamps: true }
)
export default Like;