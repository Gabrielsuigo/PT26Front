// "use client";
// import { createContext, useState, useEffect } from "react";

// export const ThemeContext = createContext({
//   theme: "light",
//   toggleTheme: () => {},
// });

// export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
//   const [theme, setTheme] = useState("light");

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme) setTheme(savedTheme);
//   }, []);

//   useEffect(() => {
//     document.documentElement.classList.remove("light", "dark");
//     document.documentElement.classList.add(theme);
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const toggleTheme = () =>
//     setTheme((prev) => (prev === "light" ? "dark" : "light"));

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };
// import { createContext, useEffect, useState, ReactNode } from "react";

// type Theme = "light" | "dark";

// interface ThemeContextProps {
//   theme: Theme;
//   toggleTheme: () => void;
// }

// export const ThemeContext = createContext<ThemeContextProps>({
//   theme: "light",
//   toggleTheme: () => {},
// });

// export const ThemeProvider = ({ children }: { children: ReactNode }) => {
//   const [theme, setTheme] = useState<Theme>("light");

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme") as Theme;
//     if (savedTheme) {
//       setTheme(savedTheme);
//       document.documentElement.classList.add(savedTheme);
//     }
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = theme === "light" ? "dark" : "light";
//     document.documentElement.classList.remove(theme);
//     document.documentElement.classList.add(newTheme);
//     localStorage.setItem("theme", newTheme);
//     setTheme(newTheme);
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };