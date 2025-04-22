import express, { json, urlencoded } from "express";
import errorMiddleware from "./middlewares/error.middleware.js";
import cors from 'cors';
import coolkieParser from 'cookie-parser';
import helmate from "helmet";
// import rateLimit from "express-rate-limit";
import morgan from "morgan";

const app = express();
app.use(morgan(' '));

/** CORS config */
app.use(cors({
    origin: '*',
    credentials: true
}));

/** Limiting the JSON payload size */
app.use(json({
    limit: "20kb"
}));

/** Form data parsing */
app.use(urlencoded({
    extended: true
}));

/** Public assets */
app.use(express.static("public"));

/** Cookies */
app.use(coolkieParser());

/** Helmet for protection against XSS, clickjacking, etc. */
app.use(helmate());

/** Rate limiting (if you want to use it) */
// const limiter = rateLimit({
//     windowMs: 5 * 60 * 1000,
//     max: 40,
//     message: "Too many requests"
// });
// app.use(limiter);

// Routes
import userroute from './routes/user.route.js';
app.use("/api/v1/user", userroute);

/** Global error handler */
app.use(errorMiddleware);

export default app;
