
# Learning Platform MVP

## 📌 תיאור כללי
פלטפורמת למידה מינימלית שמאפשרת למשתמשים לבחור קטגוריות ותתי־קטגוריות וליצור שיעורים בעזרת AI.  
הפרויקט בנוי משני חלקים: **Backend** ו־**Frontend**, ומנוהל באמצעות Docker Compose.

---

## 🛠 טכנולוגיות עיקריות
- **Backend**: Node.js, Express, TypeScript, Prisma, PostgreSQL  
- **Frontend**: React, Vite, TypeScript, React Query, React Hook Form, Bootstrap/Tailwind  
- **Containerization**: Docker, Docker Compose  
- **Authentication**: JWT  
- **Database ORM**: Prisma  

---

## ⚙️ התקנה והרצה

### דרישות מקדימות
- Node.js (v18+)  
- Docker + Docker Compose  

### הוראות התקנה
1. **שכפול הריפו**:
   ```bash
   git clone https://github.com/esti-fridman/learning-platform-mvp.git
   cd learning-platform-mvp
   ```

2. **התקנת תלויות לכל צד**:
   - Backend:
     ```bash
     cd backend && npm install
     ```
   - Frontend:
     ```bash
     cd ../frontend && npm install
     ```

### הרצה עם Docker Compose
הפלטפורמה מנוהלת באמצעות Docker Compose, כך שכל מה שצריך זה להפעיל את הפקודה:
```bash
docker compose up --build
```

### הרצה ידנית
- **Backend**:
   ```bash
   cd backend
   npm run dev
   ```

- **Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

---

## 📂 מבנה הפרויקט
```
learning-platform-mvp/
│
├── backend/        # צד שרת - Express + Prisma + DB
├── frontend/       # צד לקוח - React + Vite
├── docker-compose.yml
├── README.md
└── .gitignore
```

---

## 🚀 פיצ'רים
- רישום והתחברות משתמשים (JWT Authentication)
- בחירת קטגוריות ותתי קטגוריות
- יצירת שיעורים באמצעות AI
- שמירה והצגת היסטוריית שיעורים

---

## 📖 הוראות נוספות
- ניהול הסכמה של DB: 
 ```bash
`npx prisma migrate dev`
```
- צפייה ב־Prisma Studio:
 ```bash
 `npx prisma studio`
 ```
