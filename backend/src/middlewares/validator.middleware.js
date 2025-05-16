
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

const createChnnelValidator = [
    body('handel')
    .notEmpty()
    .trim()
    .withMessage("Username is required"),
]

const videoUploadValidator = [
    body('title')
    .notEmpty()
    .trim()
    .withMessage("title is required"),


    body('description')
    .notEmpty()
    .trim()
    .withMessage("description is required"),


    body('duration')
    .notEmpty()
    .trim()
    .withMessage("duration is required")
];

const commentValidator = [
  body('content')
    .notEmpty()
    .trim()
    .withMessage("comment is required")
];

const tweetValidator = [
    body('content')
    .notEmpty()
    .trim()
    .withMessage("tweet is required")
]

export  {userRegisterValidator,userLoginValidator,createChnnelValidator,videoUploadValidator,commentValidator,tweetValidator}