"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterEmployer() {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    contact: "",
    companyName: "",
    address: "",
    area: "",
    taluka: "",
    district: "",
    state: "",
    pincode: "",
    jobTitle: "",
    jobDetails: "",
  });

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  /* -------------------------
     Image Upload (1 image)
  ------------------------- */
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed");
      return;
    }

    setUploading(true);
    setImage(file);

    // 1️⃣ Get presigned URL

    const safeName = file.name.replace(/\s+/g, "_");

    const res = await fetch("/api/upload-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileName: safeName,
        fileType: file.type,
        folder: "companies",
      }),
    });

    const { uploadUrl, fileUrl } = await res.json();

    // 2️⃣ Upload to S3
    await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });

    setImageUrl(fileUrl);
    setUploading(false);
  };

  /* -------------------------
     Submit Employer
  ------------------------- */
  const submitEmployer = async () => {
    const res = await fetch("/api/employers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        companyImage: imageUrl,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Registration failed");
      return;
    }

    alert("Employer registered successfully! Redirecting to home...");

    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  return (
    <div className="w-full flex justify-center mt-10">
      <div className="bg-white w-[420px] border rounded shadow-md">
        {/* Header */}
        <div className="text-center py-4 border-b">
          <h2 className="text-lg font-semibold">Register as Employer</h2>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitEmployer();
          }}
          className="px-5 py-4 space-y-4 text-sm"
        >
          {/* Contact */}
          <div>
            <label className="flex justify-center items-center gap-1  ">
              <span>Contact Email OR Phone Number</span>
              <span className="text-red-500 text-xl mt-1">*</span>
            </label>
            <input
              required
              className="w-full border rounded px-3 py-2 mb-2"
              placeholder="Enter mobile number OR email"
              onChange={(e) => updateField("contact", e.target.value)}
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-center mb-2">Company Name</label>
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Enter company name"
              onChange={(e) => updateField("companyName", e.target.value)}
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

          {/* Job Title */}

          {/* Job Details */}
          <div>
            <label className="flex justify-center items-center gap-1  ">
              <span>Description / Requirement</span>
              <span className="text-red-500 text-xl mt-1">*</span>
            </label>
            <textarea
              required
              className="w-full border rounded px-3 py-2"
              rows={4}
              placeholder="Description / Requirement"
              onChange={(e) => updateField("jobDetails", e.target.value)}
            />
          </div>

          {/* Company Image */}
          {/* <div className="text-center">
            <label className="block mb-2">Upload Company Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={uploading}
              className="text-xs"
            />
            <div className="text-xs text-gray-600 mt-1">
              Upload 1 image only
            </div>
          </div> */}

          <div className="text-center">
            <label className="block mb-2 font-medium text-gray-700">
              Upload Company Photo
            </label>

            <label className="relative cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={uploading || imageUrl}
                className="hidden"
              />
              <div
                className={`
      inline-flex items-center justify-center px-4 py-3 
      border-2 border-dashed rounded-lg transition-all w-full
      ${
        uploading || imageUrl
          ? "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
          : "border-gray-400 bg-gray-50 hover:bg-gray-100 hover:border-gray-500 text-gray-700 cursor-pointer"
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
                    : imageUrl
                      ? "Photo Uploaded ✓"
                      : "Choose Photo"}
                </span>
              </div>
            </label>

            <div className="text-xs text-gray-600 mt-2">
              {uploading
                ? "Uploading..."
                : imageUrl
                  ? "1 photo uploaded"
                  : "Upload 1 image only"}
            </div>
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
            {uploading ? "Uploading..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
