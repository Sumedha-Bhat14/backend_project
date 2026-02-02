import { Router} from "express";
import teacherModel from "../../models/TeacherModel.js";
import {send, setErrMsg} from "../../helper/responseHelper.js";
import {RESPONSE} from "../../config/global.js";
import bcrypt from "bcrypt";
const router=Router();
export default router.post("/", async (req,res)=>{
    try{
        const{ name,password,email }=req.body || {};
        

        if(!name || name==undefined){
            return send(res,setErrMsg("Name",RESPONSE.REQUIRED));
        } 

        if(!email || email==undefined){
            return send(res,setErrMsg("Email",RESPONSE.REQUIRED));
        }

        if(!password|| password==undefined){
            return send(res,setErrMsg("password",RESPONSE.REQUIRED));
        }

    let isEmaiValid=String(email).match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    if(isEmaiValid==null){
        return send(res,setErrMsg("Email",RESPONSE.INVALID));
    }

 //Password validation
     let isPassword=String(password).match(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/); 
     if(isPassword==null){
         return send(res,setErrMsg("Email",RESPONSE.INVALID));
     }

    let isEmaillExists=await teacherModel.findOne({email:email});
    if(isEmaillExists){ 
        return send(res,setErrMsg("Email",RESPONSE.ALREADY_EXISTS));
    }
    
    let encryptedPassword=await bcrypt.hash(password,10);

         await teacherModel.create({
        name,
        email,
        password:encryptedPassword,
        });   
    
       
        return send(res,RESPONSE.SUCCESS);
    } catch(error){
        console.log("Register",error);
        return send(res,RESPONSE.UNKNOWN_ERR);
    }
}); 

