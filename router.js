import createStudent from "./src/controllers/mangeStudent/createStudent.js";
import listStudent from "./src/controllers/mangeStudent/listStudent.js";
import editStudent from "./src/controllers/mangeStudent/editStudent.js";
import deleteStudent from "./src/controllers/mangeStudent/deleteStudent.js";
import register from "./src/controllers/auth/register.js";
import login from "./src/controllers/auth/login.js";
import createStudentImage from "./src/controllers/mangeStudent/createStudent-image.js";
const router=(app)=>{
    //Student Management
 app.use("/api/create-student",createStudent);  //Without Image
 app.use("/api/createStudent-image",createStudentImage);  //With Image 
 app.use("/api/list-student",listStudent);
 app.use("/api/edit-student",editStudent);
 app.use("/api/delete-student",deleteStudent);

 //auth
 app.use("/api/register",register);
 app.use("/api/login",login);
};
export default router;
 