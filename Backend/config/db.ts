import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("❌ MONGO_URI not found in .env file");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      dbName: "rezoom-ai",
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};
