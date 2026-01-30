"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BANNER_PLACEMENTS } from "@/lib/bannerPlacements";

export default function BannerListPage() {
  const [banners, setBanners] = useState<any[]>([]);
  const [placement, setPlacement] = useState<string>("ALL");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchBanners = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/banners/admin/all`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await res.json();
    setBanners(data);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const deleteBanner = async (id: number) => {
    if (!confirm("Delete this banner permanently?")) return;

    setDeletingId(id);

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/banners/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setBanners((prev) => prev.filter((b) => b.id !== id));
    setDeletingId(null);
  };

  const filteredBanners =
    placement === "ALL"
      ? banners
      : banners.filter((b) => b.placement === placement);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Advertisement Banners</h1>

        <div className="flex gap-3">
          <Link
            href="/admin/banners/reorder"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Reorder Banners
          </Link>

          <Link
            href="/admin/banners/new"
            className="border px-4 py-2 rounded hover:bg-gray-100"
          >
            + New Banner
          </Link>
        </div>
      </div>

      {/* Placement Filter */}
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-gray-600">
          Filter by placement:
        </label>

        <select
          value={placement}
          onChange={(e) => setPlacement(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="ALL">All Placements</option>
          {BANNER_PLACEMENTS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Order</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Placement</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredBanners.map((b) => (
              <tr key={b.id} className="border-t hover:bg-gray-50">
                {/* Order */}
                <td className="p-3 font-medium text-gray-700">
                  {b.position}
                </td>

                {/* Image */}
                <td className="p-3">
                  <img
                    src={b.imageUrl}
                    alt={b.title}
                    className="h-14 rounded border"
                  />
                </td>

                {/* Title */}
                <td className="p-3 font-medium">{b.title}</td>

                {/* Placement */}
                <td className="p-3 text-gray-600">{b.placement}</td>

                {/* Status */}
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      b.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="p-3 text-right space-x-4">
                  <Link
                    href={`/admin/banners/edit/${b.id}`}
                    className="text-indigo-600 hover:underline"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteBanner(b.id)}
                    disabled={deletingId === b.id}
                    className="text-red-600 hover:underline disabled:opacity-50"
                  >
                    {deletingId === b.id ? "Deleting…" : "Delete"}
                  </button>
                </td>
              </tr>
            ))}

            {filteredBanners.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="p-8 text-center text-gray-500"
                >
                  No banners found for this placement
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
