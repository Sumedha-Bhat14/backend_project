import { Router } from "express";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import { RESPONSE } from "../../config/global.js"; 
import studentModel from "../../models/studentModel.js";
import { STATE } from "../../config/constatnt.js";
const router=Router();
import {authenticate}  from "../../middlewares/authencate.js";


export default router.get("/", authenticate, async(req,res)=>{
    try{
    
    let page=req.query.page? Number(req.query.page):1;
    let limit=req.query.limit? Number(req.query.limit):10;
    let skip=(page-1)*limit
        //skip =(2-1)*1==1
    let students=await studentModel
    .find(
        {
    isactive:STATE.ACTIVE,
    name:{
        $regex:req.query.searchkey??"",
        $options:"i",
    },
    teacher_id:req.user.id,  //Accesing teacher id from token
    },
        { __v:0 },
        )
        .skip(skip)
        .limit(limit);

    if (students.length==0){
        return send(res,setErrMsg("students",RESPONSE.NOT_FOUND));
    }

    students=students.map((student)=>({
        ...student.toJSON(),
        image:student.image? "/uploads" +student.image:null,
    }));
    
    return send(res,RESPONSE.SUCCESS,students);
    

    }catch(error){
        console.log("list student",error);
        return send(res,RESPONSE.UNKNOWN_ERR);
        
    }
})