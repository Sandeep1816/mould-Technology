"use client";

import BannerForm from "../BannerForm";

export default function NewBannerPage() {
  const createBanner = async (data: any) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/banners`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });

    alert("Banner created successfully");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create Banner</h1>
      <BannerForm onSubmit={createBanner} />
    </div>
  );
}
