"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthProtected = ({children}: {children: React.ReactNode}) =>{

    const router = useRouter();
    const context = useAuth()
    const user = context.user?.user;

    useEffect(() =>{
       if(!user){
           router.push("/login")
       }
       },[]);
 
   return <>{ children }</>
}

export default AuthProtected

