import  Router  from "express";
import validateRequest from "../middlewares/validate.req.js";
import { createChnnelValidator} from "../middlewares/validator.middleware.js";
import ChannelController from "../controllers/channel.controller.js";
import verifyJwt from "../middlewares/auth.middlewae.js";
import upload from "../middlewares/multter.middleware.js";

const router = Router();

router.route('/create').post(
    upload.fields(
        [
            {name:"profile", maxCount:1 },
            {name: "coverImg", maxCount:1}
        ]
    ),
    verifyJwt,
    createChnnelValidator,
    validateRequest,
    ChannelController.createChannel
)

router.route("/delete/:channelId").delete(
    verifyJwt,
    ChannelController.deleteChannel
)

router.route("/edit/:channelId").put(
    verifyJwt,
    ChannelController.editChannel
)

export default router;
