import { useEffect, useState } from "react";
import type {  User,Prompt } from "../api";
import  { api } from "../api";
import { Link } from "react-router-dom";

export default function Admin(){
  const [q,setQ]=useState(""); const [page,setPage]=useState(1);
  const [users,setUsers]=useState<{items:User[]; total:number}>({items:[], total:0});
  const [selected,setSelected]=useState<User|null>(null);
  const [prompts,setPrompts]=useState<{items:Prompt[]; total:number}>({items:[], total:0});

  useEffect(()=>{ api.users(page,q).then(setUsers); },[page,q]);
  useEffect(()=>{ if(!selected) return; api.userPrompts(selected.id,1).then(setPrompts); },[selected]);

  return (
    <main style={{maxWidth:1000,margin:"2rem auto",padding:"1rem",display:"grid",gridTemplateColumns:"1fr 2fr",gap:16}}>
      <div>
        <header style={{display:"flex",justifyContent:"space-between"}}><h2>Users</h2> <Link to="/">Back</Link></header>
        <input placeholder="Search" value={q} onChange={e=>{setPage(1);setQ(e.target.value);}} />
        <ul>
          {users.items.map(u=>(
            <li key={u.id} style={{cursor:"pointer"}} onClick={()=>setSelected(u)}>
              {u.name} (#{u.id})
            </li>
          ))}
        </ul>
        <div style={{display:"flex",gap:8}}>
          <button disabled={page<=1} onClick={()=>setPage(p=>p-1)}>Prev</button>
          <span>Page {page}</span>
          <button disabled={(page*10)>=users.total} onClick={()=>setPage(p=>p+1)}>Next</button>
        </div>
      </div>

      <div>
        <h2>Prompt history {selected ? `for ${selected.name}` : ""}</h2>
        {!selected && <p>Select a user…</p>}
        {selected && prompts.items.map(p=>(
          <details key={p.id} style={{marginBottom:10}}>
            <summary>{new Date(p.createdAt).toLocaleString()} – {p.prompt}</summary>
            <pre style={{whiteSpace:"pre-wrap",background:"#f6f8fa",padding:8}}>{p.response}</pre>
          </details>
        ))}
      </div>
    </main>
  );
}
