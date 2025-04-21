import apiError from "../utils/apiError.js"
const errorMiddleware = (err,req,res,next) => {
     // If it's an instance of ApiError, send the formatted response

     if(err instanceof apiError){
        return res.status(err.statusCode)
        .json({
            success: err.succes,
            statusCode: err.statusCode,
            message: err.message,
            errors: err.errors || [],
            data: err.data
        })
     }

      // For unexpected errors, log them
  console.error(err.stack);

  return res.status(500).json({
    success: false,
    statusCode: 500,
    message: err.message || "Internal Server Error",
    errors: [],
    data: null,
  });
}

export default errorMiddleware;