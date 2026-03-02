import express from "express";
import Interview from "../Models/Interview.js";
import { generateInterviewQuestions } from "../utils/gemini.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/generate", authMiddleware, async (req, res) => {
  try {
    const role = req.body.role || req.body.jobRole;
    const { experienceLevel, techStack } = req.body;

    if (!role || !experienceLevel || !techStack) {
      return res.status(400).json({ message: "All fields required" });
    }

    // ✅ Now this directly returns array of questions
    const questionsArray = await generateInterviewQuestions(
      role,
      experienceLevel,
      techStack
    );

    const interview = await Interview.create({
      user: req.user.id,
      role,
      experienceLevel,
      techStack: Array.isArray(techStack)
        ? techStack
        : techStack.split(",").map(t => t.trim()),

      questions: questionsArray
    });

    res.status(200).json(interview);

  } catch (error) {
    console.error("Interview Generation Error:", error);
    res.status(500).json({ message: "Interview Generation Failed" });
  }
});

router.get("/history", authMiddleware, async (req, res) => {
  try {
    const interviews = await Interview.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json(interviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch history" });
  }
});

export default router;

