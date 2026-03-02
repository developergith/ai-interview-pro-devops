import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import mongoose from "mongoose";
import interviewRoutes from "./routes/interview.js";
 
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);



/*===================MongoDb Connection===================*/

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log(" MongoDB Connected Successfully");
})
.catch(err => {
  console.log(" Mongo Error:", err.message);
});



app.get("/", (req, res) => {
  res.send("AI Interview Pro Backend Running");
});

console.log("Gemini Key:", process.env.GEMINI_API_KEY);

 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

