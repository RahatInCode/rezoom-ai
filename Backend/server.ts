import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";


import connectDB from "./config/db";

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// server.ts (after app.use(express.json());)
app.get("/", (req, res) => {
  res.send("Backend is running! Welcome to Rezoom AI API.");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
