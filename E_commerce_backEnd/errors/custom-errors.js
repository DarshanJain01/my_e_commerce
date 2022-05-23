class CustomAPIError extends Error {
    constructor(message,statusCode){
        super(message)
        this.statusCode=statusCode
    }
}
const customErrorFun=(message,statusCode)=>{
    return new CustomAPIError(message,statusCode)
}
module.exports={customErrorFun,CustomAPIError}