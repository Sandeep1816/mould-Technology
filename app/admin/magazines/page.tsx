"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function AdminMagazinesPage() {
  const [magazines, setMagazines] = useState<any[]>([])

  useEffect(() => {
    const token = localStorage.getItem("token")

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/magazines`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setMagazines)
  }, [])

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Manage Magazines</h1>

      <Link href="/admin/magazines/create" className="bg-black text-white px-4 py-2 rounded">
        + Create Magazine
      </Link>

      <div className="mt-6 space-y-4">
        {magazines.map(m => (
          <div key={m.id} className="border p-4 rounded flex justify-between">
            <span>{m.title}</span>
            <Link href={`/admin/magazines/${m.id}/registrations`}>
              View Registrations
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
