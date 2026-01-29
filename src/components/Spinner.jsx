"use client";

export default function Spinner({ size = 32 }) {
  return (
    <div className="flex justify-center items-center py-10">
      <div
        className="animate-spin rounded-full border-4 border-gray-300 border-t-[#7b2c2c]"
        style={{ width: size, height: size }}
      />
    </div>
  );
}
