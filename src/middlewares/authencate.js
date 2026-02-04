import { RESPONSE } from "../config/global.js";
import { send, setErrMsg } from "../helper/responseHelper.js";
import jwt from "jsonwebtoken";

export const authenticate=async(req,res,next)=>{
    try{
   let token=req.headers["authorization"];

    if(!token){
        return send(res,RESPONSE.ACCESS_DENIED);
    }

    let decoded=await jwt.verify(token,process.env.JWT_SECRET_KEY);

    //decoded={
    //"id":"",
    //email:"",
    //};

    req.user=decoded;
    next();
    }catch(error){
        console.log("Authenticate",error);
        return send(res,setErrMsg("Token",RESPONSE.INVALID));
    }
};
