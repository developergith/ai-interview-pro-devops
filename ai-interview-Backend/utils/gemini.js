export async function generateInterviewQuestions(role, experienceLevel, techStack) {

  let stackArray;

  if (Array.isArray(techStack)) {
    stackArray = techStack;
  } else {
    stackArray = techStack.split(",").map(s => s.trim());
  }

  let questions = [];

  stackArray.forEach((tech) => {

    questions.push(`What is ${tech}?`);
    questions.push(`Explain core concepts of ${tech}.`);
    questions.push(`What are advantages of ${tech}?`);
    questions.push(`What are limitations of ${tech}?`);
    questions.push(`Where is ${tech} used?`);
    questions.push(`Explain architecture of ${tech}.`);
    questions.push(`How to optimize performance in ${tech}?`);
    questions.push(`Explain security in ${tech}.`);
    questions.push(`Real-world use case of ${tech}?`);
    questions.push(`Advanced features of ${tech}?`);

  });

  while (questions.length < 50) {
    questions = [...questions, ...questions];
  }

  return questions.slice(0, 50);
}
