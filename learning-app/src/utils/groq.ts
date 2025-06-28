import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

// Model constant to make future updates easier
const GROQ_MODEL = 'llama-3.3-70b-versatile';

export async function getTopics(grade: string, subject: string, level: string) {
  const prompt = `Generate a list of 5 relevant topics for Grade ${grade} ${subject} at ${level} level. Format the response as a JSON array of strings.`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: GROQ_MODEL,
    temperature: 0.7,
  });

  try {
    const content = completion.choices[0]?.message?.content || '[]';
    // Clean the content string to ensure it's valid JSON
    // Remove any backticks, newlines, or other formatting that might be present
    const cleanedContent = content.replace(/^\s*```(?:json)?\s*|\s*```\s*$/g, '').trim();
    return JSON.parse(cleanedContent);
  } catch (error) {
    console.error('Error parsing topics:', error);
    console.error('Raw content:', completion.choices[0]?.message?.content);
    return [];
  }
}

export async function generateNotes(grade: string, subject: string, level: string, topic: string) {
  const prompt = `Generate comprehensive study notes for Grade ${grade} ${subject} students at ${level} level about ${topic}. Include key concepts, examples, and explanations.`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: GROQ_MODEL,
    temperature: 0.7,
  });

  return completion.choices[0]?.message?.content || 'Unable to generate notes.';
}

export async function generateWorksheet(grade: string, subject: string, level: string, topic: string) {
  const prompt = `Create a worksheet with 5 practice questions for Grade ${grade} ${subject} students at ${level} level about ${topic}. Include a mix of question types appropriate for the level.`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: GROQ_MODEL,
    temperature: 0.7,
  });

  return completion.choices[0]?.message?.content || 'Unable to generate worksheet.';
}