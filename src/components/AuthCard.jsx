
"use client";

export default function AuthCard({ title, children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white border rounded w-full max-w-md p-6">
        <h1 className="text-xl font-semibold text-center mb-6">{title}</h1>
        {children}
      </div>
    </div>
  );
}
