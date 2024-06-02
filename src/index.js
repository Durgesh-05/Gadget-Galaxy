import dotenv from "dotenv";
dotenv.config({
  path: "./env",
});
import { app } from "./app.js";
import { connectMongoDB } from "./db/connection.js";

connectMongoDB()
  .then(() => {
    console.log("MongoDB Connection Succeed!! ");
    app.listen(process.env.PORT, () => {
      console.log(`Server is Listening at Port : ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log(`MongoDB Connection Failed ERROR: ${error}`));
