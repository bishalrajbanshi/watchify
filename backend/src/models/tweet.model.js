import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbconnection.js";
import { nanoid } from "nanoid";
import User from "./user.model.js";

/**tweet  */
const Tweet = sequelize.define(
    'Tweet',
    {
        tweetId: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true,
            defaultValue: ()=> nanoid()
        },

        user_Id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: User,
                key: "userId"
            }
        },

        content: {
            type: DataTypes.STRING,
            allowNull: false
        }

    }
)

export default Tweet;