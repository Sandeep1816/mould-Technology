"use client";
import { useEffect, useState, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditPost() {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState<any>({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`https://newsprk-backend.onrender.com/api/posts/${id}`)
      .then((r) => r.json())
      .then((d) => setForm(d));
  }, [id]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await fetch(`https://newsprk-backend.onrender.com/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setMessage("✅ Post updated!");
      router.push("/admin/posts");
    } else {
      setMessage("❌ Failed to update.");
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      {message && <p className="mb-4 text-sm">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={form.title || ""}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 w-full"
        />
        <textarea
          value={form.content || ""}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="border p-2 w-full h-40"
        />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
}
