import { Router } from "express";
import { prisma } from "../lib/prisma";
import { CreatePromptSchema } from "../schemas/prompt.schema";
import { generateLesson } from "../lib/ai";
import { authGuard } from "../middlewares/authGuard";

const r = Router();

// יצירת שיעור
r.post("/",authGuard, async (req, res, next) => {
  try {
    const parsed = CreatePromptSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error.flatten());
    const { userId, categoryId, subcategoryId, prompt } = parsed.data;

    const category = await prisma.category.findUnique({ where: { id: categoryId } });
    const subcat = await prisma.subcategory.findUnique({ where: { id: subcategoryId } });
    if (!category || !subcat || subcat.categoryId !== category.id) {
      return res.status(400).json({ message: "Invalid category/subcategory" });
    }

    const topic = `${category.name} / ${subcat.name}`;
    const response = await generateLesson(topic, prompt);

    const saved = await prisma.prompt.create({
      data: { userId, categoryId, subcategoryId, prompt, response },
    });
    res.status(201).json(saved);
  } catch (e) { next(e); }
});

// היסטוריה (עם עימוד בסיסי)
r.get("/", authGuard, async (req, res, next) => {
  try {
    const page = Number(req.query.page ?? "1");
    const pageSize = Number(req.query.pageSize ?? "10");
    const skip = (page - 1) * pageSize;

    const where = req.query.userId ? { userId: Number(req.query.userId) } : {};
    const [items, total] = await Promise.all([
      prisma.prompt.findMany({
        where, orderBy: { createdAt: "desc" }, skip, take: pageSize,
        include: { category: true, subcategory: true },
      }),
      prisma.prompt.count({ where }),
    ]);
    res.json({ items, total, page, pageSize });
  } catch (e) { next(e); }
});

export default r;
