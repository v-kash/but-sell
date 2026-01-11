"use client";
import { useState } from "react";

export default function ImageSlider({ images, onClose }) {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((index - 1 + images.length) % images.length);

  const next = () =>
    setIndex((index + 1) % images.length);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-white p-4 rounded relative w-[90%] max-w-lg">

        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl"
        >
          ×
        </button>

        <img
          src={images[index]}
          className="w-full h-[350px] object-contain border"
        />

        {images.length > 1 && (
          <div className="flex justify-between mt-3">
            <button
              onClick={prev}
              className="px-4 py-1 border text-sm"
            >
              ◀ Prev
            </button>
            <button
              onClick={next}
              className="px-4 py-1 border text-sm"
            >
              Next ▶
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
