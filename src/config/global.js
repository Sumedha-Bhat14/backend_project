import e from "express";

export const RESPONSE={
    REQUIRED:{
        code:201,
        message:" is mandatory",
    },
INVALID:{
    code:202,
    message:" is invalid",
},
ALREADY_EXISTS:{
    code:201,
    message:"already exsits",
},
NOT_FOUND:{
    code:205,
    message:"notfound",
},
ACCESS_DENIED:{
    code:400,
    message:"Access denied", 
},
SUCCESS:{
    code:200,
    message:"everything is ok",
},
UNKNOWN_ERR:{
    code:500,
    message:"something went wrong",
},
};
