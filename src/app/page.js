"use client";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

import AdCard from "@/components/AdCard";

import EmployeeCard from "@/components/EmployeeCard";
import EmployerCard from "@/components/EmployerCard";
import SearchPopup from "@/components/SearchPopup";

import { useRouter } from "next/navigation";
import LoginRequiredPopup from "@/components/LoginRequiredPopup";

function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export default function HomePage() {
  const [filters, setFilters] = useState({
    type: "seller_provider",
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
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const { loggedIn } = useAuth();
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // Clear old results when type changes
    setResults([]);
  }, [filters.type]);

  const loadMoreHome = async () => {
    if (!hasMore) return;

    setLoading(true);

    const nextPage = page + 1;

    const res = await fetch(`/api/home-listings?page=${nextPage}`);
    const data = await res.json();

    if (res.ok) {
      setResults((prev) => [...prev, ...data.data]);
      setPage(nextPage);

      if (data.data.length < 12) {
        setHasMore(false);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    const fetchHome = async () => {
      setLoading(true);

      const res = await fetch("/api/home-listings?page=1");
      const data = await res.json();

      if (res.ok) {
        setResults(data.data);
        setHasMore(data.data.length === 12); // if less than limit → no more
        setPage(1);
      }

      setLoading(false);
    };

    fetchHome();
  }, []);

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
      entity: ["buyer_receiver", "seller_provider", "renter"].includes(
        filters.type,
      )
        ? "ads"
        : filters.type,
    });

    if (filters.pincode) params.append("pincode", filters.pincode);
    if (filters.state) params.append("district", filters.state);
    if (filters.title) params.append("q", filters.title);

    // only ads have type
    if (
      ["buyer_receiver", "seller_provider", "renter"].includes(filters.type)
    ) {
      params.append("type", filters.type);
    }

    params.append("page", reset ? 1 : page + 1);

    const res = await fetch(`/api/search?${params.toString()}`);
    const data = await res.json();

    if (res.ok) {
      const newData = data.data;

      if (reset) {
        setResults(newData);
        setPage(1);
      } else {
        setResults((prev) => [...prev, ...newData]);
        setPage(page + 1);
      }

      // ✅ IMPORTANT
      if (newData.length < 12) {
        setHasMore(false); // no more data
      } else {
        setHasMore(true);
      }
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

    // const res = await fetch(`/api/suggestions?q=${value}`);
    const res = await fetch(
      `/api/suggestions?q=${value}&entity=${
        ["buyer_receiver", "seller_provider", "renter"].includes(filters.type)
          ? "ads"
          : filters.type
      }`,
    );
    const data = await res.json();
    setSuggestions(data);
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

  const [popup, setPopup] = useState({
    open: false,
    mode: "", // ads | employee | employer
  });

  const handlePopupSearch = async ({
    mode,
    type,
    pincode,
    district,
    description,
  }) => {
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
    } else if (district) {
      params.append("district", district);
    }

    // ✅ DESCRIPTION SEARCH
    if (description) {
      params.append("q", description);
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
            Find Job or anything
          </h1>

          <p className="text-sm mb-8">
            Your local marketplace for buying, selling, rentor, and Job
          </p>

          {/* TOP BUTTONS */}
          <div className="flex justify-center gap-4 flex-wrap mb-6">
            <button
              onClick={() =>
                loggedIn ? router.push("/post-ad") : setShowLoginPopup(true)
              }
              className="bg-gray-200 text-black px-6 py-2 rounded border"
            >
              Post Your Ad Here
            </button>

            <button
              onClick={() =>
                loggedIn
                  ? router.push("/register-employee")
                  : setShowLoginPopup(true)
              }
              className="bg-gray-200 text-black px-6 py-2 rounded border"
            >
              Register as Employee
            </button>

            <button
              onClick={() =>
                loggedIn
                  ? router.push("/register-employer")
                  : setShowLoginPopup(true)
              }
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
              <div className="text-xs">
                (List of employers / Ready to give job )
              </div>
            </div>

            <div
              className="bg-[#8b3a3a] px-6 py-3 rounded text-sm w-[300px] cursor-pointer"
              onClick={() => setPopup({ open: true, mode: "employees" })}
            >
              <div className="font-semibold mb-1">List of Employee</div>
              <div className="text-xs">
                (List of employees / Ready to do job )
              </div>
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
              className="border px-3 py-2 text-sm "
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="buyer_receiver">Buyer / Service Receiver</option>
              <option value="seller_provider">Seller / Service Provider</option>
              <option value="renter">Renter</option>
              <option value="employees">Employee</option>
              <option value="employers">Employer</option>
            </select>

            <input
              className="border px-3 py-2 text-sm "
              placeholder="Pincode"
              value={filters.pincode}
              onChange={(e) =>
                setFilters({ ...filters, pincode: e.target.value })
              }
            />

            <div className="relative">
              <input
                className="border px-3 py-2 text-sm w-[260px] "
                placeholder="State / District / area / Taluka (Tehsil)"
                value={filters.state}
                onChange={(e) =>
                  setFilters({ ...filters, state: e.target.value })
                }
              />

              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500">
                *
              </span>
            </div>
            <div className="relative flex-1 min-w-[220px]">
              <input
                className="border px-3 py-2 text-sm w-full"
                placeholder="Description / Requirement"
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
                      prev < suggestions.length - 1 ? prev + 1 : prev,
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

              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500">
                *
              </span>
            </div>

            <button
              onClick={() => handleSearch(true)}
              className="border px-4 py-2 text-sm bg-[#8b3a3a] w-[120px]"
            >
              Search
            </button>
          </div>
        </div>

        {/* RESULTS */}
        <div className=" pb-20">
          <div className="max-w-6xl mx-auto px-4 mt-4 space-y-4">
            {/* 🔄 LOADING STATE */}
            {/* 🔄 Initial Loading */}
            {loading && results.length === 0 && (
              <div className="bg-white border p-8 text-center text-sm">
                Loading Ads...
              </div>
            )}

            {/* ❌ No Listings At All (homepage case) */}
            {!loading && results.length === 0 && (
              <div className="bg-white border p-8 text-center text-sm">
                No results
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

            {["buyer_receiver", "seller_provider", "renter"].includes(
              filters.type,
            ) &&
              results.map((a, idx) => <AdCard key={`${a.id}-${idx}`} ad={a} />)}
          </div>
        </div>
        {!loading && results.length > 0 && (
          <div className="text-center  pb-10">
            {hasMore ? (
              <button
                onClick={loadMoreHome}
                className="border px-6 py-2 bg-white text-sm"
              >
                Load More
              </button>
            ) : (
              <div className="text-sm text-gray-500">
                No more listings found
              </div>
            )}
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
      {showLoginPopup && (
        <LoginRequiredPopup
          onClose={() => setShowLoginPopup(false)}
          onLogin={() => router.push("/login")}
        />
      )}
    </div>
  );
}
