import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

import bodyParser from "body-parser";
import { model, Schema, Document } from "mongoose";

import admin from "../app/lib/firebaseAdmin";
import { connectDB } from "./config/db";





// ----------------------------------------------
// 1️⃣ User Collection Type & Model
// ----------------------------------------------


export interface IUser extends Document {
  username: string;
  email: string;
  plan: string;
  joinDate: Date;
  lastActivity: Date;
  status: string;
  // role: string;
}


const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  plan: { type: String, default: "Free" },
  joinDate: { type: Date, default: Date.now },
  lastActivity: { type: Date, default: Date.now },
  status: { type: String, default: "active" },
  // role: { type: String, default: "user" },
});



const User = model<IUser>("User", userSchema);


// ----------------------------------------------
// 2️⃣ Firebase Token Verify Middleware
// ----------------------------------------------

export interface AuthenticatedRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

export const verifyToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  console.log("Middleware triggered! Authorization header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized Access" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedUser = await admin.auth().verifyIdToken(token);
    req.user = decodedUser; // ✅ user info attach
    console.log("Token verified successfully! User:", decodedUser);
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    res.status(403).json({ error: "Forbidden Access" });
  }
};


// ----------------------------------------------
// 3️⃣ Database Connection
// ----------------------------------------------

connectDB();

// ----------------------------------------------
// 4️⃣ Express App Setup
// ----------------------------------------------

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
  origin: ["http://localhost:3000"],  // ✅ allow your Next.js frontend
  credentials: true,
}));

// ----------------------------------------------
// 5️⃣ Routes
// ----------------------------------------------

//  Get all users for admin dashboard

app.get("/users", async (req: Request, res: Response): Promise<void> => {
  console.log("📡 GET /users route hit");

  try {
    const users = await User.find(); 
    res.status(200).json(users); 
  } catch (error: unknown) {
    console.error("Error fetching users:", error);
    if (error instanceof Error) {
      res.status(500).json({ message: "Error fetching users", error: error.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
});

// Create user when signing up
app.post("/users", async (req: Request, res: Response): Promise<void> => {
  console.log("📩 /users route hit with body:", req.body);

  try {
    const { username, email, plan, joinDate, lastActivity, status} = req.body;

    const newUser = new User({
      username,
      email,
      plan: plan || "Free",
      joinDate: joinDate ? new Date(joinDate) : Date.now(),
      lastActivity: lastActivity ? new Date(lastActivity) : Date.now(),
      status: status || "active",
      // role: role || "user",
    });

    const savedUser = await newUser.save();
    res.status(201).json({
      message: "✅ User created successfully!",
      user: savedUser,
    });
  } catch (error: unknown) {
    console.error("❌ Error creating user:", error);
    if (error instanceof Error) {
      res.status(500).json({ message: "Error creating user", error: error.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
});




// ✅ Protected route example
app.get("/protected", verifyToken, (req: AuthenticatedRequest, res: Response) => {
  res.json({ message: "You are authorized!", user: req.user });
});

// ✅ Default route
app.get("/", (req: Request, res: Response) => {
  res.send("Backend is running! Welcome to Rezoom AI API.");
});

// ----------------------------------------------
// 6️⃣ Start Server
// ----------------------------------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
