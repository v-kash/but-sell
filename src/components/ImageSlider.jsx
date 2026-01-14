"use client";
import { useState, useEffect } from "react";

export default function ImageSlider({ images, onClose }) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((index - 1 + images.length) % images.length);
  const next = () => setIndex((index + 1) % images.length);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, onClose]);

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-4xl">
        {/* Close Button - Better positioned */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 text-3xl font-light z-10 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Main Image Container */}
        <div className="relative">
          {/* Previous Button - Floating */}
          {images.length > 1 && (
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all z-10"
              aria-label="Previous image"
            >
              <span className="text-xl font-light">‹</span>
            </button>
          )}

          {/* Main Image */}
          <div className="overflow-hidden rounded-lg shadow-2xl">
            <img
              src={images[index]}
              alt={`Slide ${index + 1}`}
              className="w-full h-auto max-h-[70vh] object-contain bg-black"
            />
          </div>

          {/* Next Button - Floating */}
          {images.length > 1 && (
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all z-10"
              aria-label="Next image"
            >
              <span className="text-xl font-light">›</span>
            </button>
          )}
        </div>

        {/* Image Counter */}
        <div className="text-white text-center mt-4 text-sm font-medium">
          {images.length > 1 && (
            <span className="bg-black/50 px-3 py-1 rounded-full">
              {index + 1} / {images.length}
            </span>
          )}
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="flex justify-center gap-2 mt-6 overflow-x-auto py-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setIndex(idx)}
                className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                  idx === index
                    ? "border-white scale-110"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
                aria-label={`Go to image ${idx + 1}`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Keyboard Hint (only on desktop) */}
        <div className="hidden md:block text-gray-400 text-center text-xs mt-4">
          Use ← → arrow keys to navigate • Esc to close
        </div>
      </div>
    </div>
  );
}
