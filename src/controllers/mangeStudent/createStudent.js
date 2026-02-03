import { Router} from "express";
const router=Router();
import studentModel from "../../models/studentModel.js";
import {send, setErrMsg} from "../../helper/responseHelper.js";
import {RESPONSE} from "../../config/global.js";
import { authenticate } from "../../middlewares/authencate.js";

export default router.post("/", authenticate, async (req,res)=>{
    try{
        const{ name,rollno,email }=req.body || {};
       
        if(!name || name==undefined){
           
            return send(res,setErrMsg("Name",RESPONSE.REQUIRED))
        } 

        if(!email || email==undefined){
           
            return send(res,setErrMsg("Email",RESPONSE.REQUIRED))
        }

        if(!rollno || rollno==undefined){
           
            return send(res,setErrMsg("rollno",RESPONSE.REQUIRED))
        }

    let isEmaiValid=String(email).match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    if(isEmaiValid==null){
       
        return send(res,setErrMsg("Email",RESPONSE.INVALID));
    }

        let isRollnoExists=await studentModel.findOne({rollno:rollno});
        if(isRollnoExists){
        
        return send(res,setErrMsg("Rollno",RESPONSE.ALREADY_EXISTS));
    }

    let isEmaillExists=await studentModel.findOne({email:email});
    if(isEmaillExists){ 
       
        return send(res,setErrMsg("Email",RESPONSE.ALREADY_EXISTS));
    }
    
         await studentModel.create({
        name:name,
        rollno:rollno,
         email:email,
        });  


        return res.send({
            code:200,
            message:"Student created succesfully"
        })

        
    } catch(error){
        console.log("create student",error);
      
        return send(res,RESPONSE.UNKNOWN_ERR);
    }
}); 


