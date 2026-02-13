"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

type Magazine = {
  id: number
  title: string
  slug: string
  coverImageUrl?: string
  createdAt?: string
}

type Props = {
  magazines?: Magazine[]
  limit?: number
  showTitle?: boolean
  variant?: "grid" | "featured"
}

export default function MagazineGrid({
  magazines: initialMagazines,
  limit,
  showTitle = true,
  variant = "grid",
}: Props) {

  const [magazines, setMagazines] = useState<Magazine[]>(initialMagazines || [])
  const [loading, setLoading] = useState(!initialMagazines)

  useEffect(() => {
    if (!initialMagazines) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/magazines`)
        .then(res => res.json())
        .then(data => {
          setMagazines(data)
          setLoading(false)
        })
    }
  }, [initialMagazines])

  if (loading) return <p>Loading...</p>

  const displayMagazines = limit ? magazines.slice(0, limit) : magazines

  /* ================= FEATURED VERSION ================= */
  if (variant === "featured" && displayMagazines.length > 0) {
    const mag = displayMagazines[0]

    return (
      <div className="p-10 flex flex-col justify-center">
        <h2 className="text-[28px] font-bold text-[#003B5C] mb-8">
          Latest Issue
        </h2>

        <Link href={`/magazines/${mag.slug}`}>
          <img
            src={mag.coverImageUrl}
            alt={mag.title}
            className="w-[220px] shadow-xl mb-6 cursor-pointer"
          />
        </Link>

        <p className="text-[#003B5C] font-semibold mb-2">
          {mag.createdAt
            ? new Date(mag.createdAt).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })
            : ""}
        </p>

        <span className="inline-block bg-[#C70000] text-white text-xs font-bold px-3 py-2 w-fit">
          DIGITAL EDITION
        </span>
      </div>
    )
  }

  /* ================= GRID VERSION ================= */
  return (
    <div className="space-y-8">
      {showTitle && (
        <h2 className="text-3xl font-bold">Digital Magazines</h2>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayMagazines.map((mag) => (
          <Link key={mag.id} href={`/magazines/${mag.slug}`}>
            <div className=" overflow-hidden shadow hover:shadow-lg transition cursor-pointer">
              {mag.coverImageUrl && (
                <img
                  src={mag.coverImageUrl}
                  className="h-64 w-full object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg">{mag.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
