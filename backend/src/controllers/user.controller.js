import asyncHandler from "../utils/asyncHandler.js";
import db from "../models/index.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { generateAccessToken, generateRefreshToken } from "../middlewares/generate.token.js";

import validator from "email-validator";
import bcryptjs, {  genSaltSync } from "bcryptjs";
import { where } from "sequelize";
/**
 * user controller
 */

class userController {
  /**
   * user register
   */
  static userRegister = asyncHandler(async (req, res, next) => {
    const { fullName, email, password } = req.body;
    try {
      /**find exist user */
      const user = await db.user.findOne({ where: { email: email } });
      if (user) {
        throw new apiError(400, "User already Registreed");
      }
      /**validate email */
      const validEmail = validator.validate(email);
      if (!validEmail) {
        throw new apiError(400, "invalid email");
      }
      /**encrypt the passwor dbefore save */
      const salt = await genSalt(10);
      const hashed =  bcryptjs.hashSync(password);

      /**save to db */
        await db.user.create({
        fullName: fullName,
        email: email,
        password: hashed,
      });

      res.status(201).json(
        new apiResponse({
          message: "Registre Success",
        }),
      );
    } catch (error) {
        console.log("error", error.message);
        next(error);
    }
  });


  /**user login */
  static userLogin = asyncHandler(async(req,res,next) => {
    const { email, password }= req.body;
    try {
            /**find user with email */
            const user = await db.user.findOne({
                where: {email: email},
            });
            console.log("userID",user.userId);
            
            if (!user) {
                throw new apiError(400,"user not exist")
            }

            /**validate password */
            const isValidPassword = await bcryptjs.compare(password,user.password);
            console.log("password", isValidPassword);

            /**generate tokens */
            const accessToken = await generateAccessToken(user);
            const refreshToken = await generateRefreshToken(user);

            /** updat to database */
            await db.user.update(
                {
                refreshToken: refreshToken,
                isLoggedIn: true,
               
            },
           { 
            where:{ userId :user.userId}
        }
        );

            /**secure cookeis */
            const options ={
                httpOnly: true,
                secure: true
            };
            /**send secure cookie withe response */
            res.status(200)
            .cookie("accessToken", accessToken,{...options,path:"/"})
            .cookie("refreshToken", refreshToken,{...options,path:"/auth/refresh"})
            .json(new apiResponse({
                success: true,
                message:"user Logged success"
            }))

    } catch (error) {
        next(error)
    }
  });

  /**user loggout */
  static userLoggout = asyncHandler(async(req,res,next) => {
      try {
        const userId = req.user?.userId;
        if (!userId) {
            throw new apiError(401,"unaothorize user");
        }
        
        /**find user with userId */
        const user = await db.user.findByPk(userId);
        if (!user) {
            throw new apiError(401,"user not found")
        }

        /**update user */
        await db.user.update(
            {
                refreshToken: null,
                isLoggedIn: false
            },
           { where: {
                userId:user.userId
            }}
        );
    
        const options = {
            httpOnly: true,
            secure: true,
          };

          res.status(200)
          .clearCookie("accessToken",{...options, path:"/"})
          .clearCookie("refreshToken",{...options,path:"/auth/refresh"})
          .json(
            new apiResponse({
              success: true,
              message: "loggout success",
            }),
          );
        
    } catch (error) {
        next(error);
    }
  });

  /**create channel */
  static createChannel =  asyncHandler(async(req,res,next) => {
    
  })
 


}
export default userController;
