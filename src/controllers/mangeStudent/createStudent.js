import { Router} from "express";
import studentModel from "../../models/studentModel.js";
const router=Router();

export default router.post("/", async (req,res)=>{
    try{
        const{ name,rollno,email }=req.body || {};
        console.log("name",name);
        console.log("email",email);
        console.log("rollno",rollno); 

        if(!name || name==undefined){
            return res.send({ 
                code:201,
                message: "name is mandatory",
            })
        }

        if(!email || email==undefined){
            return res.send({ 
                code:201,
                message: "email is mandatory",
            })
        }

        if(!rollno || rollno==undefined){
            return res.send({ 
                code:201,
                message: "rollno is mandatory",
            })
        }

    let isEmaiValid=String(email).match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    if(isEmaiValid==null){
        return res.send({
            code:203,
            message:"email is invalid"
        })
    }

        let isRollnoExists=await studentModel.findOne({rollno:rollno});
        if(isRollnoExists){
        return res.send({
            code:202,
            message:"Rollno already exists", 
        });
    }

    let isEmaillExists=await studentModel.findOne({email:email});
    if(isEmaillExists){ 
        return res.send({
            code:203,
            message:"Email alredy exists",
        })
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
        return res.send({
            code:500,
            message:"Something went wrong",
        });
    }
}); 

