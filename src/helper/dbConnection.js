import mongoose from "mongoose";
const connectDB=async()=>{
    mongoose.connect(
        "mongodb+srv://sumedha27:sumedha123@cluster0.ovgtmvz.mongodb.net/?appName=Cluster0", // mongoDB connection string for compass 
        {dbName: "internship" },
        //mongoDB connection string for atlas
    ) 
  .then(() => console.log('Connected!'))
  .catch((err)=>console.log("Err while connecting to DB",err))
};
export default connectDB;
 