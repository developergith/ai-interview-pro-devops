import express from "express";
import Interview from "../Models/Interview.js";
import { generateInterviewQuestions, generateAnswer } from "../utils/gemini.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ============= GENERATE INTERVIEW QUESTIONS =============
router.post("/generate", authMiddleware, async (req, res) => {
  try {
    const role = req.body.role || req.body.jobRole;
    const { experienceLevel, techStack } = req.body;

    if (!role || !experienceLevel || !techStack) {
      return res.status(400).json({ message: "All fields required" });
    }

    const techStackArray = Array.isArray(techStack)
      ? techStack
      : techStack.split(",").map(t => t.trim());

    const questionsArray = await generateInterviewQuestions(role, experienceLevel, techStackArray);

    const interview = await Interview.create({
      user: req.user.id,
      role,
      experienceLevel,
      techStack: techStackArray,
      questions: questionsArray,
      totalQuestions: questionsArray.length
    });

    res.status(200).json(interview);
  } catch (error) {
    console.error("Interview Generation Error:", error);
    res.status(500).json({ message: "Interview Generation Failed" });
  }
});

// ============= GET ALL HISTORY =============
router.get("/history", authMiddleware, async (req, res) => {
  try {
    const interviews = await Interview.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .select("-answers"); // Don't send full answers in list view

    res.json(interviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch history" });
  }
});

// ============= GET DASHBOARD STATS =============
router.get("/stats", authMiddleware, async (req, res) => {
  try {
    const interviews = await Interview.find({ user: req.user.id });

    const totalInterviews = interviews.length;
    const totalQuestionsAnswered = interviews.reduce((sum, i) => sum + (i.questionsAnswered || 0), 0);
    const avgScore = totalInterviews > 0
      ? Math.round(interviews.reduce((sum, i) => sum + (i.score || 0), 0) / totalInterviews)
      : 0;

    res.json({
      totalInterviews,
      totalQuestionsAnswered,
      avgScore
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
});

// ============= GET SINGLE INTERVIEW DETAIL =============
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    res.json(interview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch interview" });
  }
});

// ============= GENERATE ANSWER FOR A QUESTION =============
router.post("/:id/answer/:questionIndex", authMiddleware, async (req, res) => {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    const questionIndex = parseInt(req.params.questionIndex);
    if (questionIndex < 0 || questionIndex >= interview.questions.length) {
      return res.status(400).json({ message: "Invalid question index" });
    }

    const questionText = interview.questions[questionIndex];

    // Check if answer already exists
    const existingAnswer = interview.answers.find(a => a.questionIndex === questionIndex);
    if (existingAnswer) {
      return res.json(existingAnswer);
    }

    // Generate answer using AI
    const { answer, keyPoints } = await generateAnswer(
      questionText,
      interview.role,
      interview.experienceLevel,
      interview.techStack
    );

    const newAnswer = {
      questionIndex,
      questionText,
      answer,
      keyPoints: keyPoints || []
    };

    // Save answer to interview
    interview.answers.push(newAnswer);
    interview.questionsAnswered = interview.answers.length;
    await interview.save();

    res.json(newAnswer);
  } catch (error) {
    console.error("Answer Generation Error:", error);
    res.status(500).json({ message: "Failed to generate answer" });
  }
});

// ============= DELETE INTERVIEW =============
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const interview = await Interview.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    res.json({ message: "Interview deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete interview" });
  }
});

export default router;
