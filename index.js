import express from "express";
const app=express();
import dotenv from "dotenv";
import connectDB from "./src/helper/dbConnection.js";
dotenv.config({quiet:true})
const PORT=process.env.PORT 

connectDB();

app.listen(PORT, ()=>{
    console.log("server is running on port", PORT);
})
