/**like controller */
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import db from "../models/index.js";

/**like controller */
class LikeController {
  /**video like */
  static videoLike = asyncHandler(async (req, res, next) => {
    try {
      const userId = req.user?.userId;
      const { videoId, targetType } = req.params;
      console.log(videoId, targetType);
      console.log(userId);

      /**validate user and video and target */
      if (!userId) {
        throw new apiError(401, "invalid user");
      }
      validationVideo(userId, targetType);

      /**find the video */
      const video = await db.video.findOne({
        where: {
          videoId: videoId,
        },
      });
      /**validate video */
      if (!video) {
        throw new apiError(400, "video not found");
      }

      /**check like by user to video */
      const likedVideo = await db.like.findOne({
        where: {
          targetId: videoId,
          userId: userId,
        },
      });
      const isLiked = likedVideo?.isLike;
      console.log("isliked", isLiked);

      /**validate like */
      if (!likedVideo) {
        if (isLiked === undefined || isLiked === null) {
          await db.like.create({
            userId: userId,
            targetId: videoId,
            targetType: targetType,
            isLike: true,
          });
        }
        res.status(200).json(
          new apiResponse({
            success: true,
            message: "video liked",
          }),
        );
      } else {
        /**update like  */
        await db.like.destroy({
          where: { userId: userId, targetId: videoId },
        });

        res.status(200).json(
          new apiResponse({
            success: true,
            message: "video disliked",
          }),
        );
      }
    } catch (error) {
      console.log("error", error);
      next(error);
    }
  });

  /**comment like */
  static commentLike = asyncHandler(async (req, res, next) => {
    try {
      const userId = req.user?.userId;
      const commentId = req.params.commentId;
      const targetType = "comment";
      console.log("userId", userId);
      console.log("commentId", commentId);

      /**validate userId and commentId */
      validation(userId, commentId);

      /**find comment */
      const existComment = await db.comment.findByPk(commentId);
      if (!existComment) {
        throw new apiError(400, "comment not found");
      }
      console.log("exist comment", existComment);

      /**check fro like */
      const likedComment = await db.like.findOne({
        where: { targetId: commentId, userId: userId },
      });
      const isLiked= likedComment?.isLike;
       if (!likedComment) {
        if (isLiked === undefined || isLiked === null) {
          await db.like.create({
            userId: userId,
            targetId: commentId,
            targetType: targetType,
            isLike: true,
          });
        }
        res.status(200).json(
          new apiResponse({
            success: true,
            message: "comment liked",
          }),
        );
      } else {
        /**update like  */
        await db.like.destroy({
          where: { userId: userId, targetId: commentId },
        });

        res.status(200).json(
          new apiResponse({
            success: true,
            message: "comment disliked",
          }),
        );
      }
    } catch (error) {
      next(error);
    }
  });
}

export default LikeController;

/**validation for  video id and target type */
function validationVideo(videoId, targetType) {
  if (!videoId) {
    throw new apiError(400, "invalid video");
  }

  if (!targetType) {
    throw new apiError(400, "target type required");
  }
}

/**validation userId and commentId */
function validation(userId, commentId) {
  console.log("userId", userId);
  console.log("commentId", commentId);

  if (!userId) {
    throw new apiError(400, "user id not found");
  }
  if (!commentId) {
    throw new apiError(400, "comment id not found");
  }
}
