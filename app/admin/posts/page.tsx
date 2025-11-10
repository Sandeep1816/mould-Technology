"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type Post = {
  id: number;
  title: string;
  slug: string;
  imageUrl?: string;
  category?: { name: string };
  author?: { name: string };
  publishedAt?: string;
};

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("https://newsprk-backend.onrender.com/api/posts?limit=1000");
        const data = await res.json();
        setPosts(data.data || data);
      } catch (err) {
        console.error(err);
        setMessage("❌ Failed to load posts.");
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  async function handleDelete(id: number) {
    const token = localStorage.getItem("token");
    if (!token) return alert("Unauthorized: please login again.");

    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(
        `https://newsprk-backend.onrender.com/api/posts/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
        setMessage("✅ Post deleted successfully!");
      } else {
        setMessage("❌ Failed to delete post.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Network error.");
    }
  }

  // 🧩 Table Setup with TanStack
  const columnHelper = createColumnHelper<Post>();

  const columns = [
    columnHelper.display({
      id: "image",
      header: "Image",
      cell: (info) => {
        const imageUrl = info.row.original.imageUrl;
        const fixedUrl = imageUrl?.startsWith("http")
          ? imageUrl
          : imageUrl
          ? `https://newsprk-backend.onrender.com${imageUrl}`
          : null;

        return fixedUrl ? (
          <img
            src={fixedUrl}
            alt="post"
            className="w-16 h-16 object-cover rounded-md"
          />
        ) : (
          <span className="text-gray-400 italic">No Image</span>
        );
      },
    }),

    columnHelper.accessor("title", {
      header: "Title",
      cell: (info) => <span className="font-medium">{info.getValue()}</span>,
    }),

    columnHelper.display({
      id: "category",
      header: "Category",
      cell: (info) => info.row.original.category?.name || "-",
    }),

    columnHelper.display({
      id: "author",
      header: "Author",
      cell: (info) => info.row.original.author?.name || "-",
    }),

    columnHelper.display({
      id: "publishedAt",
      header: "Published",
      cell: (info) => {
        const date = info.row.original.publishedAt;
        return date
          ? new Date(date).toLocaleDateString()
          : "—";
      },
    }),

    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => (
        <div className="space-x-2 text-center">
          <button
            onClick={() =>
              router.push(`/admin/posts/edit/${info.row.original.id}`)
            }
            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-xs"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(info.row.original.id)}
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-xs"
          >
            Delete
          </button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: posts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading posts...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-indigo-700">All Posts</h1>
          <button
            onClick={() => router.push("/admin/posts/create")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            ➕ Create New Post
          </button>
        </div>

        {message && (
          <p
            className={`text-center text-sm font-medium mb-4 ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-sm">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-4 py-3 border text-left font-semibold"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 border">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
