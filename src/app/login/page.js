"use client";
import { useState } from "react";
import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import PasswordInput from "@/components/PasswordInput";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // ✅

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid credentials");
      } else {
        // ✅ ADMIN vs USER redirect
        if (data.isAdmin) {
          window.location.href = "/admin/ads";
        } else {
          window.location.href = "/";
        }
      }
    } catch {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <AuthCard title="Login to BuySellRS">
      <div className="space-y-4">
        <input
          className="border w-full px-3 py-2 text-sm"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordInput
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-xs text-red-600">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-2 text-sm text-white ${
            loading ? "bg-gray-400" : "bg-[#7b2c2c]"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="flex justify-between text-xs">
          <Link href="/reset-password" className="text-blue-600">
            Forgot password?
          </Link>
          <Link href="/signup" className="text-blue-600">
            Create account
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}
