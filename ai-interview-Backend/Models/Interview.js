import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  role: {
    type: String,
    required: true
  },
  experienceLevel: {
    type: String,
    required: true
  },
  techStack: {
    type: [String],
    required: true
  },
  questions: {
    type: [String],
    required: true
  },
  score: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model("Interview", interviewSchema);
