import { Router } from "express";
import { tweetValidator } from "../middlewares/validator.middleware.js";
import validateRequest from "../middlewares/validate.req.js";
import verifyJwt from "../middlewares/auth.middlewae.js";
import TweetController from "../controllers/tweet.controller.js";
const router= Router();


/**create route */
router.route("/create").post(
    tweetValidator,
    validateRequest,
    verifyJwt,
    TweetController.createTweet
)


export default router;