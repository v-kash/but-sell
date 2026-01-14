"use client";
import { useState } from "react";

export default function RegisterEmployee() {
  const [form, setForm] = useState({
    contact: "",
    name: "",
    area: "",
    address: "",
    district: "",
    state: "",
    pincode: "",
    education: "",
    workProfile: "",
    experience: "",
    resumeFiles: [],
  });

  const [uploading, setUploading] = useState(false);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  /* -------------------------
     Resume Upload Logic
  ------------------------- */
  const handleFileChange = async (e) => {
    const selected = Array.from(e.target.files);

    const existing = form.resumeFiles || [];

    // 🚫 HARD LIMIT
    if (existing.length + selected.length > 2) {
      alert("You can upload a maximum of 2 images only");
      e.target.value = ""; // reset input
      return;
    }

    const pdfFiles = selected.filter((f) => f.type === "application/pdf");
    const imageFiles = selected.filter((f) => f.type.startsWith("image/"));

    if (pdfFiles.length > 1) {
      alert("Only one PDF allowed");
      return;
    }

    if (imageFiles.length > 2) {
      alert("Maximum 2 images allowed");
      return;
    }

    if (pdfFiles.length === 1 && imageFiles.length > 0) {
      alert("Upload either PDF OR images, not both");
      return;
    }

    setUploading(true);
    const uploadedUrls = [...form.resumeFiles];

    for (const file of selected) {
      // 1️⃣ get presigned url
      const safeName = file.name.replace(/\s+/g, "_");

      const res = await fetch("/api/upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: safeName,
          fileType: file.type,
          folder: "resumes",
        }),
      });

      const { uploadUrl, fileUrl } = await res.json();

      // 2️⃣ upload to s3
      await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      uploadedUrls.push(fileUrl);
    }

    setForm((prev) => ({
      ...prev,
      resumeFiles: uploadedUrls,
    }));

    setUploading(false);
  };

  /* -------------------------
     Submit Form
  ------------------------- */
  const submitEmployee = async () => {
    if (!form.contact || !form.name || !form.workProfile) {
      alert("Please fill all required fields");
      return;
    }

    const res = await fetch("/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Registration failed");
      return;
    }

    alert("Employee registered successfully!");
  };

  return (
    <div className="w-full flex justify-center mt-10">
      <div className="bg-white w-[420px] border rounded shadow-md">
        {/* Header */}
        <div className="text-center py-4 border-b">
          <h2 className="text-lg font-semibold">Register as Employee</h2>
        </div>

        {/* Form */}
        <form className="px-5 py-4 space-y-4 text-sm">
          {/* Contact */}
          <div>
            <label className="block text-center mb-2">
              Contact Number OR Email
            </label>
            <input
              className="w-full border rounded px-3 py-2 mb-2"
              placeholder="Enter phone number OR email"
              onChange={(e) => updateField("contact", e.target.value)}
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-center mb-2">Name</label>
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Enter full name"
              onChange={(e) => updateField("name", e.target.value)}
            />
          </div>

          {/* Area / Town / Village */}
          <div>
            <label className="block text-center mb-2">
              Area / Town / Village
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Enter area / town / village"
              onChange={(e) => updateField("area", e.target.value)}
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-center mb-2">Address</label>
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Enter address"
              onChange={(e) => updateField("address", e.target.value)}
            />
          </div>

          {/* District */}
          <div>
            <label className="block text-center mb-2">District</label>
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Enter district"
              onChange={(e) => updateField("district", e.target.value)}
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-center mb-2">State</label>
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Enter state"
              onChange={(e) => updateField("state", e.target.value)}
            />
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-center mb-2">Pincode</label>
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Enter pincode"
              onChange={(e) => updateField("pincode", e.target.value)}
            />
          </div>

          {/* Education */}
          <div>
            <label className="block text-center mb-2">Education</label>
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. B.A, B.Tech, Diploma"
              onChange={(e) => updateField("education", e.target.value)}
            />
          </div>

          {/* Job title / Work profile */}
          <div>
            <label className="block text-center mb-2">
              Job Title / Work Profile
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. Accountant, Electrician"
              onChange={(e) => updateField("workProfile", e.target.value)}
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-center mb-2">
              Experience (in years)
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. 2 years"
              onChange={(e) => updateField("experience", e.target.value)}
            />
          </div>

          {/* Resume Upload */}
          <div className="text-center">
            <label className="block mb-2">Upload Resume</label>
            <input
              type="file"
              multiple
              accept=".pdf,image/*"
              onChange={handleFileChange}
              className="text-xs"
              disabled={form.resumeFiles.length >= 2}
            />
            <div className="text-xs text-gray-600 mt-1">
              Upload 1 PDF OR max 2 images
            </div>
          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={submitEmployee}
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
