"use client";
import { useState } from "react";
import ImageSlider from "./ImageSlider";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import LoginRequiredPopup from "@/components/LoginRequiredPopup";

export default function AdCard({ ad }) {
  const router = useRouter();

  const [showSlider, setShowSlider] = useState(false);
  const { loggedIn } = useAuth();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);

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

  const submitRating = async () => {
    if (!selectedRating) return;

    await fetch("/api/rate-ad", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        adId: ad.id,
        rating: selectedRating,
      }),
    });

    setShowRatingModal(false);
    window.location.reload();
  };

  const handleRate = async (value) => {
    if (!loggedIn) {
      setShowLoginPopup(true);
      return;
    }

    const res = await fetch("/api/rate-ad", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        adId: ad.id,
        rating: value,
      }),
    });

    if (res.ok) {
      window.location.reload(); // simple refresh
    }
  };

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
  const formattedDate = ad.created_at
    ? new Date(ad.created_at).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
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

            {formattedDate && (
              <span className="text-xs text-gray-500 whitespace-nowrap">
                Posted on : {formattedDate}
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

              <div
                onClick={() => {
                  if (!loggedIn) {
                    setShowLoginPopup(true);
                  } else {
                    setShowRatingModal(true);
                  }
                }}
                className="cursor-pointer flex gap-1"
              >
                {[1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      ad.rating >= i ? "text-yellow-500" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              <span className="text-xs text-gray-500">
                ({ad.rating_count || 0})
              </span>
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

      {showLoginPopup && (
        <LoginRequiredPopup
          onClose={() => setShowLoginPopup(false)}
          onLogin={() => router.push("/login")}
        />
      )}

      {showRatingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[300px] text-center">
            <h3 className="font-semibold mb-4">Rate this Ad</h3>

            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  onClick={() => setSelectedRating(i)}
                  className={`cursor-pointer text-2xl ${
                    selectedRating >= i ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setShowRatingModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={submitRating}
                className="px-4 py-2 bg-[#7b2c2c] text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
