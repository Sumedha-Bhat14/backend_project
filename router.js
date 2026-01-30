import createStudent from "./src/controllers/mangeStudent/createStudent.js";
import listStudent from "./src/controllers/listStudent.js";

const router=(app)=>{
 app.use("/api/create-student",createStudent);
 app.use("/api/list-student",listStudent);
};
export default router;
