import { env } from "../config/env";
import OpenAI from "openai";

const client = env.OPENAI_API_KEY ? new OpenAI({ apiKey: env.OPENAI_API_KEY }) : null;

export async function generateLesson(topic: string, prompt: string) {
  if (env.USE_MOCK_AI || !client) {
    return `Lesson about ${topic}\n\n- Intro\n- Core ideas\n- Summary\n(MOCK)`;
  }
  const content = `Create a concise lesson.\nTopic: ${topic}\nPrompt: ${prompt}\nSections: intro, core, examples, summary.`;

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content }],
  });

  return res.choices[0].message.content ?? "No content";
}
