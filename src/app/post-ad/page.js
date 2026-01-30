"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PostAdModal({ onClose }) {
  const router = useRouter();
  const [form, setForm] = useState({
    type: "buyer",
    contact: "",
    name: "",
    address: "",
    area: "",
    taluka: "",
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
    // if (!form.contact || !form.address || !form.state || !form.pincode) {
    //   alert("Please fill all required fields");
    //   return;
    // }

    const res = await fetch("/api/ads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Failed to post ad");
      return;
    }

    alert("Ad posted successfully! Redirecting to home...");

    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  return (
    <div className="w-full flex justify-center mt-10">
      <div className="bg-white w-[420px] rounded-lg shadow-md border">
        {/* Header */}
        <div className="relative text-center py-4 border-b">
          <h2 className="text-lg font-semibold">Post Your Ad</h2>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitAd();
          }}
          className="px-5 py-4 space-y-4 text-sm overflow-y-auto"
          style={{ maxHeight: "calc(90vh - 60px)" }}
        >
          {/* Contact */}
          <div>
            <label className="flex justify-center items-center gap-1  ">
              <span>Contact Email OR Phone Number</span>
              <span className="text-red-500 text-xl mt-1">*</span>
            </label>
            <input
              required
              className="w-full border rounded px-3 py-2"
              placeholder="Enter email or phone"
              onChange={(e) => updateField("contact", e.target.value)}
            />
          </div>

          {/* Type */}
          <div>
            <label className="flex justify-center items-center gap-1  ">
              <span>I am</span>
              <span className="text-red-500 text-xl mt-1">*</span>
            </label>
            <select
              required
              className="w-full border rounded px-3 py-2"
              onChange={(e) => updateField("type", e.target.value)}
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="renter">Renter</option>
              <option value="service_provider">Service Provider</option>
              <option value="service_reciever">Service Reciever</option>
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block text-center mb-2">
              Name OR Business Name
            </label>
            <input
              className="w-full border rounded px-3 py-2 uppercase"
              placeholder="enter name or business name"
              onChange={(e) => updateField("name", e.target.value)}
            />
          </div>

          {/* Address */}
          <div>
            <label className="flex justify-center items-center gap-1  ">
              <span>Address</span>
              <span className="text-red-500 text-xl mt-1">*</span>
            </label>
            <input
              required
              placeholder="Enter address "
              className="w-full border rounded px-3 py-2"
              onChange={(e) => updateField("address", e.target.value)}
            />
          </div>

          <input
            required
            className="w-full border rounded px-3 py-2"
            placeholder="Area"
            onChange={(e) => updateField("area", e.target.value)}
          />

          <input
            required
            className="w-full border rounded px-3 py-2"
            placeholder="Taluka/Tehsil"
            onChange={(e) => updateField("taluka", e.target.value)}
          />

          {/* District */}
          <input
            required
            className="w-full border rounded px-3 py-2"
            placeholder="District"
            onChange={(e) => updateField("district", e.target.value)}
          />

          {/* State */}
          <input
            required
            className="w-full border rounded px-3 py-2"
            placeholder="State"
            onChange={(e) => updateField("state", e.target.value)}
          />

          {/* Pincode */}
          <input
            required
            className="w-full border rounded px-3 py-2"
            placeholder="Pincode"
            onChange={(e) => updateField("pincode", e.target.value)}
          />

          {/* All India */}
          <div className="text-center">
            <label className="block mb-1">All India</label>
            <input
              type="checkbox"
              onChange={(e) => updateField("allIndia", e.target.checked)}
            />
          </div>

          {/* Budget */}
          <div>
            <label className="flex justify-center items-center gap-1  ">
              <span>Budget</span>
              <span className="text-white text-xl mt-1">*</span>
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Estimated Budget (Optional)"
              onChange={(e) => updateField("budget", e.target.value)}
            />
          </div>

          {/* Short Description */}
          {/* <textarea
            className="w-full border rounded px-3 py-2"
            placeholder="Short description (max 50 words)"
            rows={2}
            onChange={(e) => updateField("shortDescription", e.target.value)}
          /> */}

          {/* Detailed Description */}
          <div>
            <label className="flex justify-center items-center gap-1  ">
              <span>Description / Requirement</span>
              <span className="text-red-500 text-xl mt-1">*</span>
            </label>
            <textarea
              required
              className="w-full border rounded px-3 py-2"
              placeholder="Description / Requirement (max 500 words)"
              rows={4}
              onChange={(e) =>
                updateField("detailedDescription", e.target.value)
              }
            />
          </div>

          {/* Image Upload */}
          <div className="text-center">
            <label className="block mb-2 font-medium text-gray-700">
              Upload Images
              <span className="text-gray-400 text-xs ml-1">(max 2)</span>
            </label>

            <label className="relative cursor-pointer">
              <input
                type="file"
                accept="image/*"
                multiple
                disabled={uploading || form.images.length >= 2}
                onChange={(e) => handleImageUpload(e.target.files)}
                className="hidden"
              />

              <div
                className={`
        inline-flex items-center justify-center px-4 py-3
        border-2 border-dashed rounded-lg transition-all w-full
        ${
          uploading || form.images.length >= 2
            ? "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
            : "border-gray-400 bg-gray-50 hover:bg-gray-100 hover:border-gray-500 text-gray-700"
        }
      `}
              >
                <svg
                  className={`w-5 h-5 mr-2 ${uploading ? "animate-pulse" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>

                <span className="text-sm font-medium">
                  {uploading
                    ? "Uploading..."
                    : form.images.length >= 2
                      ? "Max images uploaded ✓"
                      : "Choose Images"}
                </span>
              </div>
            </label>

            <div className="text-xs text-gray-600 mt-2">
              {form.images.length}/2 images uploaded
            </div>
          </div>

          {/* Validity */}
          <div>
            <label className="flex justify-center items-center gap-1  ">
              <span>Validity of the post (in days)</span>
              <span className="text-white text-xl mt-1">*</span>
            </label>
            <input
              className="w-full border rounded px-3 py-2 text-center"
              value={form.validityDays}
              onChange={(e) =>
                updateField("validityDays", Number(e.target.value))
              }
            />
          </div>

          <p className="text-xs text-gray-500 text-center">
            Fields marked with <span className="text-red-500">*</span> are
            required
          </p>

          {/* Submit */}
          <button
            type="submit"
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
