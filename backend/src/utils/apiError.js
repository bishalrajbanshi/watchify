class apiError extends Error {
    constructor(
        statusCode,
        message ="something went wrong",
        errors =[],
        stack=""
    ){
        super(message)
        this.statusCode= statusCode,
        this.errors= errors,
        this.message= message,
        this.succes= false,
        this.data=null
    }

    if (stack) {
        Error.captureStackTrace(this, this.constructor);
      }
};

export default apiError