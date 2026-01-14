"use client";
import { useState } from "react";

export default function SearchPopup({ mode, onClose, onSearch }) {
  const [type, setType] = useState("buyer");
  const [pincode, setPincode] = useState("");
  const [district, setDistrict] = useState("");

  const handleSearch = () => {
    if (!pincode && !district) {
      alert("Please enter pincode or district");
      return;
    }

    onSearch({
      mode,
      type,
      pincode,
      district,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[320px] border rounded shadow-lg p-4 text-sm">
        <div className="font-semibold text-center mb-3">
          Search {mode === "ads" ? "Buyer / Seller / Service" : mode}
        </div>

        {/* Type dropdown ONLY for ads */}
        {mode === "ads" && (
          <select
            className="w-full border px-3 py-2 mb-3"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
            <option value="service_provider">Service Provider</option>
            <option value="service_receiver">Service Receiver</option>
            <option value="renter">Renter</option>
          </select>
        )}

        <input
          className="w-full border px-3 py-2 mb-2"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />

        <input
          className="w-full border px-3 py-2 mb-4"
          placeholder="District"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        />

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="border px-4 py-1"
          >
            Cancel
          </button>

          <button
            onClick={handleSearch}
            className="bg-[#7b2c2c] text-white px-4 py-1"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
