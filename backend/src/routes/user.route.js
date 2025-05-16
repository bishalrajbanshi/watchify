import { Router } from "express";
import validateRequest from "../middlewares/validate.req.js";
import {userRegisterValidator,userLoginValidator, createChnnelValidator} from "../middlewares/validator.middleware.js";
import UserController from "../controllers/user.controller.js";
import verifyJwt from "../middlewares/auth.middlewae.js";
import upload from "../middlewares/multter.middleware.js";

const router = Router();

router.route('/register').post(
    userRegisterValidator,
    validateRequest,
    UserController.userRegister
)



router.route("/login").post(
    userLoginValidator,
    validateRequest,
    UserController.userLogin
)

router.route("/logout").patch(
    verifyJwt,
    UserController.userLoggout
)

router.route("/edit").put(
    verifyJwt,
    UserController.editUser
)


export default router;
