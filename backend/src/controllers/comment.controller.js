import asyncHandler from "../utils/asyncHandler.js";
import apiresponse from "../utils/apiResponse.js";
import apiError from "../utils/apiError.js";
import db from "../models/index.js";

/**comment controllers */
class CommentController {
  /**create comment */
  static createComment = asyncHandler(async (req, res, next) => {
    try {
      const userId = req.user?.userId;
      const { content } = req.body;
      console.log("content", content);

      /**vaidate user */
      if (!userId) {
        throw new apiError(400, "user id not found");
      }
      /**find user in db */
      const existUser = await db.user.findByPk(userId);
      if (!existUser) {
        throw new apiError(400, "user not found");
      }
      /**entry to db */
      await db.comment.create({
        userId: userId,
        content: content,
      });

      res.status(201).json(
        new apiresponse({
            statusCode: 201,
          success: true,
          message: "commented success",
        }),
      );
    } catch (error) {
      console.log("error", error);
      next(error);
    }
  });

  /**edit comment */
  static editComment = asyncHandler(async (req, res, next) => {
    try {
      const userId = req.user?.userId;
      const commentId = req.params.commentId;
      const { content } = req.body;

      /**vaidate user and commentId */
        validation(userId,commentId);
   
      /**find the commet */
      const comment = await db.comment.findOne({
        commentId: commentId,
        userId: userId,
      });

      if (!comment) {
        throw new apiError(400, "comment not found");
      }
      /**update the comment */
      await db.comment.update(
        {
          content: content,
        },
        {
          where: { userId: userId, commentId: commentId },
        },
      );

      res.status(200).json(
        new apiresponse({
          success: true,
          message: "comment is edited",
        }),
      );
    } catch (error) {
      console.log("error", error);
      next(error);
    }
  });

  /**delete comments */
  static deleteComment = asyncHandler(async (req, res, next) => {
    try {
      const userId = req.user?.userId;
      const commentId = req.params.commentId;

      /**vaidate user and commentId */
        validation(userId,commentId);


        /**find comment */
        const existComment = await db.comment.findByPk(commentId);
        if (!existComment) {
            throw new apiError(400, "comment not found")
        }
        /**delete the comment form db */
        await db.comment.destroy({
            where: {commentId: commentId, userId: userId}
        })

        res.status(200)
       .json( new apiresponse({
        success: true,
        message:"comment deleted"
       }))

    } catch (error) {
        next(error);
    }
  });
}

export default CommentController;


function validation(userId,commentId) {
      if (!userId) {
        throw new apiError(400, "user id not found");
      }
      if (!commentId) {
        throw new apiError(400, "comment id not found");
      }
}