import express, { json, urlencoded } from "express";
import errorMiddleware from "./middlewares/error.middleware";
import cors from 'cors';
import coolkieParser from 'cookie-parser';
import helmate from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan"

const app = express();
app.use(morgan());
/**cors config
 */
 app.use(cors, ({
    origin: '*',
    credential: true
 }));

 /**limiting the json */
 app.use(json({
    limit:"20kb"
 }));

 /** form data*/
 app.use(urlencoded,({
    credential: true,
 }))
/**public accets */
app.use(express.static("/public"));

/**coolies */
app.use(coolkieParser())

/**helmate for protectation XSS, clickjacking, */
app.use(helmate())

/**Limite the request fro 5 minuites*/
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 40,
    message: "Too many request"
})
app.use(limiter);
/**global error handler */
app.use(errorMiddleware)


export default app