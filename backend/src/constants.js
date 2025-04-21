import { config as configDotenv } from 'dotenv';
configDotenv()
const USERNAME = process.env.USERNAME;
const DATABASENAME = process.env.DATABASENAME;
const PASSWORD = process.env.PASSWORD;
const PORT = process.env.PORT;
console.log(USERNAME,DATABASENAME,PASSWORD);


export {
    USERNAME,
    PASSWORD,DATABASENAME,PORT
}