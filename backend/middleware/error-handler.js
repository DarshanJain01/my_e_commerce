const {CustomAPIError}=require('../errors/custom-errors')
const errorHandler=(err,req,res,next)=>{
    if(err instanceof CustomAPIError) {    console.log("I am called");
    return res.status(err.statusCode).json({msg:err.message})}
    console.log("I am called2    ");

    return res.status(500).json({msg:'error occured, please try again later'})
    }
module.exports=errorHandler 