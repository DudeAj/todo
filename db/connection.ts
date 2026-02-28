import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    return;
  }
  if (!process?.env?.MONGO_URI) {
    console.log("Please provide connecting string");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = db.connections[0]?.readyState === 1;
    console.log("DB connected successfully");
  } catch (err) {
    console.log("unable to connect to server", err);
  }
};
