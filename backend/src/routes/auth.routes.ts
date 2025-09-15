import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";           
import { env } from "../config/env";              

const r = Router();

/** עוזר: חתימת JWT */
function signJwt(payload: object) {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "7d" });
}

/** רישום משתמש חדש */
r.post("/register", async (req, res) => {
  try {
    const { name, phone, email, password } = req.body as {
      name: string; phone: string; email?: string; password: string;
    };

    if (!name || !phone || !password) {
      return res.status(400).json({ message: "name, phone, password are required" });
    }

    const exists = await prisma.user.findUnique({ where: { phone } });
    if (exists) return res.status(409).json({ message: "Phone already registered" });

    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, phone, email, password: hash },
      select: { id: true, name: true, phone: true, email: true, role: true },
    });

    // אופציונלי: להתחבר מיד אחרי רישום
    const token = signJwt({ id: user.id, role: user.role });
    return res.status(201).json({ user, token });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Failed to register" });
  }
});

/** התחברות קיימת */
r.post("/login", async (req, res) => {
  try {
    const { phone, password } = req.body as { phone: string; password: string };

    const user = await prisma.user.findUnique({ where: { phone } });
    if (!user || !user.password) {
      return res.status(401).json("מספר הטלפון או הסיסמא שגוי");
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json("מספר הטלפון או הסיסמא שגוי");

    const token = signJwt({ id: user.id, role: user.role });
    return res.json({
      user: { id: user.id, name: user.name, phone: user.phone, email: user.email, role: user.role },
      token,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Failed to login" });
  }
});

export default r;
