import { useEffect, useMemo, useState } from "react";
import type { Category, Subcategory, Prompt } from "../api";
import { api } from "../api";
import { useAuth } from "../auth";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


export default function Dashboard() {
    const { user, logout } = useAuth();
    const [cats, setCats] = useState<Category[]>([]);
    const [subs, setSubs] = useState<Subcategory[]>([]);
    const [cat, setCat] = useState<number | "">("");
    const [sub, setSub] = useState<number | "">("");
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [res, setRes] = useState<Prompt | null>(null);
    const [err, setErr] = useState("");

    useEffect(() => {
        api.categories().then(setCats).catch((e) => setErr(String(e)));
    }, []);

    useEffect(() => {
        if (cat === "") {
            setSubs([]);
            setSub("");
            return;
        }
        api.subcategories(Number(cat)).then(setSubs).catch((e) => setErr(String(e)));
    }, [cat]);

    const canSend = useMemo(
        () => cat !== "" && sub !== "" && text.trim().length > 0 && !loading,
        [cat, sub, text, loading]
    );

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        setErr("");
        setRes(null);
        setLoading(true);
        try {
            const p = await api.createPrompt({
                userId: user!.id,
                categoryId: Number(cat),
                subcategoryId: Number(sub),
                prompt: text,
            });
            setRes(p);
        } catch (e: any) {
            setErr(e?.message || "שגיאה בשליחה");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
            {/* עליון */}
            <header className="bg-white/90 backdrop-blur sticky top-0 z-10 border-b">
                <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                        שלום, <span className="font-semibold text-gray-800">{user?.name}</span>
                    </div>
                    <nav className="flex items-center gap-3 text-sm">
                        <Link className="text-indigo-700 hover:underline" to="/history">
                            היסטוריה שלי
                        </Link>
                        <Link className="text-indigo-700 hover:underline" to="/admin">
                            אדמין
                        </Link>
                        <button
                            onClick={logout}
                            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 hover:bg-gray-50"
                        >
                            יציאה
                        </button>
                    </nav>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-4 py-6">
                <h1 className="text-2xl font-bold text-indigo-800 mb-4">יצירת שיעור</h1>

                {err && (
                    <div className="mb-4 rounded-lg bg-rose-50 text-rose-700 px-4 py-2 text-sm">
                        {err}
                    </div>
                )}

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* טופס */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                        <form onSubmit={submit} className="p-5 grid gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">קטגוריה</label>
                                <select
                                    value={cat}
                                    onChange={(e) => setCat(e.target.value ? Number(e.target.value) : "")}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                                >
                                    <option value="" >בחר</option>
                                    {cats.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">תת־קטגוריה</label>
                                <select
                                    value={sub}
                                    onChange={(e) => setSub(e.target.value ? Number(e.target.value) : "")}
                                    disabled={cat === ""}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                                >
                                    <option value="">בחר</option>
                                    {subs.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Prompt</label>
                                <textarea
                                    rows={1}
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="?Let's create a lesson. What's your question"
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault(); // מונע ירידת שורה
                                            if (canSend) {
                                                submit(e); // מפעיל את הפונקציה שלך
                                            }
                                        }
                                    }}
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    disabled={!canSend}
                                    className="rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-4 py-2.5 font-medium transition"
                                >
                                    {loading ? "יוצר שיעור..." : "צור שיעור"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setText("");
                                        setRes(null);
                                    }}
                                    className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 hover:bg-gray-50"
                                >
                                    איפוס
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* תוצאות */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">תשובת ה־AI</h2>

                        {!res ? (
                            <div className="text-sm text-gray-500">
                                עדיין אין תוצאה. מלאי את הטופס מימין ולחצי “צור שיעור”.
                            </div>
                        ) : (
                            <article

                                dir="rtl"
                                className="prose prose-slate max-w-none
                                           prose-headings:text-gray-800
                                           prose-li:marker:text-gray-400
                                           prose-pre:bg-gray-100 prose-pre:p-3 prose-pre:rounded-lg"
                            >
                                <button
                                    onClick={() => navigator.clipboard.writeText(res?.response ?? "")}
                                    className="ml-auto mb-3 rounded border px-3 py-1.5 text-xs hover:bg-gray-50"
                                >
                                    העתק תשובה
                                </button>

                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {res.response}
                                </ReactMarkdown>
                            </article>
                        )}

                    </div>

                </div>
            </main>
        </div>
    );
}
