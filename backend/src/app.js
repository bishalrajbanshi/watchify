import express, { json, urlencoded } from "express";
import errorMiddleware from "./middlewares/error.middleware.js";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from "helmet"; 
import morgan from "morgan";
import status from "express-status-monitor"


const app = express();

// Logger
app.use(morgan('dev'));

// CORS config
app.use(cors({
  origin: '*',
  credentials: true
}));

// JSON payload size limit
app.use(json({ limit: "20kb" }));

// Form data
app.use(urlencoded({ extended: true }));

// Public assets
app.use(express.static("public"));

// Cookies
app.use(cookieParser());

// Helmet for security headers
app.use(helmet());


//**rest api */
import userroute from './routes/user.route.js';
import channelroute from './routes/channel.route.js';
import videoroute  from "./routes/video.route.js";
import likeroute from "./routes/like.route.js";
import commentroute from "./routes/comment.route.js";
import tweetroute from "./routes/tweet.route.js"

  /** REST routes  */
  app.use("/api/v1/user", userroute);
  app.use("/api/v1/channel", channelroute);
  app.use("/api/v1/video",videoroute);
  app.use("/api/v1/like",likeroute);
  app.use("/api/v1/comment",commentroute);
  app.use("/api/v1/tweet",tweetroute);

  /** Global error handler */
  app.use(errorMiddleware);






export default app;