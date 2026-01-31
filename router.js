import createStudent from "./src/controllers/mangeStudent/createStudent.js";
import listStudent from "./src/controllers/listStudent.js";
import editStudent from "./src/controllers/mangeStudent/editStudent.js";
const router=(app)=>{
 app.use("/api/create-student",createStudent);
 app.use("/api/list-student",listStudent);
 app.use("/api/edit-student",editStudent);
};
export default router;
