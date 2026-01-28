"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

type Directory = {
  id: number
  name: string
  slug: string
  createdAt: string
  submittedBy: {
    fullName?: string
    email: string
  }
}

export default function AdminDirectoriesPage() {
  const [directories, setDirectories] = useState<Directory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const token = localStorage.getItem("token")

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/directories/pending`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      const data = await res.json()

      // ✅ FIX IS HERE
      setDirectories(data.directories ?? [])

      setLoading(false)
    }

    load()
  }, [])

  if (loading) {
    return <div className="p-10">Loading pending directories...</div>
  }

  return (
    <div className="max-w-6xl mx-auto p-10">
      <h1 className="text-2xl font-bold mb-6">
        Pending Supplier Directories
      </h1>

      {directories.length === 0 ? (
        <p className="text-gray-500">No pending directories 🎉</p>
      ) : (
        <table className="w-full text-sm bg-white rounded shadow">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Company</th>
              <th className="p-3">Submitted By</th>
              <th className="p-3">Date</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {directories.map((d) => (
              <tr key={d.id}>
                <td className="p-3 font-medium">{d.name}</td>
                <td className="p-3">
                  {d.submittedBy.fullName || d.submittedBy.email}
                </td>
                <td className="p-3">
                  {new Date(d.createdAt).toDateString()}
                </td>
                <td className="p-3 text-right">
                  <Link
                    href={`/admin/directories/${d.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Review
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
