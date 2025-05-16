import apiResponse from "../utils/apiResponse.js";
import apiError from "../utils/apiError.js";
import db from "../models/index.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Op } from "sequelize";
import { uploadOnCloudinary,deleteFromCloudinary } from "../utils/cloudinary.js";
import { extractPublicId } from "cloudinary-build-url"

/**channel controllers */

class ChannelController {

  /**create channel */
  static createChannel = asyncHandler(async (req, res, next) => {
    const { handel, channelName } = req.body;
    const userId = req.user?.userId;

    console.log("req.body", req.body);
    console.log("userId", userId);

    if (!userId) {
      throw new apiError(400, "Unauthorized user");
    }

    if (!handel) {
      throw new apiError(400, "Handle is required");
    }

    try {
      // Find existing channel by userId or handle
      const channel = await db.channel.findOne({
        where: {
          [Op.or]: [
            { user_Id: userId },
            { handel: handel }
          ]
        }
      });

      if (channel) {
        // Check if it's the user's own channel
        if (channel.user_Id === userId) {
          throw new apiError(409, "Channel already exists");
        }

        // Check if handle matches
        const existingHandle = channel.handel.startsWith('@')
          ? channel.handel.substring(1)
          : channel.handel;
        if (existingHandle === handel) {
          throw new apiError(409, "handel must be unique");
        }
      }

      // Validate user
      const user = await db.user.findByPk(userId);
      if (!user) {
        throw new apiError(401, "User not found");
      }

      
      const profileImg = req.files?.profile?.[0]?.path || null;
      const coverImg = req.files?.coverImg?.[0]?.path || null;


      console.log("profile",profileImg);
      const profileLink =await uploadOnCloudinary(profileImg);
      const coverImgLink = await uploadOnCloudinary(coverImg);

      console.log("profile Link", profileLink);
      

      // Create channel
     await db.channel.create({
        user_Id: userId,
        handel: handel,
        channelName: channelName || user.fullName,
        profileImg: profileLink?.url,
        coverImg: coverImgLink?.url,
      });

      return res.status(200).json(
        new apiResponse({
          success: true,
          message: "Channel created successfully",
        })
      );
    } catch (error) {
      console.log("Error:", error.message);
      next(error);
    }
  });

  /**update channel handel  */
  static editChannel = asyncHandler(async(req,res,next)=> {
    try {
      const userId = req.user?.userId;
      const channelId = req.params?.channelId;
      /**delete validation */
      deletevalidation(userId,channelId)
      const { channelName, handel } = req.body

      /**finde user and channel and validate */
      const existuser = await db.user.findByPk(userId);
      if (!existuser) {
        throw new apiError(400,"no user found")
      }
      const existchannel = await db.channel.findByPk(channelId);
      if (!existchannel) {
        throw new apiError(400,'no channel found')
      }
      /**check fro profile and cover already exist remove it */
    if (existchannel?.profileImg || existchannel?.coverImg) {
      const deletionimages = [existchannel?.profileImg, existchannel?.coverImg];
      console.log("deletionimages",deletionimages);
      deletionimages.forEach((link)=>{
       if (link) {
        const publicId = extractPublicId(link)
        console.log("publicId",publicId);
        deleteFromCloudinary(publicId)
       }
      })
    }

    /**if new image found */
    // const coverImg = req.files
    // if (condition) {
      
    // }
     

      
      


    } catch (error) {
      
    }
  })

  /**delete channel */
  static deleteChannel =asyncHandler(async(req,res,next) => {
    try {
      const userId = req.user?.userId;
      const channelId = req.params?.channelId
      /**validation */
      deletevalidation(userId,channelId);
      /**exist user */
      const existuser = await db.user.findByPk(userId);
   if(!existuser){throw new apiError(400,"unauthorize user")};
   /**check fro exist channel */
   const existchannel = await db.channel.findByPk(channelId);
   if (!existchannel) {
    throw new apiError(400,"no channel found")
   }
   
   if (existchannel?.channelId === channelId && existchannel?.channelOwner === userId) {
     /**if foound destroy the channel */
     await db.channel.destroy({
      where: {
        channelId:channelId,
        channelOwner:userId
      }
     })
     res.status(200)
     .json( new apiResponse ({
      success: true,
      message:"channel deleted"
     }))
    
   } else {
    throw new apiError(400,"This channel is not belongs to you")
   }


    } catch (error) {
      next(error);
    }
  })

}

export default ChannelController;


/**delete if already image cover and profile image exist */
function deleteProfile(imageLink) {
  const publicId = extractPublicId(imageLink);
  return deleteFromCloudinary(publicId) 
}


/**validation fro userid and channel id */
function deletevalidation(userId,channelId) {
  if (!userId) {
    throw new apiError(400,"invalid user")
  }
  if (!channelId) {
    throw new apiError(400,"invalid channel id")
  }
}