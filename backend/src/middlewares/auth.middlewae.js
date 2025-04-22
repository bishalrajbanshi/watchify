import { ACCESSTOKENSECRET } from "../constants.js";
import apiError from "../utils/apiError.js";
import jwt from "jsonwebtoken";

const verifyJwt = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.headers.authorization?.replace("Bearer", "");
    if (!token) {
      throw new apiError(400, "token not found");
    }

    const decodeToken = jwt.verify(token, ACCESSTOKENSECRET);
    req.user = decodeToken;
    next();
  } catch (error) {
    console.error("JWT Verification error:", error);

    if (error.name === "TokenExpiredError") {
      return next(
        new apiError(new apiError(401, "expired token")),
      );
    }

    return next(new apiError(401, "Invalid or expired token"));
  }
};

export default verifyJwt;
