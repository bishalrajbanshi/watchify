import { Sequelize } from 'sequelize'
import { DATABASENAME,PASSWORD,USERNAME } from "../constants.js";

/**create connection */

const sequelize = new Sequelize("watchify","root","bishal",{
    host: "localhost",
    dialect: "mysql"
});


async function connectDb() {
    try {
        await sequelize.authenticate();
        console.log("DATABASE CONNECTED");
    } catch (error) {
        console.error("DATABASE CONNECTION ERROR", error);
    }
    return sequelize;
}

async function shutdown (){
    try {
        console.log(" before Terminating Database");
        await sequelize.close();
        console.log("After closing DB connection");
        console.log("Database Terminated");
    } catch (error) {
        console.error("Error terminating databse",error);
    }
  
}

function handelShutDown() {
    process.on("SIGINT",async() => {
        console.log("Termination Signal recived SIGINIT");
        await shutdown();
        process.exit(1)
    });
    process.on("SIGTERM",  async() => {
        console.log("Termination Signal recived SINGTERM");
        await shutdown();
        process.exit(1)

    })
}


export {
    connectDb,
    sequelize,
    handelShutDown,
}