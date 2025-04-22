import jwt from "jsonwebtoken";

import { 
    ACCESSTOKENEXPIRY,
    ACCESSTOKENSECRET ,
    REFRESHTOKENSECRET,
    REFRESHTOKENEXPITY
} from "../constants.js";

async function generateAccessToken(user) {
    console.log("tokenuser",user);
    
    return jwt.sign({
        userId: user.userId,
        email: user.email,
    },ACCESSTOKENSECRET, {
        expiresIn: ACCESSTOKENEXPIRY
    })
};
async function generateRefreshToken(user) {
    return jwt.sign({
        userId: user.userId,
        email: user.email,
    },ACCESSTOKENSECRET, {
        expiresIn: ACCESSTOKENEXPIRY
    })
}

export { generateAccessToken, generateRefreshToken }