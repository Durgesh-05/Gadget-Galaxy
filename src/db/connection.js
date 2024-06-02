import mongoose from "mongoose";

async function connectMongoDB() {
  return mongoose.connect(`${process.env.MONGO_URI}/gadget-galaxy`);
}

export { connectMongoDB };
