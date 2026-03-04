"use client";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";

export default function AdminAdsPage() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({ q: "" });

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAd, setEditingAd] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleSearch = () => {
    setPage(1);
    fetchAds(1);
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

  const handleApproval = async (adId, action) => {
    await fetch("/api/admin/ads/approval", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adId, action }),
    });

    fetchAds(page);
  };

  const toggleRecommended = async (adId, value) => {
    await fetch("/api/admin/ads/toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adId, value }),
    });

    fetchAds(page);
  };

  const deleteAd = async (id) => {
    if (!confirm("Are you sure you want to delete this ad?")) return;

    await fetch("/api/admin/ads/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    fetchAds(page);
  };

  const openEditModal = (ad) => {
    setEditingAd(ad);

    setEditForm({
      type: ad.type || "buyer_receiver",
      contact: ad.contact || "",
      name: ad.title || "",
      address: ad.address || "",
      area: ad.area || "",
      taluka: ad.taluka || "",
      district: ad.district || "",
      state: ad.state || "",
      pincode: ad.pincode || "",
      allIndia: ad.all_india || false,
      budget: ad.budget || "",
      detailedDescription: ad.detailed_description || "",
      rating: ad.rating || 0,
    });

    setShowEditModal(true);
  };

  const submitEdit = async () => {
    await fetch(`/api/admin/ads/${editingAd.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });

    setShowEditModal(false);
    fetchAds(page);
  };

  if (loading) return <Spinner size={40} />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold mb-4">Admin – Ads</h1>

      <select
        className="border px-2 py-2"
        onChange={(e) =>
          setFilters({ ...filters, approval_status: e.target.value })
        }
      >
        <option value="">All approval</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>

      <select
        className="border px-2 py-2"
        onChange={(e) =>
          setFilters({ ...filters, payment_status: e.target.value })
        }
      >
        <option value="">All Payments</option>
        <option value="pending">Pending</option>
        <option value="verified">Verified</option>
      </select>

      {/* Search */}
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

      {/* Table */}
      <table className="w-full border text-sm ">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Contact</th>
            <th className="border p-2">State</th>
            <th className="border p-2">Plan</th>
            <th className="border p-2">Payment</th>
            <th className="border p-2">Approval</th>
            <th className="border p-2">Recommended</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {ads.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">
                No ads found
              </td>
            </tr>
          )}

          {ads.map((ad) => (
            <tr key={ad.id}>
              <td className="border p-2">
                <div className="w-[160px] truncate" title={ad.title}>
                  {ad.title}
                </div>
              </td>
              <td className="border p-2">
                <div className="w-[140px] truncate" title={ad.contact}>
                  {ad.contact}
                </div>
              </td>
              <td className="border p-2">
                <div className="w-[120px] truncate" title={ad.state}>
                  {ad.state}
                </div>
              </td>
              <td className="border p-2">{ad.subscription_plan}</td>
              <td className="border p-2">{ad.payment_status}</td>
              <td className="border p-2">{ad.approval_status}</td>
              <td className="border p-2 text-center">
                <input
                  type="checkbox"
                  checked={ad.is_recommended}
                  onChange={(e) => toggleRecommended(ad.id, e.target.checked)}
                />
              </td>
              <td className="border p-2 text-center">
                <div className="flex flex-wrap gap-1 justify-center">
                  <button
                    onClick={() => openEditModal(ad)}
                    className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteAd(ad.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => handleApproval(ad.id, "approve")}
                    className="px-2 py-1 bg-green-600 text-white rounded text-xs"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleApproval(ad.id, "reject")}
                    className="px-2 py-1 bg-yellow-600 text-white rounded text-xs"
                  >
                    Reject
                  </button>
                </div>
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

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[500px] max-h-[90vh] overflow-y-auto space-y-3">
            <h2 className="font-semibold text-lg text-center">Edit Ad</h2>

            <select
              className="border px-3 py-2 w-full"
              value={editForm.type}
              onChange={(e) =>
                setEditForm({ ...editForm, type: e.target.value })
              }
            >
              <option value="buyer_receiver">Buyer / Service Receiver</option>
              <option value="seller_provider">Seller / Service Provider</option>
              <option value="renter">Renter</option>
            </select>
            <label className="block text-sm font-medium mb-1">Contact</label>
            <input
              className="border px-3 py-2 w-full"
              value={editForm.contact}
              onChange={(e) =>
                setEditForm({ ...editForm, contact: e.target.value })
              }
              placeholder="Contact"
            />
            <label className="block text-sm font-medium mb-1">
              business name
            </label>
            <input
              className="border px-3 py-2 w-full"
              value={editForm.name}
              onChange={(e) =>
                setEditForm({ ...editForm, name: e.target.value })
              }
              placeholder="Name"
            />
            <label className="block text-sm font-medium mb-1">address</label>
            <input
              className="border px-3 py-2 w-full"
              value={editForm.address}
              onChange={(e) =>
                setEditForm({ ...editForm, address: e.target.value })
              }
              placeholder="Address"
            />
            <label className="block text-sm font-medium mb-1">area</label>
            <input
              className="border px-3 py-2 w-full"
              value={editForm.area}
              onChange={(e) =>
                setEditForm({ ...editForm, area: e.target.value })
              }
              placeholder="Area"
            />
            <label className="block text-sm font-medium mb-1">taluka</label>
            <input
              className="border px-3 py-2 w-full"
              value={editForm.taluka}
              onChange={(e) =>
                setEditForm({ ...editForm, taluka: e.target.value })
              }
              placeholder="Taluka"
            />
            <label className="block text-sm font-medium mb-1">district</label>
            <input
              className="border px-3 py-2 w-full"
              value={editForm.district}
              onChange={(e) =>
                setEditForm({ ...editForm, district: e.target.value })
              }
              placeholder="District"
            />
            <label className="block text-sm font-medium mb-1">state</label>
            <input
              className="border px-3 py-2 w-full"
              value={editForm.state}
              onChange={(e) =>
                setEditForm({ ...editForm, state: e.target.value })
              }
              placeholder="State"
            />
            <label className="block text-sm font-medium mb-1">pincode</label>
            <input
              className="border px-3 py-2 w-full"
              value={editForm.pincode}
              onChange={(e) =>
                setEditForm({ ...editForm, pincode: e.target.value })
              }
              placeholder="Pincode"
            />
            <label className="block text-sm font-medium mb-1">budget</label>
            <input
              className="border px-3 py-2 w-full"
              value={editForm.budget}
              onChange={(e) =>
                setEditForm({ ...editForm, budget: e.target.value })
              }
              placeholder="Budget"
            />
            <label className="block text-sm font-medium mb-1">
              requirement/description
            </label>
            <textarea
              className="border px-3 py-2 w-full"
              value={editForm.detailedDescription}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  detailedDescription: e.target.value,
                })
              }
              placeholder="Detailed Description"
            />

            <label className="block text-sm font-medium mb-1">rating</label>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              className="border px-3 py-2 w-full"
              value={editForm.rating}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  rating: Number(e.target.value),
                })
              }
              placeholder="Rating"
            />

            <div className="flex justify-between pt-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={submitEdit}
                className="px-4 py-2 bg-[#7b2c2c] text-white rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
