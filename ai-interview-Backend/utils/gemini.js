import { GoogleGenerativeAI } from "@google/generative-ai";

// Generate interview questions using Gemini AI
export async function generateInterviewQuestions(role, experienceLevel, techStack) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === "undefined" || apiKey.trim() === "") {
      console.log("No Gemini API key, using fallback questions");
      return generateFallbackQuestions(role, experienceLevel, techStack);
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const stackStr = Array.isArray(techStack) ? techStack.join(", ") : techStack;

    const prompt = `Generate exactly 20 technical interview questions for a ${experienceLevel} ${role} developer with expertise in ${stackStr}.

Requirements:
- Questions should be relevant to the role and tech stack
- Mix of conceptual, practical, and scenario-based questions
- Appropriate difficulty for ${experienceLevel} level
- Each question should be clear and specific

Return ONLY a JSON array of strings (no markdown, no explanation), like:
["Question 1?", "Question 2?", ...]`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Parse JSON from response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const questions = JSON.parse(jsonMatch[0]);
      if (Array.isArray(questions) && questions.length > 0) {
        return questions.slice(0, 20);
      }
    }

    return generateFallbackQuestions(role, experienceLevel, techStack);
  } catch (error) {
    console.error("Gemini question generation error:", error.message);
    return generateFallbackQuestions(role, experienceLevel, techStack);
  }
}

// Generate a single answer for a question using Gemini AI
export async function generateAnswer(question, role, experienceLevel, techStack) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === "undefined" || apiKey.trim() === "") {
      return generateFallbackAnswer(question);
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const stackStr = Array.isArray(techStack) ? techStack.join(", ") : techStack;

    const prompt = `You are an expert interviewer. Provide a comprehensive answer for this interview question.

Role: ${role}
Experience Level: ${experienceLevel}
Tech Stack: ${stackStr}
Question: ${question}

Return ONLY a JSON object (no markdown) with this exact structure:
{
  "answer": "A detailed, well-structured answer (3-5 paragraphs)",
  "keyPoints": ["Key point 1", "Key point 2", "Key point 3", "Key point 4", "Key point 5"]
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      if (parsed.answer && parsed.keyPoints) {
        return parsed;
      }
    }

    return generateFallbackAnswer(question);
  } catch (error) {
    console.error("Gemini answer generation error:", error.message);
    return generateFallbackAnswer(question);
  }
}

// Fallback questions when Gemini is not available
function generateFallbackQuestions(role, experienceLevel, techStack) {
  const stackArray = Array.isArray(techStack) ? techStack : techStack.split(",").map(s => s.trim());
  let questions = [];

  const levelQuestions = {
    junior: ["What is", "Explain the basics of", "How do you use", "What are the main features of"],
    intermediate: ["Explain the core concepts of", "How does", "What are the best practices for", "Describe the architecture of"],
    senior: ["How would you optimize", "Explain the advanced features of", "Design a system using", "What are the trade-offs when using"]
  };

  const templates = levelQuestions[experienceLevel] || levelQuestions.intermediate;

  stackArray.forEach((tech) => {
    questions.push(`${templates[0]} ${tech}?`);
    questions.push(`${templates[1]} ${tech} and its key concepts?`);
    questions.push(`${templates[2]} ${tech} in a production environment?`);
    questions.push(`${templates[3]} ${tech}?`);
    questions.push(`What are common pitfalls when working with ${tech}?`);
  });

  // Add role-specific questions
  questions.push(`Why do you want to work as a ${role}?`);
  questions.push(`Describe a challenging project you worked on as a ${role}.`);
  questions.push(`How do you stay updated with the latest trends in ${role} development?`);
  questions.push(`Explain your debugging process when you encounter a complex bug.`);
  questions.push(`How do you handle code reviews and feedback?`);

  return questions.slice(0, 20);
}

// Fallback answer when Gemini is not available
function generateFallbackAnswer(question) {
  return {
    answer: `This is an important interview question. To answer "${question}", you should focus on demonstrating your understanding of the core concepts, share relevant experience from your projects, and explain your thought process clearly. Structure your answer using the STAR method (Situation, Task, Action, Result) if it's a behavioral question, or provide a technical explanation with examples if it's a conceptual question. Always back your answer with real-world examples from your experience.`,
    keyPoints: [
      "Understand the core concept being asked",
      "Relate it to your practical experience",
      "Provide concrete examples",
      "Explain the trade-offs or considerations",
      "Show awareness of best practices"
    ]
  };
}
