"use client";
import { useEffect, useState, FormEvent, ChangeEvent } from "react";

export default function CreatePost() {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    badge: "",          // ✅ ADDED
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
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/authors`).then((r) => r.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`).then((r) => r.json()),
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

  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setForm((prev) => ({ ...prev, title, slug }));
  }

  function handleChange(
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage("⏫ Uploading image...");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, {
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
    } catch {
      setMessage("❌ Image upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const token = localStorage.getItem("token");

    const excerpt =
      form.excerpt.trim() ||
      form.content.replace(/<[^>]+>/g, "").substring(0, 150) + "...";

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          ...form,               // ✅ badge included automatically
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
          badge: "",
          imageUrl: "",
          excerpt: "",
          content: "",
          authorId: "",
          categoryId: "",
        });
      } else {
        setMessage(`❌ ${data?.error || "Something went wrong"}`);
      }
    } catch {
      setLoading(false);
      setMessage("❌ Network error");
    }
  }

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
              className="w-full p-3 border rounded-lg"
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
              className="w-full p-3 border rounded-lg"
            />
          </div>

          {/* ✅ Badge */}
          <div>
            <label className="block text-sm font-semibold mb-2">Badge</label>
            <input
              type="text"
              name="badge"
              value={form.badge}
              onChange={handleChange}
              placeholder="FEATURED, CONFERENCE, TRADE SHOW"
              className="w-full p-3 border rounded-lg"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold mb-2">Upload Image</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          {form.imageUrl && (
            <img
              src={form.imageUrl}
              alt="Preview"
              className="rounded-lg w-full max-h-64 object-cover"
            />
          )}

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold mb-2">Category</label>
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
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
              required
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Select author</option>
              {authors.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          {/* Excerpt */}
          <textarea
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            rows={3}
            placeholder="Short summary"
            className="w-full p-3 border rounded-lg"
          />

          {/* Content */}
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows={10}
            required
            className="w-full p-3 border rounded-lg"
          />

          <button
            type="submit"
            disabled={loading || uploading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Creating..." : "🚀 Create Post"}
          </button>

          {message && (
            <p className="text-center text-sm mt-2">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
