import { createContext, useContext, useEffect, useState } from "react";
import type {User } from "./api";
import {api} from "./api"

type AuthCtx = {
  user: User | null;
  login: (phone:string, password:string)=>Promise<void>;
  register: (name:string,phone:string,email:string|undefined,password:string)=>Promise<void>;
  logout: ()=>void;
};
const Ctx = createContext<AuthCtx>(null!);
export const useAuth = ()=> useContext(Ctx);

export function AuthProvider({children}:{children:React.ReactNode}) {
  const [user,setUser]=useState<User|null>(null);

  useEffect(()=>{
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  },[]);

  async function login(phone:string,password:string){
    const { token, user } = await api.login({ phone, password });
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }
  async function register(name:string,phone:string,email:string|undefined,password:string){
    await api.register({ name, phone, email, password });
    await login(phone, password);
  }
  function logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }
  return <Ctx.Provider value={{user,login,register,logout}}>{children}</Ctx.Provider>;
}
