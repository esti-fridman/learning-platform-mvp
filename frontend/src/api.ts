const BASE = import.meta.env.VITE_API_BASE_URL;

function headers(auth?: boolean) {
  const h = new Headers({ "Content-Type": "application/json" });
  if (auth) {
    const token = localStorage.getItem("token");
    if (token) h.set("Authorization", `Bearer ${token}`);
  }
  return h;
}
async function req<T>(path: string, init?: RequestInit & { auth?: boolean }) {
  const res = await fetch(`${BASE}${path}`, { ...init, headers: headers(init?.auth) });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<T>;
}

export type Category = { id: number; name: string };
export type Subcategory = { id: number; name: string; categoryId: number };
export type Prompt = { id: number; prompt: string; response: string; createdAt: string };
export type User = { id: number; name: string };

export const api = {
  // auth
  register: (b:{name:string;phone:string;email?:string;password:string}) =>
    req<User>("/auth/register",{ method:"POST", body: JSON.stringify(b) }),
  login: (b:{phone:string;password:string}) =>
    req<{token:string; user:User}>("/auth/login",{ method:"POST", body: JSON.stringify(b) }),

  // learning
  categories: () => req<Category[]>("/categories"),
  subcategories: (categoryId:number) => req<Subcategory[]>(`/subcategories?categoryId=${categoryId}`),
  createPrompt: (b:{userId:number;categoryId:number;subcategoryId:number;prompt:string}) =>
    req<Prompt>("/prompts",{ method:"POST", body: JSON.stringify(b), auth:true }),
  myHistory: (userId:number, page=1, pageSize=10) =>
    req<{items:Prompt[]; total:number}>(`/prompts?userId=${userId}&page=${page}&pageSize=${pageSize}`,{ auth:true }),

  // admin
  users: (page=1, q="") => req<{items:User[]; total:number}>(`/admin/users?page=${page}&q=${encodeURIComponent(q)}`,{ auth:true }),
  userPrompts: (userId:number, page=1) =>
    req<{items:Prompt[]; total:number}>(`/admin/users/${userId}/prompts?page=${page}`,{ auth:true }),
};
