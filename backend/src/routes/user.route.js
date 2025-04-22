import { Router } from "express";
import validateRequest from "../middlewares/validate.req.js";
import {userRegisterValidator,userLoginValidator} from "../middlewares/validator.middleware.js";
import userController from "../controllers/user.controller.js";
import verifyJwt from "../middlewares/auth.middlewae.js";

const router = Router();

router.route('/register').post(
    userRegisterValidator,
    validateRequest,
    userController.userRegister
)

router.route("/login").post(
    userLoginValidator,
    validateRequest,
    userController.userLogin
)

router.route("/logout").patch(
    verifyJwt,
    userController.userLoggout
)

export default router;
