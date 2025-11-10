"use client";
import { useEffect, useState, FormEvent, ChangeEvent } from "react";

export default function CreatePost() {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    imageUrl: "",
    excerpt: "",
    content: "",
    authorId: "",
    categoryId: "",
  });

  const [authors, setAuthors] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false); // 🆕 for image upload

  // 🧩 Fetch authors & categories once
  useEffect(() => {
    Promise.all([
      fetch("https://newsprk-backend.onrender.com/api/authors").then((r) => r.json()),
      fetch("https://newsprk-backend.onrender.com/api/categories").then((r) => r.json()),
    ])
      .then(([a, c]) => {
        setAuthors(a.data || a);
        setCategories(c.data || c);
      })
      .catch(() => {
        setAuthors([]);
        setCategories([]);
      });
  }, []);

  // 🧩 Auto-generate slug when title changes
  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setForm((prev) => ({ ...prev, title, slug }));
  }

  // 🧩 Generic input change handler
  function handleChange(
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // 🧩 🆕 Image Upload Handler
  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage("⏫ Uploading image...");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("https://newsprk-backend.onrender.com/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.imageUrl) {
        setForm((prev) => ({ ...prev, imageUrl: data.imageUrl }));
        setMessage("✅ Image uploaded successfully!");
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (err: any) {
      console.error(err);
      setMessage("❌ Image upload failed");
    } finally {
      setUploading(false);
    }
  }

  // 🧩 Submit post to backend
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const token = localStorage.getItem("token");

    const excerpt =
      form.excerpt.trim() ||
      form.content.replace(/<[^>]+>/g, "").substring(0, 150) + "...";

    try {
      const res = await fetch("https://newsprk-backend.onrender.com/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          ...form,
          excerpt,
          authorId: Number(form.authorId),
          categoryId: Number(form.categoryId),
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setMessage("✅ Post created successfully!");
        setForm({
          title: "",
          slug: "",
          imageUrl: "",
          excerpt: "",
          content: "",
          authorId: "",
          categoryId: "",
        });
      } else {
        setMessage(`❌ ${data?.error || "Something went wrong"}`);
      }
    } catch (err: any) {
      setLoading(false);
      setMessage(`❌ ${err?.message || "Network error"}`);
    }
  }

  // 🧱 UI
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 flex justify-center">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
          📝 Create New Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleTitleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-semibold mb-2">Slug</label>
            <input
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* 🆕 Image Upload */}
          <div>
            <label className="block text-sm font-semibold mb-2">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {/* Image Preview */}
          {form.imageUrl && (
            <div className="mt-4">
              <img
                src={form.imageUrl}
                alt="Preview"
                className="rounded-lg shadow-md w-full max-h-64 object-cover"
              />
            </div>
          )}

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold mb-2">Category</label>
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select category</option>
              {categories.map((c: any) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-semibold mb-2">Author</label>
            <select
              name="authorId"
              value={form.authorId}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select author</option>
              {authors.map((a: any) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-semibold mb-2">Excerpt</label>
            <textarea
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              rows={3}
              placeholder="Short summary or teaser for your post..."
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 resize-y"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold mb-2">Content</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={12}
              placeholder="Write your full article here..."
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 resize-y"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || uploading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${
              loading || uploading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading
              ? "Creating..."
              : uploading
              ? "Uploading Image..."
              : "🚀 Create Post"}
          </button>

          {/* Message */}
          {message && (
            <p
              className={`text-center mt-3 text-sm font-medium ${
                message.startsWith("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
