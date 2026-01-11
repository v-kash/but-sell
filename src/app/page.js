"use client";
import { useState } from "react";
import AdCard from "@/components/AdCard";
import { dummyAds } from "@/data/dummyAds";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const [filters, setFilters] = useState({
    type: "",
    title: "",
    state: "",
    pincode: "",
  });
  const router = useRouter();
  const filteredAds = dummyAds.filter((ad) => {
    // TYPE
    if (filters.type && ad.type !== filters.type) return false;

    // TITLE (partial match)
    if (
      filters.title &&
      !ad.title.toLowerCase().includes(filters.title.trim().toLowerCase())
    ) {
      return false;
    }

    // STATE (partial + case-insensitive)
    if (
      filters.state &&
      !ad.location.state
        .toLowerCase()
        .includes(filters.state.trim().toLowerCase())
    ) {
      return false;
    }

    // PINCODE (partial match)
    if (
      filters.pincode &&
      !ad.location.pincode.includes(filters.pincode.trim())
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <div className="bg-[#7b2c2c] text-white py-12">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h1 className="text-3xl font-semibold mb-2">
            Find What You Need, Sell What You Have
          </h1>

          <p className="text-sm mb-8">
            Your local marketplace for buying, selling, renting, and services
          </p>

          {/* TOP BUTTONS */}
          <div className="flex justify-center gap-4 flex-wrap mb-6">
            <button
              onClick={() => router.push("/post-ad")}
              className="bg-gray-200 text-black px-6 py-2 rounded border"
            >
              Post Your Ad Here
            </button>

            <button className="bg-gray-200 text-black px-6 py-2 rounded border">
              Register as Employee
            </button>

            <button className="bg-gray-200 text-black px-6 py-2 rounded border">
              Register as Employer
            </button>
          </div>

          {/* SECOND ROW BUTTONS */}
          <div className="flex justify-center gap-4 flex-wrap">
            <div className="bg-[#8b3a3a] px-6 py-3 rounded text-sm w-[300px]">
              <div className="font-semibold mb-1">
                List of Buyer / Seller / Service
              </div>
              <div className="text-xs">
                (List of buyers, sellers, service providers and service
                receivers)
              </div>
            </div>

            <div className="bg-[#8b3a3a] px-6 py-3 rounded text-sm w-[300px]">
              <div className="font-semibold mb-1">List of Employer</div>
              <div className="text-xs">(List of employers / job seekers)</div>
            </div>

            <div className="bg-[#8b3a3a] px-6 py-3 rounded text-sm w-[300px]">
              <div className="font-semibold mb-1">List of Employee</div>
              <div className="text-xs">(List of employees / job seekers)</div>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH SECTION */}
      <div className="w-full">
        {/* ===============================
         SEARCH / FILTER BAR
      =============================== */}
        <div className="bg-gray-100 py-4 border-b">
          <div className="max-w-6xl mx-auto px-4 flex gap-2 flex-wrap">
            {/* Type */}
            <select
              className="border px-3 py-2 text-sm"
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="">All</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="service_provider">Service Provider</option>
              <option value="employee">Employee</option>
              <option value="employer">Employer</option>
            </select>

            {/* Title */}
            <input
              className="border px-3 py-2 text-sm"
              placeholder="Search by title"
              value={filters.title}
              onChange={(e) =>
                setFilters({ ...filters, title: e.target.value })
              }
            />

            {/* State */}
            <input
              className="border px-3 py-2 text-sm"
              placeholder="State"
              value={filters.state}
              onChange={(e) =>
                setFilters({ ...filters, state: e.target.value })
              }
            />

            {/* Pincode */}
            <input
              className="border px-3 py-2 text-sm"
              placeholder="Pincode"
              value={filters.pincode}
              onChange={(e) =>
                setFilters({ ...filters, pincode: e.target.value })
              }
            />
          </div>
        </div>

        {/* ===============================
         ADS LIST
      =============================== */}
        <div className="bg-gray-100 pb-20">
          <div className="max-w-6xl mx-auto px-4 mt-4 space-y-4">
            {filteredAds.length === 0 ? (
              <div className="bg-white border p-8 text-center text-sm text-gray-600">
                No ads found
              </div>
            ) : (
              filteredAds.map((ad) => <AdCard key={ad.id} ad={ad} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
