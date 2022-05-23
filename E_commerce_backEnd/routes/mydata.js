const url='https://course-api.com/react-store-products'
const axios=require('axios')

const myData=async (req,res)=>{
    try{
    
    const {data}=await axios.get('https://course-api.com/react-store-products')
     return res.status(200).send(data)
    }   
    catch(err){
        console.log(err)
    }
}
module.exports=myData