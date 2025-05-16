import Router from 'express';
import verifyJwt from '../middlewares/auth.middlewae.js';
import { videoUploadValidator } from '../middlewares/validator.middleware.js';
import validateRequest from '../middlewares/validate.req.js';
import VideoController from '../controllers/video.controller.js';
import upload from '../middlewares/multter.middleware.js';
const router= Router()

router.route("/upload/:channelId").post(
    upload.fields([
        { name:"thumbnail",maxCount:1},
        {name:"video",maxCount:1}
    ]),
    // videoUploadValidator,
    // validateRequest,
    verifyJwt,
    VideoController.videoUpload
)

router.route("/edit/:channelId").put(
    verifyJwt,
    VideoController.editVideo
)
export default router;