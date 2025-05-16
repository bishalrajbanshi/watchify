
import asyncHandler from "../utils/asyncHandler.js";
import apiresponse from "../utils/apiResponse.js";
import apiError from "../utils/apiError.js";
import db from "../models/index.js";

/**tweet controler */
class TweetController {

    /**create tweet */
    static createTweet = asyncHandler(async(req,res,next) => {
        try {
            const userId = req.user?.userId;
            const { content } = req.body;
            /**validate user */
            if (!userId){ throw new apiError(400,"userId not found")};

            /**find user  */
            const existUser = await db.user.findByPk(userId);
            if(!existUser){throw new apiError(400,"user id invalid")};

            /**create the tweet */
            await db.tweet.create({
                tweetOwner: userId,
                content:content
            });

            res.status(201)
            .json(new apiresponse({
                statusCode: 201,
                success: true,
                message:"tweet created"
            }))


        } catch (error) {
            console.log("tweet error",error);
            next(error)
        }
    })
}


export default TweetController;