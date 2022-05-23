const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema(
    {id:"String",
    name:"String",
    price:"Number",
    image:"String",
    color:[{
        singleColor:"String",
        count:{type:"Number",default:0}
    }],
    company:"String",
    description:"String",
    category:"String",
    shipping:"Boolean",
    totalCount:"Number",
    totalPrice:"Number"
    })

module.exports=mongoose.model('Task',TaskSchema)    