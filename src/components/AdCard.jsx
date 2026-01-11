"use client";
import { useState } from "react";
import ImageSlider from "./ImageSlider";

export default function AdCard({ ad }) {
  const [showSlider, setShowSlider] = useState(false);

  return (
    <>
      <div className="border bg-white p-4 flex gap-4 text-sm">
        {/* Image */}
        <div
          className="w-[120px] h-[90px] border cursor-pointer flex-shrink-0"
          onClick={() => setShowSlider(true)}
        >
          <img
            src={ad.images[0]}
            alt="ad"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex-1 space-y-1">
          {/* Title */}
          <div className="font-bold text-base text-black">{ad.title}</div>

          {/* Description */}
          <div className="text-gray-700">{ad.description}</div>

          {/* Key-Value info */}
          <div className="text-xs text-gray-600 space-y-[2px] mt-2">
            <div>
              <span className="font-semibold">Location:</span>{" "}
              <span>
                {ad.location.city}, {ad.location.state} – {ad.location.pincode}
              </span>
            </div>

            {ad.budget && (
              <div>
                <span className="font-semibold">Budget:</span>{" "}
                <span>{ad.budget}</span>
              </div>
            )}

            <div>
              <span className="font-semibold">Contact:</span>{" "}
              <span className="text-blue-700">{ad.contact}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Slider ONLY after click */}
      {showSlider && (
        <ImageSlider images={ad.images} onClose={() => setShowSlider(false)} />
      )}
    </>
  );
}
