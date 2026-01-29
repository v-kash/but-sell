// app/layout.js
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
import "./globals.css";
import Link from "next/link";

export const metadata = { title: "BuySellRS" };

export default function RootLayout({ children }) {
  return (
    // <html lang="en">
    //   <body className="pt-20">
    //     <header className="fixed top-0 left-0 right-0 bg-[#7b2c2c] text-white px-6 py-4 flex justify-between items-center z-50 w-full shadow-md">
    //       <h2 className="text-xl font-semibold">BuySellRS</h2>

    //       <div className="flex gap-3 text-sm">
    //         <Link
    //           href="/login"
    //           className="bg-white text-black px-4 py-1.5 rounded"
    //         >
    //           Login
    //         </Link>
    //         <Link
    //           href="/signup"
    //           className="border border-white px-4 py-1.5 rounded"
    //         >
    //           Sign Up
    //         </Link>
    //       </div>
    //     </header>

    //     {children}
    //   </body>
    // </html>

    <html lang="en">
      <body className="pt-20">
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
