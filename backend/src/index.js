import app from "./app.js";
import { connectDb, handelShutDown } from "./config/dbconnection.js";
import http from 'http';
import { PORT } from "./constants.js";

/**create server */
const server = http.createServer(app)

connectDb()
.then(() => {
        server.listen(PORT,() => {
            console.log(`server is listenning to the port ${PORT}`);
        })
        handelShutDown(server);
})
.catch((error) => {
    console.error(`server connection error ${error}`);
    process.exit(1)
})
