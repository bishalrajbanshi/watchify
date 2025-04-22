
import { body } from "express-validator";

const  userRegisterValidator = [
    body('fullName')
    .notEmpty()
    .trim()
    .withMessage("Full Name is Required"),

    body('email')
    .notEmpty()
    .trim()
    .withMessage("Email is Required"),

    body('password')
    .notEmpty()
    .trim()
    .withMessage("Password is required")
];


const userLoginValidator = [
    body('email')
    .notEmpty()
    .withMessage("Email is Required"),

    body('password')
    .notEmpty()
    .trim()
    .withMessage("Password is required")
]

export  {userRegisterValidator,userLoginValidator}