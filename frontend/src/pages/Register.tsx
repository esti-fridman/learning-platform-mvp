import { useState } from "react";
import { useAuth } from "../auth";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();
  const { register } = useAuth();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    try {
      await register(name, phone, email || undefined, password);
      nav("/");
    } catch (e: any) {
      setErr(e.message || "הרשמה נכשלה – ייתכן שמספר הטלפון כבר קיים");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 pt-6 text-center">
            <h1 className="text-2xl font-bold text-teal-700">הרשמה</h1>
            <p className="text-sm text-gray-500 mt-1">צור/י חשבון חדש</p>
          </div>

          <form onSubmit={submit} className="p-6 space-y-4">
            {err && (
              <div className="rounded-lg bg-rose-50 text-rose-700 px-3 py-2 text-sm">
                {err}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">שם מלא</label>
              <input
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="לדוגמה: אסתי פרידמן"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">טלפון</label>
              <input
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="05..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">אימייל (לא חובה)</label>
              <input
                type="email"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">סיסמה</label>
              <input
                type="password"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="לפחות 6 תווים"
              />
            </div>

            <button className="w-full rounded-lg bg-teal-600 hover:bg-teal-700 text-white py-2.5 font-medium transition">
              יצירת חשבון
            </button>

            <p className="text-center text-sm text-gray-600">
              כבר יש לך חשבון?{" "}
              <Link to="/login" className="text-teal-600 hover:underline">
                התחברות
              </Link>
            </p>
          </form>
        </div>

        <p className="text-center text-xs text-white/90 mt-4">
          © Learning Platform • Mini MVP
        </p>
      </div>
    </div>
  );
}
