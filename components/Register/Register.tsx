"use client";

import {
  validateEmail,
  validatePassword,
  validateAddress,
  validatePhone,
  validateName,
} from "@/helpers/validation";
import { register } from "@/service/auth";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, FormEvent } from "react";

const RegisterForm = () => {
  const router = useRouter();

  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
    phone: "",
  });

  const [dirty, setDirty] = useState({
    email: false,
    password: false,
    name: false,
    address: false,
    phone: false,
  });

  const handleChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [evento.target.name]: evento.target.value });
  };

  const handleBlur = (evento: React.ChangeEvent<HTMLInputElement>) => {
    setDirty({ ...dirty, [evento.target.name]: true });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await register(data);
    if (res.statusCode) {
      alert(res.message);
    } else {
      alert("Registro exitoso");
      router.push("/login");
    }
  };

  useEffect(() => {
    setErrors({
      email: validateEmail(data.email),
      password: validatePassword(data.password),
      name: validateName(data.name),
      address: validateAddress(data.address),
      phone: validatePhone(data.phone),
    });
  }, [data]);

  return (
    <div className="flex items-center justify-center min-h-screen text-black bg-transparent">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 p-8 rounded-3xl border border-neutral-300 shadow-xl bg-white/70 backdrop-blur-sm"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Crear cuenta</h2>
          <p className="text-sm text-neutral-500 mt-1">
            Completá tus datos para registrarte
          </p>
        </div>

        {/* Nombre */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Nombre completo
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={data.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Juan Pérez"
            className="mt-1 w-full p-3 rounded-xl bg-neutral-100 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
          {dirty.name && errors.name && (
            <p className="text-sm text-red-600 mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={data.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="nombre@correo.com"
            className="mt-1 w-full p-3 rounded-xl bg-neutral-100 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
          {dirty.email && errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email}</p>
          )}
        </div>

        {/* Contraseña */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={data.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="********"
            className="mt-1 w-full p-3 rounded-xl bg-neutral-100 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
          {dirty.password && errors.password && (
            <p className="text-sm text-red-600 mt-1">{errors.password}</p>
          )}
        </div>

        {/* Dirección */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium">
            Dirección
          </label>
          <input
            id="address"
            name="address"
            type="text"
            value={data.address}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Calle 123, Ciudad"
            className="mt-1 w-full p-3 rounded-xl bg-neutral-100 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
          {dirty.address && errors.address && (
            <p className="text-sm text-red-600 mt-1">{errors.address}</p>
          )}
        </div>

        {/* Teléfono */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium">
            Teléfono
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={data.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="+54 9 11 1234 5678"
            className="mt-1 w-full p-3 rounded-xl bg-neutral-100 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
          {dirty.phone && errors.phone && (
            <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-black text-white hover:bg-neutral-800 transition duration-200 font-semibold"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;






// "use client";

// import {
//   validateEmail,
//   validatePassword,
//   validateAddress,
//   validatePhone,
//   validateName,
// } from "@/helpers/validation";
// import { register } from "@/service/auth";
// import { useRouter } from "next/navigation";
// import React, { useState, useEffect, FormEvent } from "react";

// const RegisterForm = () => {
//   const router = useRouter();

//   const [data, setData] = useState({
//     email: "",
//     password: "",
//     name: "",
//     address: "",
//     phone: "",
//   });

//   const [errors, setErrors] = useState({
//     email: "",
//     password: "",
//     name: "",
//     address: "",
//     phone: "",
//   });

//   const [dirty, setDirty] = useState({
//     email: false,
//     password: false,
//     name: false,
//     address: false,
//     phone: false,
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setDirty({ ...dirty, [e.target.name]: true });
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const res = await register(data);
//     if (res.statusCode) {
//       alert(res.message);
//     } else {
//       alert("Registro exitoso");
//       router.push("/login");
//     }
//   };

//   useEffect(() => {
//     setErrors({
//       email: validateEmail(data.email),
//       password: validatePassword(data.password),
//       name: validateName(data.name),
//       address: validateAddress(data.address),
//       phone: validatePhone(data.phone),
//     });
//   }, [data]);

//   return (
//   <div className="flex items-center justify-center min-h-screen text-black bg-transparent">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md space-y-6 p-8 rounded-3xl border border-neutral-300 shadow-xl bg-white"
//       >
//         <div className="text-center">
//           <h2 className="text-3xl font-bold tracking-tight">Crear cuenta</h2>
//           <p className="text-sm text-neutral-500 mt-1">
//             Completá tus datos para registrarte
//           </p>
//         </div>

//         {/* Nombre */}
//         <div>
//           <label htmlFor="name" className="block text-sm font-medium">
//             Nombre completo
//           </label>
//           <input
//             id="name"
//             name="name"
//             type="text"
//             value={data.name}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             placeholder="Juan Pérez"
//             className="mt-1 w-full p-3 rounded-xl bg-neutral-100 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-black"
//           />
//           {dirty.name && errors.name && (
//             <p className="text-sm text-red-600 mt-1">{errors.name}</p>
//           )}
//         </div>

//         {/* Email */}
//         <div>
//           <label htmlFor="email" className="block text-sm font-medium">
//             Email
//           </label>
//           <input
//             id="email"
//             name="email"
//             type="email"
//             value={data.email}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             placeholder="nombre@correo.com"
//             className="mt-1 w-full p-3 rounded-xl bg-neutral-100 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-black"
//           />
//           {dirty.email && errors.email && (
//             <p className="text-sm text-red-600 mt-1">{errors.email}</p>
//           )}
//         </div>

//         {/* Contraseña */}
//         <div>
//           <label htmlFor="password" className="block text-sm font-medium">
//             Contraseña
//           </label>
//           <input
//             id="password"
//             name="password"
//             type="password"
//             value={data.password}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             placeholder="********"
//             className="mt-1 w-full p-3 rounded-xl bg-neutral-100 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-black"
//           />
//           {dirty.password && errors.password && (
//             <p className="text-sm text-red-600 mt-1">{errors.password}</p>
//           )}
//         </div>

//         {/* Dirección */}
//         <div>
//           <label htmlFor="address" className="block text-sm font-medium">
//             Dirección
//           </label>
//           <input
//             id="address"
//             name="address"
//             type="text"
//             value={data.address}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             placeholder="Calle 123, Ciudad"
//             className="mt-1 w-full p-3 rounded-xl bg-neutral-100 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-black"
//           />
//           {dirty.address && errors.address && (
//             <p className="text-sm text-red-600 mt-1">{errors.address}</p>
//           )}
//         </div>

//         {/* Teléfono */}
//         <div>
//           <label htmlFor="phone" className="block text-sm font-medium">
//             Teléfono
//           </label>
//           <input
//             id="phone"
//             name="phone"
//             type="tel"
//             value={data.phone}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             placeholder="+54 9 11 1234 5678"
//             className="mt-1 w-full p-3 rounded-xl bg-neutral-100 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-black"
//           />
//           {dirty.phone && errors.phone && (
//             <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
//           )}
//         </div>

//         {/* Botón */}
//         <button
//           type="submit"
//           className="w-full py-3 rounded-xl bg-black text-white hover:bg-neutral-800 transition duration-200 font-semibold"
//         >
//           Registrarse
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegisterForm;

