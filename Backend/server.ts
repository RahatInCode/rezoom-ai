import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";


import connectDB from "./config/db";

import bodyParser from "body-parser";
import { model, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  role : string
}
// 2️⃣ Mongoose Schema
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  
});
const User = model<IUser>("User", userSchema);  // create user collection in mongoose

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


//get data when user signUp 

app.post('/users',  async (req: Request, res: Response): Promise<void> =>{
  try {
    // req.body এর টাইপ define করো
    const { name, email, role } = req.body as IUser;

    const newUser = new User({ name, email, role });
    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User created successfully!",
      user: savedUser,
    });
  }catch (error: unknown) {
  if (error instanceof Error) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  } else {
    res.status(500).json({ message: "Unknown error occurred" });
  }
}
   
})



app.get("/", (req, res) => {
  res.send("Backend is running! Welcome to Rezoom AI API.");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
