"use client";
import { useState } from "react";

export default function PostAdModal({ onClose }) {
  const [form, setForm] = useState({});

  return (
    <div className="w-full flex justify-center mt-10">
  <div className="bg-white w-[420px] rounded-lg shadow-md border">

        {/* Header */}
        <div className="relative text-center py-4 border-b">
          <h2 className="text-lg font-semibold">Post Your Ad</h2>
          <button onClick={onClose} className="absolute right-4 top-3 text-xl">
            ×
          </button>
        </div>

        {/* Form */}
        <form
          className="px-5 py-4 space-y-4 text-sm overflow-y-auto"
          style={{ maxHeight: "calc(90vh - 60px)" }}
        >
          {/* Contact */}
          <div>
            <label className="block text-center mb-2">
              Contact Email OR Phone Number
            </label>
            <input
              className="w-full border rounded px-3 py-2 mb-2"
              placeholder="Enter email"
            />
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Enter phone number"
            />
          </div>

          {/* I am */}
          <div>
            <label className="block text-center mb-2">I am</label>
            <select className="w-full border rounded px-3 py-2">
              <option>Buyer</option>
              <option>Seller</option>
              <option>Service Provider</option>
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block text-center mb-2">
              Name OR Businessname
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Enter your name"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-center mb-2">Address</label>
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Enter address"
            />
          </div>

          {/* District */}
          <div>
            <label className="block text-center mb-2">District</label>
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Enter district"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-center mb-2">State</label>
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Enter state"
            />
          </div>

          {/* All India */}
          <div className="text-center">
            <label className="block mb-1">All India</label>
            <input type="checkbox" />
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-center mb-2">Pincode</label>
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Enter pincode"
            />
          </div>

          {/* Budget */}
          <div>
            <label className="block text-center mb-2">
              Estimated Cost / Budget (Optional)
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Enter estimated budget"
            />
          </div>

          {/* Short desc */}
          <div>
            <label className="block text-center mb-2">
              Description (Max 50 words)
            </label>
            <textarea
              className="w-full border rounded px-3 py-2"
              placeholder="Brief description (max 50 words)"
              rows={2}
            />
          </div>

          {/* Long desc */}
          <div>
            <label className="block text-center mb-2">
              Detailed Description / Notes (Max 500 words)
            </label>
            <textarea
              className="w-full border rounded px-3 py-2"
              placeholder="Write detailed description or notes (max 500 words)"
              rows={4}
            />
          </div>

          {/* Upload */}
          <div className="text-center">
            <input type="file" className="text-xs" />
            <div className="text-xs mt-1">Upload Images</div>
          </div>

          {/* Validity */}
          <div>
            <label className="block text-center mb-2">
              Validity of this post will be
            </label>
            <input
              className="w-full border rounded px-3 py-2 text-center"
              defaultValue="3"
            />
          </div>

          {/* Submit */}
          <button
            type="button"
            className="w-full bg-[#7b2c2c] text-white py-2 rounded mt-2"
          >
            Post Ad
          </button>
        </form>
      </div>
    </div>
  );
}
