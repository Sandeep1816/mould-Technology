"use client";

import { useState, useEffect } from "react";
import { BANNER_PLACEMENTS } from "@/lib/bannerPlacements";

type BannerFormProps = {
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
};

export default function BannerForm({ initialData, onSubmit }: BannerFormProps) {
  const [title, setTitle] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [placement, setPlacement] = useState(BANNER_PLACEMENTS[0].value);
  const [status, setStatus] = useState("ACTIVE");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ FIX: Sync state when initialData changes
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setTargetUrl(initialData.targetUrl || "");
      setPlacement(initialData.placement || BANNER_PLACEMENTS[0].value);
      setStatus(initialData.status || "ACTIVE");
      setImageUrl(initialData.imageUrl || "");
    }
  }, [initialData]);

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/banners/upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      }
    );

    const data = await res.json();
    setImageUrl(data.imageUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await onSubmit({
      title,
      imageUrl,
      targetUrl,
      placement,
      status,
    });

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      {/* Title */}
      <div>
        <label className="block font-medium mb-1">Banner Title</label>
        <input
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* Redirect URL */}
      <div>
        <label className="block font-medium mb-1">Redirect URL</label>
        <input
          className="w-full border p-2 rounded"
          value={targetUrl}
          onChange={(e) => setTargetUrl(e.target.value)}
          placeholder="https://example.com"
        />
      </div>

      {/* Placement */}
      <div>
        <label className="block font-medium mb-1">Placement</label>
        <select
          className="w-full border p-2 rounded"
          value={placement}
          onChange={(e) => setPlacement(e.target.value)}
        >
          {BANNER_PLACEMENTS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      {/* Status */}
      <div>
        <label className="block font-medium mb-1">Status</label>
        <select
          className="w-full border p-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block font-medium mb-1">Banner Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => uploadImage(e.target.files![0])}
        />

        {imageUrl && (
          <img
            src={imageUrl}
            alt="Banner Preview"
            className="mt-3 w-full rounded border"
          />
        )}
      </div>

      {/* Submit */}
      <button
        disabled={!imageUrl || loading}
        className="bg-black text-white px-6 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Banner"}
      </button>
    </form>
  );
}
