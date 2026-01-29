"use client";
import { useState } from "react";
import ImageSlider from "./ImageSlider";

export default function AdCard({ ad }) {
  const [showSlider, setShowSlider] = useState(false);

  /* -----------------------------
     Normalize images
  ----------------------------- */
  let images = [];
  if (Array.isArray(ad.images)) images = ad.images;
  else if (typeof ad.images === "string") {
    try {
      images = JSON.parse(ad.images);
    } catch {
      images = [];
    }
  }

  /* ⭐ STAR RENDERER */
  const renderStars = (rating = 0) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => {
        if (rating >= i)
          return (
            <span key={i} className="text-yellow-500 text-sm">
              ★
            </span>
          );
        if (rating >= i - 0.5)
          return (
            <span key={i} className="relative text-sm">
              <span className="absolute left-0 w-1/2 overflow-hidden text-yellow-500">
                ★
              </span>
              <span className="text-gray-300">★</span>
            </span>
          );
        return (
          <span key={i} className="text-gray-300 text-sm">
            ★
          </span>
        );
      })}
    </div>
  );

  /* ⏱ POSTED DAYS AGO */
  const postedDaysAgo = ad.created_at
    ? Math.floor((Date.now() - new Date(ad.created_at)) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <>
      {/* CARD */}
      <div className="relative border bg-white rounded-lg shadow-sm hover:shadow-md transition pt-7 sm:pt-4 p-4 flex flex-col sm:flex-row gap-4 text-sm">
        {/* IMAGE */}

        {ad.is_recommended && (
          <div className="absolute top-0 right-0 z-10">
            <div
              className="
      bg-[#7b2c2c] text-white
      text-[10px] sm:text-xs
      font-semibold
      px-4 py-1.5
      rounded-bl-xl
      rounded-tr-lg
      shadow-md
    "
            >
              RECOMMENDED
            </div>
          </div>
        )}

        <div
          className="w-full sm:w-[160px] h-[180px] sm:h-[120px] rounded overflow-hidden bg-gray-100 cursor-pointer flex-shrink-0 mx-auto sm:mx-0"
          onClick={() => images.length && setShowSlider(true)}
        >
          {images.length ? (
            <img
              src={images[0]}
              alt={ad.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-base sm:text-lg text-gray-900">
              {ad.title}
            </h3>

            {postedDaysAgo !== null && (
              <span className="text-xs text-gray-500 whitespace-nowrap">
                {postedDaysAgo === 0 ? "Today" : `${postedDaysAgo} days ago`}
              </span>
            )}
          </div>

          {ad.short_description && (
            <p className="text-gray-700 text-sm line-clamp-2 sm:line-clamp-3">
              {ad.short_description}
            </p>
          )}

          <div className="text-xs text-gray-700 space-y-1">
            <div>
              <span className="font-semibold">Location:</span>{" "}
              {[ad.address, ad.area, ad.taluka, ad.district, ad.state]
                .filter(Boolean)
                .join(", ")}
              {ad.pincode ? ` – ${ad.pincode}` : ""}
            </div>

            {ad.budget && (
              <div>
                <span className="font-semibold">Budget:</span>{" "}
                <span className="text-green-700">{ad.budget}</span>
              </div>
            )}

            {ad.contact && (
              <div>
                <span className="font-semibold">Contact:</span>{" "}
                <span className="text-blue-700 break-all">{ad.contact}</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <span className="font-semibold">Rating:</span>
              {ad.rating ? (
                renderStars(ad.rating)
              ) : (
                <span className="text-gray-500">Not rated</span>
              )}
            </div>
          </div>
        </div>

        {/* DETAILS (MOBILE) */}
        <div className="block md:hidden text-xs text-gray-700 mt-2">
          <div className="font-semibold text-gray-900 mb-1">Details</div>
          {ad.detailed_description ? (
            <p className="leading-relaxed line-clamp-4">
              {ad.detailed_description}
            </p>
          ) : (
            <span className="text-gray-400">No additional details</span>
          )}
        </div>

        {/* DETAILS (DESKTOP ONLY) */}
        <div className="hidden md:block w-[420px] text-xs text-gray-700 border-l pl-4">
          <div className="font-semibold text-gray-900 mb-1">Details</div>
          {ad.detailed_description ? (
            <p className="leading-relaxed line-clamp-6">
              {ad.detailed_description}
            </p>
          ) : (
            <span className="text-gray-400">No additional details</span>
          )}
        </div>
      </div>

      {/* IMAGE SLIDER */}
      {showSlider && (
        <ImageSlider
          images={images}
          onClose={() => setShowSlider(false)}
          currentIndex={0}
        />
      )}
    </>
  );
}
