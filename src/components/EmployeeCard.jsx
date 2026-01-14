"use client";
import { useState } from "react";
import ImageSlider from "./ImageSlider";

export default function EmployeeCard({ employee }) {
  const [showSlider, setShowSlider] = useState(false);

  /* normalize resume files */
  let files = [];
  const resumeData = employee.resume_files ?? employee.resume;

  if (Array.isArray(resumeData)) {
    files = resumeData;
  } else if (typeof resumeData === "string") {
    try {
      files = JSON.parse(resumeData);
    } catch {
      files = [];
    }
  }

  const isPdf =
    files.length === 1 &&
    typeof files[0] === "string" &&
    files[0].toLowerCase().endsWith(".pdf");

  //   const downloadImage = async (url) => {
  //   try {
  //     const safeUrl = encodeURI(url); // 🔑 IMPORTANT

  //     const res = await fetch(safeUrl);
  //     if (!res.ok) throw new Error("Fetch failed");

  //     const blob = await res.blob();

  //     const blobUrl = window.URL.createObjectURL(blob);
  //     const link = document.createElement("a");

  //     link.href = blobUrl;
  //     link.download = safeUrl.split("/").pop();
  //     document.body.appendChild(link);
  //     link.click();

  //     document.body.removeChild(link);
  //     window.URL.revokeObjectURL(blobUrl);
  //   } catch (err) {
  //     alert("Failed to download image");
  //     console.error(err);
  //   }
  // };

  const downloadFile = async (url) => {
  try {
    const safeUrl = encodeURI(url); // handles spaces, special chars

    const res = await fetch(safeUrl);
    if (!res.ok) {
      throw new Error("Failed to fetch file");
    }

    const blob = await res.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = safeUrl.split("/").pop(); // file name
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    window.URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error("Download failed:", err);
    alert("Failed to download file");
  }
};


  const downloadAllImages = async (urls) => {
    for (const url of urls) {
      try {
        const safeUrl = encodeURI(url);
        const res = await fetch(safeUrl);
        if (!res.ok) continue;

        const blob = await res.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = safeUrl.split("/").pop();
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobUrl);

        // small delay so browser allows multiple downloads
        await new Promise((r) => setTimeout(r, 300));
      } catch (err) {
        console.error("Failed to download", url, err);
      }
    }
  };

  return (
    <>
      <div className="border bg-white p-4 text-sm rounded shadow-sm hover:shadow transition">
        {/* HEADER */}
        <div className="border-b pb-2 mb-2">
          <div className="font-semibold text-base text-gray-900">
            {employee.name}
          </div>
          <div className="text-sm text-gray-700">{employee.work_profile}</div>
        </div>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-gray-700">
          <div>
            <span className="font-semibold">Location:</span> {employee.district}
            , {employee.state} – {employee.pincode}
          </div>

          <div>
            <span className="font-semibold">Education:</span>{" "}
            {employee.education}
          </div>

          <div>
            <span className="font-semibold">Experience:</span>{" "}
            {employee.experience} years
          </div>

          <div>
            <span className="font-semibold">Contact:</span>{" "}
            <span className="text-blue-700">{employee.contact}</span>
          </div>
        </div>

        {/* RESUME SECTION */}
        {files.length > 0 && (
          <div className="mt-3 pt-2 border-t text-xs">
            <div className="font-semibold text-gray-800 mb-1">
              Resume / Work Proof
            </div>

            {/* PDF */}
            {isPdf && (
              <button
                onClick={() => downloadFile(files[0])}
                className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
              >
                Download Resume (PDF)
              </button>
            )}

            {/* IMAGES */}
            {!isPdf && (
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setShowSlider(true)}
                  className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
                >
                  View Images
                </button>

                <button
                  onClick={() => downloadAllImages(files)}
                  className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
                >
                  Download Images
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* IMAGE SLIDER */}
      {showSlider && !isPdf && (
        <ImageSlider
          images={files}
          onClose={() => setShowSlider(false)}
          currentIndex={0}
        />
      )}
    </>
  );
}
