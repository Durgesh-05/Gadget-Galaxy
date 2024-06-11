import dotenv from "dotenv";
dotenv.config();
import { connectMongoDB } from "./db/connection.js";

connectMongoDB()
  .then(() => {
    console.log("MongoDB Connection Succeed!! ");
  })
  .catch((error) => console.log(`MongoDB Connection Failed ERROR: ${error}`));
