import { Router} from "express";
const router=Router();
import teacherModel from "../../models/TeacherModel.js";
import {send, setErrMsg} from "../../helper/responseHelper.js";
import {RESPONSE} from "../../config/global.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default router.post("/", async (req,res)=>{
    try{
        const{ password,email }=req.body || {};

        if(!email || email==undefined){
            return send(res,setErrMsg("Email",RESPONSE.REQUIRED));
        }

        if(!password|| password==undefined){
            return send(res,setErrMsg("password",RESPONSE.REQUIRED));
        }

    let userData=await teacherModel.findOne({email:email});

        if(userData && (await bcrypt.compare(password,userData.password))){
          
        let token=jwt.sign({
            id:userData._id,
            email:userData.email,
        },
         process.env.JWT_SECRET_KEY,
         //{expriencee:"1h"},
        );

            return send(res,RESPONSE.SUCCESS,{access_token:token});
        }else{
            return send(res,setErrMsg("Login Credential",RESPONSE.INVALID));
        }

    } catch(error){
        console.log("login",error);
        return send(res,RESPONSE.UNKNOWN_ERR);
    }
}); 

