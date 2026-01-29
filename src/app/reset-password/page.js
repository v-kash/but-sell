"use client";
import { useState } from "react";
import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import PasswordInput from "@/components/PasswordInput";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
  setError("");
  setMessage("");
  setLoading(true);

  try {
    const res = await fetch("/api/auth/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        newPassword,
        confirmPassword,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
    } else {
      setMessage("Password reset successfully. You can now login.");
    }
  } catch (err) {
    setError("Network error");
  }

  // ✅ ALWAYS turn loading off
  setLoading(false);
};


  return (
    <AuthCard title="Reset Password">
      <div className="space-y-4">
        <input
          className="border w-full px-3 py-2 text-sm"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordInput
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <PasswordInput
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <p className="text-xs text-red-600">{error}</p>}
        {message && <p className="text-xs text-green-600">{message}</p>}

        <button
          onClick={handleReset}
          disabled={loading}
          className={`w-full py-2 text-sm text-white ${
            loading ? "bg-gray-400" : "bg-[#7b2c2c]"
          }`}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        <p className="text-xs text-center">
          <Link href="/login" className="text-blue-600">
            Back to Login
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}
