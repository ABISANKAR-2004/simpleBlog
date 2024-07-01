const mongoose=require("mongoose");
const createSchema=new mongoose.Schema({
    id:{type:Number,unique:true},
    title:{type:String},
    datetime:{type:String},
    body:{type:String}
})
const CreateModel=mongoose.model("Post",createSchema);
module.exports=CreateModel