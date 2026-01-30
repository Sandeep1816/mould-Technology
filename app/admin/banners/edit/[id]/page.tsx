"use client";

import { useEffect, useState } from "react";
import BannerForm from "../../BannerForm";

export default function EditBannerPage({
  params,
}: {
  params: { id: string };
}) {
  const [banner, setBanner] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/banners/admin/all`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((b: any) => b.id === Number(params.id));
        setBanner(found);
        setLoading(false);
      });
  }, [params.id]);

  const updateBanner = async (updatedData: any) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/banners/${params.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedData),
      }
    );

    alert("Banner updated successfully");
  };

  if (loading) return <p>Loading...</p>;
  if (!banner) return <p>Banner not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Banner</h1>
      <BannerForm initialData={banner} onSubmit={updateBanner} />
    </div>
  );
}
