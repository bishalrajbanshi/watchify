import apiError from "../utils/apiError.js";

const errorMiddleware = (err, req, res, next) => {
  // Handle Sequelize validation/unique constraint errors
  if (
    err.name === 'SequelizeValidationError' ||
    err.name === 'SequelizeUniqueConstraintError'
  ) {

    console.log("sequlize error",err);
    
    const messages = err.errors.map((error) => error.message);

    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: err.message,          
      errors: messages               
    });
  }

  // Handle custom apiError
  if (err instanceof apiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors || [],
      data: err.data || null
    });
  }
  console.error(err.stack);

  return res.status(500).json({
    success: false,
    statusCode: 500,
    message: err.message || "Internal Server Error",
    errors: [],
    data: null,
  });
};

export default errorMiddleware;
