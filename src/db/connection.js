import mongoose from "mongoose";
import { app } from "../app.js";

async function connectMongoDB() {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/gadget-galaxy`);
    app.listen(process.env.PORT, () => {
      console.log(`Server is Listening at Port : ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(`Error in MongoDB Connection ERROR: ${error}`);
  }
}

export { connectMongoDB };
