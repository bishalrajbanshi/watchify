import Router from "express";
import verifyJwt from "../middlewares/auth.middlewae.js";
import LikeController from "../controllers/like.controller.js";
const router= Router()

router.route("/video/:videoId/:targetType").post(
    verifyJwt,
    LikeController.videoLike
)

router.route("/comment/:commentId").post(
    verifyJwt,
    LikeController.commentLike
)

export default router;