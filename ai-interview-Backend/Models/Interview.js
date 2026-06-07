import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  questionIndex: { type: Number, required: true },
  questionText: { type: String, required: true },
  answer: { type: String, required: true },
  keyPoints: { type: [String], default: [] }
}, { _id: false });

const interviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  role: { type: String, required: true },
  experienceLevel: { type: String, required: true },
  techStack: { type: [String], required: true },
  questions: { type: [String], required: true },
  answers: { type: [answerSchema], default: [] },
  score: { type: Number, default: 0 },
  totalQuestions: { type: Number, default: 0 },
  questionsAnswered: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Interview", interviewSchema);
