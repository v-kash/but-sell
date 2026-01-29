"use client";

export default function LoginRequiredPopup({ onClose, onLogin }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-[320px] text-center">
        <h3 className="font-semibold mb-2">Login Required</h3>
        <p className="text-sm mb-4">
          You need to login to post ads or register.
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={onLogin}
            className="bg-[#7b2c2c] text-white px-4 py-2 text-sm rounded"
          >
            Login
          </button>
          <button
            onClick={onClose}
            className="border px-4 py-2 text-sm rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
