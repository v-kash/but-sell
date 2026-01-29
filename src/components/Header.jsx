"use client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { loggedIn, user, setLoggedIn, setUser, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });

    setUser(null); // 🔥 clear user
    setLoggedIn(false); // 🔥 update UI instantly

    router.replace("/");
  };

  if (loading) return null;

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#7b2c2c] text-white px-6 py-4 flex justify-between items-center z-50 shadow-md">
      <h2
        className="text-xl font-semibold cursor-pointer"
        onClick={() => router.push("/")}
      >
        BuySellRS
      </h2>

      {loggedIn ? (
        <div className="flex items-center gap-3 text-sm">
          {pathname === "/my-posts" ? (
            <button
              onClick={() => router.push("/")}
              className="px-4 py-1.5 rounded border border-white"
            >
              Home
            </button>
          ) : (
            <button
              onClick={() => router.push("/my-posts")}
              className="px-4 py-1.5 rounded border border-white"
            >
              My Posts
            </button>
          )}

          {/* 👑 ADMIN BUTTON (ADD THIS HERE) */}
          {user?.isAdmin && (
            <button
              onClick={() => router.push("/admin/ads")}
              className="px-4 py-1.5 rounded border border-white"
            >
              Admin
            </button>
          )}

          <button
            onClick={handleLogout}
            className="px-4 py-1.5 rounded bg-white text-black"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-3 text-sm">
          <Link
            href="/login"
            className="bg-white text-black px-4 py-1.5 rounded"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="border border-white px-4 py-1.5 rounded"
          >
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
}
