import mongoose from "mongoose";
import "dotenv/config";

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Database Connected");
  } catch (error) {
    console.error("Problem While Connecting to Database", error.message);
  }
};

export default connectDB;
