import { useEffect, useState } from "react";
import type { Prompt } from "../api";
import { api } from "../api";
import { useAuth } from "../auth";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function History() {
    const { user } = useAuth();
    const [page, setPage] = useState(1);
    const [data, setData] = useState<{ items: Prompt[]; total: number }>({
        items: [],
        total: 0,
    });

    useEffect(() => {
        api.myHistory(user!.id, page).then(setData);
    }, [page, user]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
            <main className="mx-auto max-w-5xl px-4 py-6">
                {/* Header */}
                <header className="flex items-center justify-between mb-6">
                    <Link
                        to="/"
                        className="text-sm text-indigo-700 hover:underline font-medium"
                    >
                        ← חזרה
                    </Link>
                    <h1 className="text-xl font-bold text-gray-800">היסטוריית למידה</h1>
                </header>

                {/* List */}
                <div className="space-y-4">
                    {data.items.map((p) => (
                        <details
                            key={p.id}
                            className="group rounded-xl border border-gray-200 bg-white shadow-sm"
                        >
                            <summary className="cursor-pointer list-none px-4 py-3 flex justify-between items-center hover:bg-gray-50">
                                <div className="text-sm">
                                    <b className="text-gray-800">
                                        {new Date(p.createdAt).toLocaleString()}
                                    </b>
                                    <span className="text-gray-600"> – {p.prompt}</span>
                                </div>
                                <span className="text-xs text-indigo-600 group-open:rotate-90 transition">
                                    ▶
                                </span>
                            </summary>
                            <div className="px-4 pb-4">
                                <article
                                    dir="rtl"
                                    className="prose prose-slate max-w-none
                                                           prose-headings:text-gray-800
                                                           prose-li:marker:text-gray-400
                                                           prose-pre:bg-gray-100 prose-pre:p-3 prose-pre:rounded-lg"
                                >
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {p.response}
                                    </ReactMarkdown>
                                </article>
                            </div>
                        </details>
                    ))}

                    {data.items.length === 0 && (
                        <p className="text-sm text-gray-500 text-center py-6">
                            אין עדיין היסטוריה להצגה.
                        </p>
                    )}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-4 mt-6">
                    <button
                        disabled={page <= 1}
                        onClick={() => setPage((p) => p - 1)}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50 disabled:opacity-50"
                    >
                        הקודם
                    </button>
                    <span className="text-sm text-gray-700">עמוד {page}</span>
                    <button
                        disabled={data.items.length === 0 || page * 10 >= data.total}
                        onClick={() => setPage((p) => p + 1)}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50 disabled:opacity-50"
                    >
                        הבא
                    </button>
                </div>
            </main>
        </div>
    );
}
