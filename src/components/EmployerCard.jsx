"use client";
import { useState } from "react";
import ImageSlider from "./ImageSlider";

export default function EmployerCard({ employer }) {
  const [showViewer, setShowViewer] = useState(false);

  // normalize image (future-safe)
  const images = employer.company_image ? [employer.company_image] : [];

  return (
  <>
    <div className="border bg-white p-4 text-sm rounded shadow-sm hover:shadow transition flex gap-4">

      {/* COLUMN 1: COMPANY IMAGE */}
      <div
        className="w-[140px] h-[110px] border bg-gray-100 flex-shrink-0 cursor-pointer overflow-hidden rounded"
        onClick={() => images.length && setShowViewer(true)}
      >
        {images.length ? (
          <img
            src={images[0]}
            alt="company"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* COLUMN 2: BASIC INFO */}
      <div className="flex-1 flex flex-col border-r pr-4">
        {/* HEADER */}
        <div className="mb-3">
          <div className="font-bold text-lg text-gray-900">
            {employer.company_name}
          </div>
          <div className="font-medium text-gray-800">
            {employer.job_title}
          </div>
        </div>

        {/* META INFO */}
        <div className="text-xs text-gray-700 space-y-2">
          <div className="flex items-start">
            <span className="font-semibold min-w-[60px]">📍 Location:</span>
            <span className="text-gray-800">
              {employer.district}, {employer.state} – {employer.pincode}
            </span>
          </div>

          <div className="flex items-start">
            <span className="font-semibold min-w-[60px]">📞 Contact:</span>
            <span className="text-blue-700 font-medium">
              {employer.contact}
            </span>
          </div>
        </div>
      </div>

      {/* COLUMN 3: JOB DETAILS */}
      {employer.job_details && (
        <div className="flex-1 max-w-[45%]">
          <div className="text-sm">
            <div className="font-bold text-gray-900 mb-2 text-base border-b pb-1">
              Job Details
            </div>
            <div className="text-gray-700 leading-relaxed max-h-[80px] overflow-y-auto pr-2">
              {employer.job_details}
            </div>
          </div>
        </div>
      )}
    </div>

    {/* IMAGE VIEWER */}
    {showViewer && (
      <ImageSlider
        images={images}
        currentIndex={0}
        onClose={() => setShowViewer(false)}
      />
    )}
  </>
);
}
