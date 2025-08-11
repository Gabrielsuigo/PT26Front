"use client";

import { login } from "@/service/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { FormEvent, useEffect, useState } from "react";
import { validateEmail, validatePassword } from "@/helpers/validation";

const Login = () => {
  const { setUser } = useAuth();
  const router = useRouter();

  const [Data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [dirty, setDirty] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(Data);
      if (res.statusCode) {
        alert(res.message);
      } else {
        alert("Login exitoso");
        setUser(res);
        localStorage.setItem("user", JSON.stringify(res));
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Ocurrió un error inesperado");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDirty({ ...dirty, [e.target.name]: true });
  };

  useEffect(() => {
    const currentErrors = {
      email: validateEmail(Data.email),
      password: validatePassword(Data.password),
    };
    setErrors(currentErrors);
  }, [Data]);

  return (
    <div className="flex items-center justify-center min-h-screen text-black bg-transparent">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 p-8 rounded-3xl border border-neutral-300 shadow-xl bg-white/70 backdrop-blur-sm"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Iniciá sesión</h2>
          <p className="text-sm text-neutral-500 mt-1">
            Accedé a tu cuenta para continuar
          </p>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={Data.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="nombre@correo.com"
            className="mt-1 w-full p-3 rounded-xl bg-neutral-100 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
          {dirty.email && errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email}</p>
          )}
        </div>

          <div>
  <label htmlFor="password" className="block text-sm font-medium">
    Contraseña
  </label>
  <div className="relative mt-1">
    <input
      id="password"
      name="password"
      type={showPassword ? "text" : "password"}
      autoComplete="current-password"
      value={Data.password}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder="********"
      className="w-full p-3 rounded-xl bg-neutral-100 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-black pr-10"
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black select-none"
      aria-label="Mostrar u ocultar contraseña"
    >
      {/* Ojo simple, sin cambio */}
      <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
        />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth={2} />
      </svg>
    </button>
  </div>
  {dirty.password && errors.password && (
    <p className="text-sm text-red-600 mt-1">{errors.password}</p>
  )}
</div>

        <button
          type="submit"
          className={`w-full py-3 rounded-xl text-white font-semibold transition duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:bg-neutral-800"
          }`}
          disabled={loading}
        >
          {loading ? "Cargando..." : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
};

export default Login;

// "use client";

// import { login } from "@/service/auth";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/contexts/AuthContext";
// import { FormEvent, useEffect, useState } from "react";
// import { validateEmail, validatePassword } from "@/helpers/validation";

// const Login = () => {
//   const { setUser } = useAuth();
//   const router = useRouter();

//   const [Data, setData] = useState({ email: "", password: "" });
//   const [errors, setErrors] = useState({ email: "", password: "" });
//   const [dirty, setDirty] = useState({ email: false, password: false });
//   const [loading, setLoading] = useState (false);
  
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
//   setLoading(true); // ⬅️ Activás el loading
//   try {
//     const res = await login(Data);
//     if (res.statusCode) {
//       alert(res.message);
//     } else {
//       alert("Login exitoso");
//       setUser(res);
//       localStorage.setItem("user", JSON.stringify(res));
//       router.push("/dashboard");
//     }
//   } catch (error) {
//     console.error("Error al iniciar sesión:", error);
//     alert("Ocurrió un error inesperado");
//   } finally {
//     setLoading(false); // ⬅️ Lo desactivás siempre al final
//   }
// };


//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setData({ ...Data, [e.target.name]: e.target.value });
//   };

//   const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setDirty({ ...dirty, [e.target.name]: true });
//   };

//   useEffect(() => {
//     const currentErrors = {
//       email: validateEmail(Data.email),
//       password: validatePassword(Data.password),
//     };
//     setErrors(currentErrors);
//   }, [Data]);

//   return (
//     <div className="flex items-center justify-center min-h-screen text-black bg-transparent">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md space-y-6 p-8 rounded-3xl border border-neutral-300 shadow-xl bg-white/70 backdrop-blur-sm"
//       >
//         <div className="text-center">
//           <h2 className="text-3xl font-bold tracking-tight">Iniciá sesión</h2>
//           <p className="text-sm text-neutral-500 mt-1">
//             Accedé a tu cuenta para continuar
//           </p>
//         </div>

//         <div>
//           <label htmlFor="email" className="block text-sm font-medium">
//             Email
//           </label>
//           <input
//             id="email"
//             name="email"
//             type="email"
//             autoComplete="email"
//             value={Data.email}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             placeholder="nombre@correo.com"
//             className="mt-1 w-full p-3 rounded-xl bg-neutral-100 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-black"
//           />
//           {dirty.email && errors.email && (
//             <p className="text-sm text-red-600 mt-1">{errors.email}</p>
//           )}
//         </div>

//         <div>
//           <label htmlFor="password" className="block text-sm font-medium">
//             Contraseña
//           </label>
//           <input
//             id="password"
//             name="password"
//             type={"password"}
//             autoComplete="current-password"
//             value={Data.password}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             placeholder="********"
//             className="mt-1 w-full p-3 rounded-xl bg-neutral-100 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-black"
//           />
//           {dirty.password && errors.password && (
//             <p className="text-sm text-red-600 mt-1">{errors.password}</p>
//           )}
//         </div>

//         <button
//   type="submit"
//   className={`w-full py-3 rounded-xl text-white font-semibold transition duration-200 ${
//     loading
//       ? "bg-gray-400 cursor-not-allowed"
//       : "bg-black hover:bg-neutral-800"
//   }`}
//   disabled={loading}
// >
//   {loading ? "Cargando..." : "Iniciar sesión"}
// </button>

    
//       </form>
//     </div>
//   );
// };

// export default Login;
