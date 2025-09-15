import { useState } from "react";
import { useAuth } from "../auth";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();
  const { login } = useAuth();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    try {
      await login(phone, password);
      nav("/");
    } catch (e: any) {
      setErr(e.message || "שגיאת התחברות");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 pt-6 text-center">
            <h1 className="text-2xl font-bold text-indigo-700">כניסה למערכת</h1>
            <p className="text-sm text-gray-500 mt-1">ללמידה מונחית AI</p>
          </div>

          <form onSubmit={submit} className="p-6 space-y-4">
            {err && (
              <div className="rounded-lg bg-rose-50 text-rose-700 px-3 py-2 text-sm">
                {err}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">טלפון</label>
              <input
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="מספר טלפון"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">סיסמה</label>
              <input
                type="password"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 font-medium transition">
              התחברות
            </button>

            <p className="text-center text-sm text-gray-600">
              אין לך חשבון?{" "}
              <Link to="/register" className="text-indigo-600 hover:underline">
                הרשמה
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
