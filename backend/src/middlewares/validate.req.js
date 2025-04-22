import { validationResult } from "express-validator";
import apiError from "../utils/apiError.js";

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    console.log("Validation Errors:", errors);

    if (!errors.isEmpty()) {
        const errorMsg = errors.array().map(err => err.msg).join(', '); 
        return next(new apiError(400, errorMsg));
    }
    next();
}

export default validateRequest;
