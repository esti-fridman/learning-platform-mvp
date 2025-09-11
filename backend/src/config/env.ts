import "dotenv/config";

export const env = {
  PORT: process.env.PORT ?? "4000",
  DATABASE_URL: process.env.DATABASE_URL || "",
  JWT_SECRET: process.env.JWT_SECRET || "devsecret_change_me",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  USE_MOCK_AI: process.env.USE_MOCK_AI === "true",
};
