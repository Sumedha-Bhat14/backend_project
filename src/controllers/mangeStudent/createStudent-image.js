import { Router} from "express";
const router=Router();
import studentModel from "../../models/studentModel.js";
import {send, setErrMsg} from "../../helper/responseHelper.js";
import {RESPONSE} from "../../config/global.js";
import { authenticate } from "../../middlewares/authencate.js";
import upload from "../../middlewares/upload.js";
const imageUpload=upload.single("image");   //single multer
//const imageUpload=upload.array("images",3);  //array multer
//const imageUpload=upload.fields([  //fields multer
//{name:"prod-images",maxCount:3},
//{name:"cat-images",maxCount:1},
//])
export default router.post("/", authenticate, async (req,res)=>{
    try{

        imageUpload(req,res,async(err)=>{
            if(err){
                return send(res,setErrMsg(err,RESPONSE.MULTER_ERR));
            }
        // 
            if(!req.file || req.file==undefined){
                return send(res,setErrMsg("image",RESPONSE.REQUIRED));
            }

        //for upload array
        //if(!req.file || req.files.length==0){
           // return setDriver(res,setErrMsg("images",RESPONSE.REQUIRED))
       // }
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
            name,
            rollno,
             email,
             teacher_id:req.user.id, //Accesssing teacher id from token
             image:req.file.filename,
            });  
    
    
            return send(res,RESPONSE.SUCCESS);
        })
        
       
    } catch(error){
        console.log("create student",error);
        return send(res,RESPONSE.UNKNOWN_ERR);
    }
}); 


