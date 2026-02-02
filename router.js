import createStudent from "./src/controllers/mangeStudent/createStudent.js";
import listStudent from "./src/controllers/listStudent.js";
import editStudent from "./src/controllers/mangeStudent/editStudent.js";
import deleteStudent from "./src/controllers/mangeStudent/deleteStudent.js";
import register from "./src/controllers/auth/register.js";
const router=(app)=>{
 app.use("/api/create-student",createStudent);
 app.use("/api/list-student",listStudent);
 app.use("/api/edit-student",editStudent);
 app.use("/api/delete-student",deleteStudent);

 //auth
 app.use("/api/register",register);
};
export default router;
 