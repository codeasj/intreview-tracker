import "dotenv/config";
import { getOpenAIClient } from "../config/openai.js";
import { getGeminiClient } from "../config/gemini.js";

const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";
const AI_PROVIDER = process.env.AI_PROVIDER || "gemini";

const callOpenAI = async (prompt, temperature = 0.7) => {
  const openai = getOpenAIClient();
  const response = await openai.chat.completions.create({
    model: OPENAI_MODEL,
    messages: [{ role: "user", content: prompt }],
    temperature,
  });
  return response.choices[0].message.content;
};

const callGemini = async (prompt, temperature = 0.7) => {
  const gemini = getGeminiClient();
  const response = await gemini.models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt,
    config: { temperature },
  });
  return response.text;
};

export const callAI = async (prompt, temperature = 0.7) => {
  if (AI_PROVIDER === "openai") {
    return await callOpenAI(prompt, temperature);
  }
  return await callGemini(prompt, temperature);
};
