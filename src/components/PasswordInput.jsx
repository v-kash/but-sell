"use client";
import { useState } from "react";

export default function PasswordInput({
  value,
  onChange,
  placeholder = "Password",
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        className="border w-full px-3 py-2 text-sm pr-12"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-600"
      >
        {show ? "Hide" : "Show"}
      </button>
    </div>
  );
}
