import {Router} from 'express';
const router=Router();
import studentModel from "../../models/studentModel.js";
import { send,setErrMsg} from "../../helper/responseHelper.js";
import {RESPONSE} from "../../config/global.js";
import {STATE} from "../../config/constatnt.js";



export default router.put("/", async (req,res)=>{
    try{
        const{ name,rollno,email }=req.body || {};

        let updateData={};
        
        let id=req.query.id;
        if(!id || id==undefined){
            return send(res,setErrMsg("id",RESPONSE.REQUIRED))
        }
        
        if(name && name!=undefined){
            updateData.name=name;
        }
        if(rollno && rollno!=undefined){
            let isRollnoExists=await studentModel.findOne({
                _id:{$ne:id},
                rollno:rollno,
            });

            if(isRollnoExists){
       return send(res,setErrMsg("Rollno",RESPONSE.ALREADY_EXISTS));
    }
            updateData.rollno=rollno;
        }
        if(email && email!=undefined){
            
            let isEmaiValid=String(email).match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
            if(isEmaiValid==null){ 
                return send(res,setErrMsg("Email",RESPONSE.INVALID));
            }
            let isEmailExists=await studentModel.findOne({
                email:email,
                _id:{$ne:id},
            });

            // let isEmaillExists=await studentModel.findOne({email:email});
             if(isEmailExists){ 
                return send(res,setErrMsg("Email",RESPONSE.ALREADY_EXISTS));
    }

            updateData.email=email;
        }
        
        console.log(updateData)

        await studentModel.updateOne(
            {
                _id:id,
            },
            {
                $set:updateData,
            },
        ); 
 
        return send(res,RESPONSE.SUCCESS);
    } catch(error){
        console.log("Edit student",error);
      return send(res,RESPONSE.UNKNOWN_ERR);
    }
});  

