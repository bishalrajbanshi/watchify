import asyncHandler from "../utils/asyncHandler.js";
import apiresponse from "../utils/apiResponse.js";
import apiError from "../utils/apiError.js";
import db from "../models/index.js";
import { getVideo } from "../utils/helper.js";
import { getVideoDurationInSeconds } from "get-video-duration";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { where } from "sequelize";


/** video controller */
class VideoController {

    /**upload video */
    static videoUpload = asyncHandler(async(req,res,next) => {
        try {
            const userId = req.user?.userId;
            const channelId = req.params.channelId;
            /**validate user and channel */
            validation(userId,channelId);

            const exist_channel = await db.channel.findByPk(channelId);
            console.log("existchannel",exist_channel);
            if(!exist_channel) {throw new apiError(400,"channel not exist")};

            // /**get images and videos */
            // const {thumbanil,video} = getVideo(req);

            // const thumbnailLink = await uploadOnCloudinary(thumbanil);
            // console.log("thimpnail upload link",thumbnailLink);
            
            // const videoLink = await uploadOnCloudinary(videoLink)

            

            
        } catch (error) {
           next(error);
           console.log("error from video upload",error);
            
        }
    })


    /**upload video */
    static editVideo = asyncHandler(async(req,res,next) => {
        try {
            const userId = req.user?.userId;
            const channelId = req.params?.channelId;
            const { title, description,isAdult,isPublished,publishTime,publishDate } = req.body;
            console.log("title",title);
            
            /**validate channel adn userd */
            validation(userId,channelId);

            /**find the user */
            const exituser = await db.user.findByPk(userId)
            if (!exituser) {
                throw new apiError(404,"user not found")
            }
            /**find the channel */
            const existchannel =await db.channel.findByPk(channelId)
            if (!channelId) {
                throw new apiError(401,"no channel found")
            }
            /**find the video */
            const existVideo = await db.video.findOne({
                where:{userId:userId, channelId:channelId}
            })
            if (!existVideo) {
                throw new apiError(400,"video not found")
            }

            /**save to db */
            await db.video.update({
                title: title ?? existVideo.title,
                description: description ?? existVideo.description,
                isAdult: isAdult ?? existVideo.isAdult,
                isPublished: isPublished ?? existVideo.isPublished,
                publishTime: publishTime ?? existVideo.publishTime,
                publishDate: publishDate ?? existVideo.publishDate
            },
        {
            where:{userId:userId, channelId:channelId}
        })

        res.status(201)
        .json( new apiresponse({
            success: true,
            message:"updated video"
        }))

        } catch (error) {
            console.log("error from video controller",error);
            
        }
    })

}


export default VideoController


/**validation fro userId and channelId  from video controller*/
function validation(userId,channelId) {
    if (!userId) {
        throw new apiError(400,"invalid user")
    }
    if (!channelId) {
        throw new apiError(400, "invalid channel")
    }
}