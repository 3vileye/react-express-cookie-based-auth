// import { logger } from "./WinstonErrorLogger";
const logger = require("./WinstonErrorLogger");

const HandleError = async (error,req,res,next)=>{
    let status = 500;
    if(error.hasOwnProperty('status')){
        status = error.status;
    }
    logger.error(error.stack);
    res.status(status).json({message:'server error'});
}
module.exports = HandleError;