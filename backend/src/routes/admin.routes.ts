import { Router } from "express";
import { prisma } from "../lib/prisma";
// import { authGuard } from "../middlewares/authGuard"; // בפועל צריך בדיקת תפקיד

const r = Router();

r.get("/users", async (_req, res) => {
  const users = await prisma.user.findMany({ orderBy: { id: "asc" } });
  res.json(users);
});

r.get("/prompts", async (_req, res) => {
  const prompts = await prisma.prompt.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true, subcategory: true, user: true },
  });
  res.json(prompts);
});

export default r;
