"use client";

import { useRouter } from "next/navigation";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const router = useRouter();

  const handleContactClick = () => {
    router.push("/contact");
  };

  return (
    <footer className="bg-black dark:bg-black text-neutral-100 dark:text-neutral-100 border-t border-neutral-800 py-10">
      <div className="container mx-auto text-center space-y-4">
        <div className="flex justify-center gap-6 text-2xl">
          <a
            href="https://www.instagram.com/store_arg"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram className="hover:text-pink-500 transition" />
          </a>
          <a
            href="https://wa.me/5491125033874"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <FaWhatsapp className="hover:text-green-500 transition" />
          </a>
        </div>

        <button
          onClick={handleContactClick}
          className="px-5 py-2 border border-neutral-600 rounded-full text-sm font-medium text-neutral-300 hover:bg-neutral-800 transition"
        >
          Contactanos
        </button>

        <p className="text-sm text-neutral-500 mt-4">© 2025 STORE. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;

// "use client";

// import { useRouter } from "next/navigation";

// const Footer = () => {
//   const router = useRouter();

//   const handleContactClick = () => {
//     router.push("/contact");
//   };

//   return (
//     <footer className="bg-black dark:bg-black text-neutral-900 dark:text-neutral-100 dark:border-neutral-700 py-10">
//       <div className="container mx-auto text-center">
//         <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">FOOTER</p>
//         <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
//           © 2025 STORE. All rights reserved.
          
//       <div className="mt-6 space-y-2 text-sm">
//   <p>Email: contacto@mitienda.com</p>
//   <p>WhatsApp: +54 11 1234-5678</p>
//   <div className="flex justify-center gap-4 mt-2 text-neutral-500 dark:text-neutral-400">
//     <a
//       href="https://www.instagram.com/mitienda"
//       target="_blank"
//       rel="noopener noreferrer"
//       className="hover:text-pink-500 transition"
//     >
//       Instagram
//     </a>
//     <a
//       href="https://www.facebook.com/mitienda"
//       target="_blank"
//       rel="noopener noreferrer"
//       className="hover:text-blue-500 transition"
//     >
//       Facebook
//     </a>
//   </div>
// </div>
//         </p>
//         <div className="mt-6">
//           <button
//             onClick={handleContactClick}
//             className="px-5 py-2 border border-neutral-600 dark:border-neutral-600 rounded-full text-sm font-medium text-neutral-500 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
//           >
//             Contactanos
//           </button>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;