class apiresponse{ 
    constructor({
        statusCode,
        data,
        success= true,
        message ="success"
    }){
        this.statusCode= statusCode,
        this.data= data,
        this.success= success
        this.message= message
    }
}

export default apiresponse