"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import BannerForm from "../../BannerForm";

export default function EditBannerPage() {
  const { id } = useParams(); // ✅ FIX
  const router = useRouter();

  const [banner, setBanner] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchBanner = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/banners/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!res.ok) throw new Error("Banner not found");

        const data = await res.json();
        setBanner(data);
      } catch (error) {
        console.error("Fetch error:", error);
        setBanner(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, [id]);

  const updateBanner = async (updatedData: any) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/banners/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      alert("Banner updated successfully ✅");
      router.push("/admin/banners");
    } catch (error) {
      console.error(error);
      alert("Failed to update banner ❌");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!banner) return <p className="p-6 text-red-500">Banner not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Banner</h1>
      <BannerForm initialData={banner} onSubmit={updateBanner} />
    </div>
  );
}