"use client";
import { useState } from "react";

export default function PostAdModal({ onClose }) {
  const [form, setForm] = useState({
    type: "buyer",
    contact: "",
    name: "",
    address: "",
    district: "",
    state: "",
    pincode: "",
    allIndia: false,
    budget: "",
    shortDescription: "",
    detailedDescription: "",
    images: [],
    validityDays: 3,
  });

  const [uploading, setUploading] = useState(false);

  /* -----------------------------
     Helpers
  ----------------------------- */
  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  /* -----------------------------
     Image Upload (MAX 2)
  ----------------------------- */
  const handleImageUpload = async (files) => {
    if (!files || files.length === 0) return;

    const remainingSlots = 2 - form.images.length;

    if (remainingSlots <= 0) {
      alert("You can upload maximum 2 images only.");
      return;
    }

    const selectedFiles = Array.from(files).slice(0, remainingSlots);

    setUploading(true);

    for (const file of selectedFiles) {
      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed");
        continue;
      }

      // 1️⃣ Get presigned URL
      const safeName = file.name.replace(/\s+/g, "_");

      const res = await fetch("/api/upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: safeName,
          fileType: file.type,
          folder: "ads",
        }),
      });

      const { uploadUrl, fileUrl } = await res.json();

      // 2️⃣ Upload to S3
      await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      // 3️⃣ Save URL in form
      setForm((prev) => ({
        ...prev,
        images: [...prev.images, fileUrl],
      }));
    }

    setUploading(false);
  };

  /* -----------------------------
     Submit Ad
  ----------------------------- */
  const submitAd = async () => {
    if (!form.contact || !form.address || !form.state || !form.pincode) {
      alert("Please fill all required fields");
      return;
    }

    const res = await fetch("/api/ads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Failed to post ad");
      return;
    }

    alert("Ad posted successfully!");
    onClose();
  };

  return (
    <div className="w-full flex justify-center mt-10">
      <div className="bg-white w-[420px] rounded-lg shadow-md border">

        {/* Header */}
        <div className="relative text-center py-4 border-b">
          <h2 className="text-lg font-semibold">Post Your Ad</h2>
          <button
            onClick={onClose}
            className="absolute right-4 top-3 text-xl"
          >
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
              className="w-full border rounded px-3 py-2"
              placeholder="Enter email or phone"
              onChange={(e) => updateField("contact", e.target.value)}
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-center mb-2">I am</label>
            <select
              className="w-full border rounded px-3 py-2"
              onChange={(e) =>
                updateField("type", e.target.value)
              }
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="service_provider">Service Provider</option>
              <option value="service_reciever">Service Reciever</option>
              <option value="renter">Renter</option>
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block text-center mb-2">
              Name OR Business Name
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              onChange={(e) => updateField("name", e.target.value)}
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-center mb-2">Address</label>
            <input
              className="w-full border rounded px-3 py-2"
              onChange={(e) => updateField("address", e.target.value)}
            />
          </div>

          {/* District */}
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="District"
            onChange={(e) => updateField("district", e.target.value)}
          />

          {/* State */}
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="State"
            onChange={(e) => updateField("state", e.target.value)}
          />

          {/* All India */}
          <div className="text-center">
            <label className="block mb-1">All India</label>
            <input
              type="checkbox"
              onChange={(e) =>
                updateField("allIndia", e.target.checked)
              }
            />
          </div>

          {/* Pincode */}
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Pincode"
            onChange={(e) => updateField("pincode", e.target.value)}
          />

          {/* Budget */}
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Estimated Budget (Optional)"
            onChange={(e) => updateField("budget", e.target.value)}
          />

          {/* Short Description */}
          <textarea
            className="w-full border rounded px-3 py-2"
            placeholder="Short description (max 50 words)"
            rows={2}
            onChange={(e) =>
              updateField("shortDescription", e.target.value)
            }
          />

          {/* Detailed Description */}
          <textarea
            className="w-full border rounded px-3 py-2"
            placeholder="Detailed description (max 500 words)"
            rows={4}
            onChange={(e) =>
              updateField("detailedDescription", e.target.value)
            }
          />

          {/* Image Upload */}
          <div className="text-center">
            <input
              type="file"
              accept="image/*"
              multiple
              disabled={uploading || form.images.length >= 2}
              onChange={(e) => handleImageUpload(e.target.files)}
              className="text-xs"
            />
            <div className="text-xs mt-1">
              {form.images.length}/2 images uploaded
            </div>
          </div>

          {/* Validity */}
          <input
            className="w-full border rounded px-3 py-2 text-center"
            value={form.validityDays}
            onChange={(e) =>
              updateField("validityDays", Number(e.target.value))
            }
          />

          {/* Submit */}
          <button
            type="button"
            onClick={submitAd}
            disabled={uploading}
            className="w-full bg-[#7b2c2c] text-white py-2 rounded mt-2"
          >
            {uploading ? "Uploading..." : "Post Ad"}
          </button>
        </form>
      </div>
    </div>
  );
}
