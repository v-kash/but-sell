"use client";
import { useState } from "react";
import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import PasswordInput from "@/components/PasswordInput";
import GoogleButton from "@/components/GoogleButton";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
      } else {
        // ✅ JWT cookie already set by backend
        window.location.href = "/";
      }
    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <AuthCard title="Create Your Account">
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

        <PasswordInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p className="text-xs text-red-600">{error}</p>}

        <button
          onClick={handleSignup}
          disabled={loading}
          className={`w-full py-2 text-sm text-white ${
            loading ? "bg-gray-400" : "bg-[#7b2c2c]"
          }`}
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p className="text-xs text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600">
            Login
          </Link>
        </p>

        {/* OR Divider */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <div className="flex-1 h-px bg-gray-300" />
          OR
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <GoogleButton />
      </div>
    </AuthCard>
  );
}
