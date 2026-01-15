"use client";
import { useState } from "react";
import { useEffect } from "react";

import AdCard from "@/components/AdCard";

import EmployeeCard from "@/components/EmployeeCard";
import EmployerCard from "@/components/EmployerCard";
import SearchPopup from "@/components/SearchPopup";

import { useRouter } from "next/navigation";

function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export default function HomePage() {
  const [filters, setFilters] = useState({
    type: "",
    title: "",
    state: "",
    pincode: "",
  });
  const router = useRouter();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searched, setSearched] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    // Clear old results when type changes
    setResults([]);
  }, [filters.type]);

  const handleSearch = async (reset = true) => {
    const hasAnySearch =
      filters.pincode.trim() || filters.state.trim() || filters.title.trim();

    if (!filters.type || !hasAnySearch) {
      setResults([]);
      setSearched(true);
      return;
    }

    setLoading(true);

    const params = new URLSearchParams({
      entity:
        filters.type === "buyer" ||
        filters.type === "seller" ||
        filters.type === "service_provider" ||
        filters.type === "service_reciever"
          ? "ads"
          : filters.type,
    });

    if (filters.pincode) params.append("pincode", filters.pincode);
    if (filters.state) params.append("district", filters.state);
    if (filters.title) params.append("q", filters.title);

    // only ads have type
    if (
      ["buyer", "seller", "service_provider", "service_reciever"].includes(
        filters.type
      )
    ) {
      params.append("type", filters.type);
    }

    params.append("page", reset ? 1 : page + 1);

    const res = await fetch(`/api/search?${params.toString()}`);
    const data = await res.json();

    if (res.ok) {
      setResults((prev) => (reset ? data.data : [...prev, ...data.data]));
      setPage(reset ? 1 : page + 1);
    }

    setSearched(true);
    setLoading(false);
  };

  // const handlePopupSearch = ({ mode, type, pincode, district }) => {
  //   setFilters({
  //     type: mode === "ads" ? type : mode,
  //     pincode,
  //     state: district,
  //     title: "",
  //   });

  //   handleSearch(true);
  // };

  const fetchSuggestions = async (value) => {
    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    const res = await fetch(`/api/suggestions?q=${value}`);
    const data = await res.json();
    setSuggestions(data);
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

  const [popup, setPopup] = useState({
    open: false,
    mode: "", // ads | employee | employer
  });

  const handlePopupSearch = async ({ mode, type, pincode, district }) => {
    setLoading(true);
    setSearched(true);

    setFilters((prev) => ({
      ...prev,
      type: mode === "ads" ? type : mode,
    }));

    const params = new URLSearchParams();

    // ENTITY + TYPE MAPPING
    if (mode === "ads") {
      params.append("entity", "ads");
      params.append("type", type); // buyer / seller / renter / service_*
    }

    if (mode === "employees") {
      params.append("entity", "employees");
    }

    if (mode === "employers") {
      params.append("entity", "employers");
    }

    // STRICT LOCATION
    if (pincode) {
      params.append("pincode", pincode);
    } else {
      params.append("district", district);
    }

    const res = await fetch(`/api/search?${params.toString()}`);
    const data = await res.json();

    if (res.ok) {
      setResults(data.data);
    } else {
      setResults([]);
    }

    setLoading(false);
  };

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

            <button
              onClick={() => router.push("/register-employee")}
              className="bg-gray-200 text-black px-6 py-2 rounded border"
            >
              Register as Employee
            </button>

            <button
              onClick={() => router.push("/register-employer")}
              className="bg-gray-200 text-black px-6 py-2 rounded border"
            >
              Register as Employer
            </button>
          </div>

          {/* SECOND ROW BUTTONS */}
          <div className="flex justify-center gap-4 flex-wrap">
            <div
              className="bg-[#8b3a3a] px-6 py-3 rounded text-sm w-[300px] cursor-pointer"
              onClick={() => setPopup({ open: true, mode: "ads" })}
            >
              <div className="font-semibold mb-1">
                List of Buyer / Seller / Service
              </div>
              <div className="text-xs">
                (List of buyers, sellers, service providers and service
                receivers)
              </div>
            </div>

            <div
              className="bg-[#8b3a3a] px-6 py-3 rounded text-sm w-[300px] cursor-pointer"
              onClick={() => setPopup({ open: true, mode: "employers" })}
            >
              <div className="font-semibold mb-1">List of Employer</div>
              <div className="text-xs">(List of employers / job seekers)</div>
            </div>

            <div
              className="bg-[#8b3a3a] px-6 py-3 rounded text-sm w-[300px] cursor-pointer"
              onClick={() => setPopup({ open: true, mode: "employees" })}
            >
              <div className="font-semibold mb-1">List of Employee</div>
              <div className="text-xs">(List of employees / job seekers)</div>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH SECTION */}
      <div className="w-full">
        {/* SEARCH BAR */}
        <div className="bg-gray-100 py-4 border-b">
          <div className="max-w-6xl mx-auto px-4 flex gap-2 flex-wrap">
            <select
              className="border px-3 py-2 text-sm"
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="">Select Type</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="service_provider">Service Provider</option>
              <option value="service_reciever">Service Reciever</option>
              <option value="employees">Employee</option>
              <option value="employers">Employer</option>
              <option value="renter">Renter</option>
            </select>

            <input
              className="border px-3 py-2 text-sm"
              placeholder="Pincode"
              value={filters.pincode}
              onChange={(e) =>
                setFilters({ ...filters, pincode: e.target.value })
              }
            />

            <input
              className="border px-3 py-2 text-sm"
              placeholder="State / District"
              value={filters.state}
              onChange={(e) =>
                setFilters({ ...filters, state: e.target.value })
              }
            />
            <div className="relative">
              <input
                className="border px-3 py-2 text-sm w-full"
                placeholder="Title / Profile / Job"
                value={filters.title}
                onChange={(e) => {
                  const value = e.target.value;
                  setFilters({ ...filters, title: value });
                  debouncedFetchSuggestions(value);
                  setShowSuggestions(true);
                  setActiveIndex(-1);
                }}
                onKeyDown={(e) => {
                  if (!showSuggestions || suggestions.length === 0) return;

                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setActiveIndex((prev) =>
                      prev < suggestions.length - 1 ? prev + 1 : prev
                    );
                  }

                  if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
                  }

                  if (e.key === "Enter" && activeIndex >= 0) {
                    e.preventDefault();
                    setFilters({ ...filters, title: suggestions[activeIndex] });
                    setShowSuggestions(false);
                  }

                  if (e.key === "Escape") {
                    setShowSuggestions(false);
                  }
                }}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              />

              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute bg-white border w-full text-sm z-50">
                  {suggestions.map((s, i) => (
                    <div
                      key={i}
                      className={`px-3 py-2 cursor-pointer ${
                        i === activeIndex ? "bg-gray-200" : "hover:bg-gray-100"
                      }`}
                      onMouseDown={() => {
                        setFilters({ ...filters, title: s });
                        setShowSuggestions(false);
                      }}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleSearch(true)}
              className="border px-4 py-2 text-sm bg-[#8b3a3a]"
            >
              Search
            </button>
          </div>
        </div>

        {/* RESULTS */}
        <div className=" pb-20">
          <div className="max-w-6xl mx-auto px-4 mt-4 space-y-4">
            {results.length === 0 && (
              <div className="bg-white border p-8 text-center text-sm">
                No results found
              </div>
            )}

            {filters.type === "employees" &&
              results.map((e, idx) => (
                <EmployeeCard key={`${e.id}-${idx}`} employee={e} />
              ))}

            {filters.type === "employers" &&
              results.map((e, idx) => (
                <EmployerCard key={`${e.id}-${idx}`} employer={e} />
              ))}

            {[
              "buyer",
              "seller",
              "service_provider",
              "service_reciever",
              "renter",
            ].includes(filters.type) &&
              results.map((a, idx) => <AdCard key={`${a.id}-${idx}`} ad={a} />)}
          </div>
        </div>
        {results.length > 0 && (
          <div className="text-center mt-4">
            <button
              onClick={() => handleSearch(false)}
              className="border px-6 py-2 bg-white text-sm"
              disabled={loading}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>

      {popup.open && (
        <SearchPopup
          mode={popup.mode}
          onClose={() => setPopup({ open: false, mode: "" })}
          onSearch={handlePopupSearch}
        />
      )}
    </div>
  );
}
