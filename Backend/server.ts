import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";


import connectDB from "./config/db";
import { generateCoverLetter } from "./cover-letter-ai/route";
import bodyParser from "body-parser";


connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// routes

app.post("/generate-cover-letter", generateCoverLetter);



app.get("/", (req, res) => {
  res.send("Backend is running! Welcome to Rezoom AI API.");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
