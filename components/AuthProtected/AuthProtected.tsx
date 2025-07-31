
"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthProtected = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user } = useAuth(); // destructuramos directamente

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]); // ✅ dependencias agregadas

  // Si querés evitar parpadeos, podés agregar esto:
  if (!user) return null;

  return <>{children}</>;
};

export default AuthProtected;


// "use client";
// import { useAuth } from "@/contexts/AuthContext";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// const AuthProtected = ({children}: {children: React.ReactNode}) =>{

//     const router = useRouter();
//     const context = useAuth()
//     const user = context.user?.user;

//     useEffect(() =>{
//        if(!user){
//            router.push("/login")
//        }
//        },[]);
 
//    return <>{ children }</>
// }

// export default AuthProtected

