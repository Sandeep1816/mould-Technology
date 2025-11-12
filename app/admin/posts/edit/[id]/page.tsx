"use client";
import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditPost() {
  const router = useRouter();
  const { id } = useParams();

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

  // ✅ Fetch post, authors, categories
  useEffect(() => {
    async function loadData() {
      try {
        const [postRes, authorRes, categoryRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/authors`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`),
        ]);

        const [postData, authorData, categoryData] = await Promise.all([
          postRes.json(),
          authorRes.json(),
          categoryRes.json(),
        ]);

        // ✅ Handle data shape
        const post = postData.data || postData;
        setForm({
          title: post.title || "",
          slug: post.slug || "",
          imageUrl: post.imageUrl || "",
          excerpt: post.excerpt || "",
          content: post.content || "",
          authorId: String(post.authorId || post.author?.id || ""),
          categoryId: String(post.categoryId || post.category?.id || ""),
        });

        setAuthors(authorData.data || authorData);
        setCategories(categoryData.data || categoryData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    }

    loadData();
  }, [id]);

  // ✅ Handle form updates
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit updated post
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    setMessage("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          authorId: Number(form.authorId),
          categoryId: Number(form.categoryId),
        }),
      });

      if (res.ok) {
        setMessage("✅ Post updated successfully!");
        setTimeout(() => router.push("/admin/posts"), 1500);
      } else {
        const err = await res.text();
        console.error("Update failed:", err);
        setMessage("❌ Failed to update post.");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Network error while updating.");
    }
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      {message && <p className="mb-4 text-sm">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Slug</label>
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Image URL</label>
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Excerpt</label>
          <textarea
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            className="border p-2 w-full h-20 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            className="border p-2 w-full h-40 rounded"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Author</label>
            <select
              name="authorId"
              value={form.authorId}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            >
              <option value="">Select Author</option>
              {authors.map((a: any) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Category</label>
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            >
              <option value="">Select Category</option>
              {categories.map((c: any) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded font-medium">
          Update Post
        </button>
      </form>
    </div>
  );
}
