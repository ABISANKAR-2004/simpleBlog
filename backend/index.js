const express=require("express");
const app=express();

const Mongoose=require("mongoose");
app.use(express.json());
Mongoose.connect('mongodb+srv://abiabisankar2004:113021104003@cluster0.g8by9zm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{console.log("connecting data base successfully")}).catch((e)=>{console.log(e)})
app.listen("4000",()=>{console.log("server is running")});