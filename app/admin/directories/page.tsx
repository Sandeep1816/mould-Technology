"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

type Directory = {
  id: number
  name: string
  slug: string
  status: "PENDING" | "APPROVED" | "REJECTED"
  isLiveEditable: boolean
  company?: { name: string }
  submittedBy?: { email: string }
  createdAt: string
}

export default function AdminDirectoriesPage() {
  const [directories, setDirectories] = useState<Directory[]>([])
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/suppliers/admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(setDirectories)
      .catch(console.error)
  }, [token])

  return (
    <div className="min-h-screen bg-[#f6f8fc] p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-6">
          Supplier Directories
        </h1>

        {directories.length === 0 && (
          <p className="text-gray-500">
            No directories found
          </p>
        )}

        <table className="w-full text-sm">
          <thead className="border-b">
            <tr className="text-left">
              <th className="py-3">Name</th>
              <th>Status</th>
              <th>Company</th>
              <th>Submitted By</th>
              <th>Created</th>
              <th></th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {directories.map(dir => (
              <tr key={dir.id}>
                <td className="py-3 font-medium">
                  {dir.name}
                  <div className="text-xs text-gray-400">
                    /suppliers/{dir.slug}
                  </div>
                </td>

                <td>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      dir.status === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : dir.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {dir.status}
                  </span>
                </td>

                <td>{dir.company?.name || "—"}</td>
                <td>{dir.submittedBy?.email || "—"}</td>

                <td className="text-xs text-gray-500">
                  {new Date(dir.createdAt).toLocaleDateString()}
                </td>

                <td className="text-right">
                  <Link
                    href={`/admin/directories/${dir.id}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Review
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
