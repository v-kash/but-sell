"use client";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";

export default function AdminAdsPage() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({ q: "" });

  const handleSearch = () => {
    setPage(1); // 🔥 reset pagination
    fetchAds(1); // 🔥 force page 1 fetch
  };

  const fetchAds = async (pageToLoad = page) => {
    setLoading(true);

    const params = new URLSearchParams({
      page: pageToLoad,
      ...filters,
    });

    const res = await fetch(`/api/admin/ads?${params}`);
    const data = await res.json();

    setAds(data.data);
    setTotal(data.total);
    setLoading(false);
  };

  useEffect(() => {
    fetchAds();
  }, [page]);

  const toggleRecommended = async (adId, value) => {
    await fetch("/api/admin/ads/toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adId, value }),
    });

    // ✅ refetch WITH SAME page + filters
    fetchAds(page);
  };

  if (loading) return <Spinner size={40} />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold mb-4">Admin – Ads</h1>

      <div className="flex gap-2 mb-4">
        <input
          placeholder="Title / Contact"
          className="border px-3 py-2 w-full"
          value={filters.q}
          onChange={(e) => setFilters({ ...filters, q: e.target.value })}
        />

        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-[#7b2c2c] text-white rounded"
        >
          Search
        </button>
      </div>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Title</th>
            <th className="border p-2">Contact</th>
            <th className="border p-2">State</th>
            <th className="border p-2">Recommended</th>
          </tr>
        </thead>
        <tbody>
          {ads.length === 0 && !loading && (
            <tr>
              <td colSpan="4" className="text-center p-4 text-gray-500">
                No ads found
              </td>
            </tr>
          )}

          {ads.map((ad) => (
            <tr key={ad.id}>
              <td className="border p-2">{ad.title}</td>
              <td className="border p-2">{ad.contact}</td>
              <td className="border p-2">{ad.state}</td>
              <td className="border p-2 text-center">
                <input
                  type="checkbox"
                  checked={ad.is_recommended}
                  onChange={(e) => toggleRecommended(ad.id, e.target.checked)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center gap-3 mt-4">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span>
          Page {page} / {Math.ceil(total / 20)}
        </span>
        <button disabled={page * 20 >= total} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
