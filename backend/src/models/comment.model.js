import { sequelize } from "../config/dbconnection.js";
import { DataTypes } from "sequelize";
import { nanoid } from "nanoid";
import User from "./user.model.js";

/**comment model */
const Comment = sequelize.define(
    'Comment',
    {
        commentId: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true,
            allowNull: false,
            defaultValue: ()=> nanoid()
        },
        user_Id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: User,
                key:"userId"
            },
            onDelete: "CASCADE"
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    { timestamps: true, tableName: "comments"}
)

export default Comment;