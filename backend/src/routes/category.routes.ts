import { Router } from "express";
import { prisma } from "../lib/prisma";
const r = Router();

r.get("/", async (_req, res) => {
  const cats = await prisma.category.findMany({ orderBy: { name: "asc" } });
  res.json(cats);
});

export default r;
