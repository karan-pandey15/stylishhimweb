import mongoose from "mongoose";
const mongo_uri = 'mongodb+srv://pandeykaran1515:v0oS4nJg4GM1IPy6@cluster0.nx6ahz1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


const db = mongoose
  .connect(mongo_uri)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Error while connecting to Database", error.message);
    process.exit(1);
  });

export default db;
