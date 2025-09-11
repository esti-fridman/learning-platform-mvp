import { Router } from "express";
import { prisma } from "../lib/prisma";
const r = Router();

r.get("/", async (req, res) => {
  const categoryId = Number(req.query.categoryId);
  const where = isNaN(categoryId) ? {} : { categoryId };
  const subs = await prisma.subcategory.findMany({ where, orderBy: { name: "asc" } });
  res.json(subs);
});

export default r;
