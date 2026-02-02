"use client"

import { useEffect, useState } from "react"
import SupplierRowCard from "./SupplierRowCard"
import SupplierFilters from "./SupplierFilters"
import SupplierAds from "@/components/SupplierAds"

type Supplier = {
  id: number
  name: string
  slug: string
  description: string
  location?: string
  logoUrl?: string
}

const PER_PAGE = 15 // 🔥 change to 20 if needed

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/suppliers`)
      .then(res => res.json())
      .then(data => {
        setSuppliers(data)
        setLoading(false)
      })
  }, [])

  const totalPages = Math.ceil(suppliers.length / PER_PAGE)

  const startIndex = (currentPage - 1) * PER_PAGE
  const endIndex = startIndex + PER_PAGE
  const visibleSuppliers = suppliers.slice(startIndex, endIndex)

  return (
    <div className="bg-[#f5f6f7]">

      <div className="max-w-[1400px] mx-auto px-6 py-6 grid grid-cols-12 gap-8">

        {/* LEFT FILTERS */}
        <aside className="col-span-3">
          <SupplierFilters />
        </aside>

        {/* CENTER CONTENT */}
        <main className="col-span-6 space-y-6">

          {/* HERO */}
          <div className="relative w-full h-[160px]">
            <img
              src="/images/search-landscape.jpg"
              alt="Find a MoldMaking Technology Supplier"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-white text-4xl font-bold text-center">
                Find a MoldMaking Technology Supplier
              </h1>
            </div>
          </div>

          {/* BREADCRUMB */}
          <div className="text-sm text-gray-600">
            <span className="underline cursor-pointer">Home</span>
            <span className="mx-2">›</span>
            <span className="font-medium text-gray-800">
              Find a Supplier
            </span>
          </div>

          {/* SEARCH HEADER */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold text-[#0b3954]">
                Search Results
              </h2>
              <p className="text-gray-600 mt-1">
                {suppliers.length} total suppliers
              </p>
            </div>

            <select className="border px-3 py-2 text-sm">
              <option>Alphabetical</option>
            </select>
          </div>

          {/* RESULTS */}
          {loading ? (
            <p>Loading suppliers...</p>
          ) : (
            visibleSuppliers.map(s => (
              <SupplierRowCard key={s.id} supplier={s} />
            ))
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex items-center gap-2 pt-6">
              {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 border text-sm font-semibold
                      ${
                        page === currentPage
                          ? "bg-[#0b3954] text-white"
                          : "bg-white text-blue-700 hover:bg-gray-100"
                      }
                    `}
                  >
                    {page}
                  </button>
                )
              })}

              {currentPage < totalPages && (
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="w-10 h-10 border bg-white text-blue-700 hover:bg-gray-100"
                >
                  »
                </button>
              )}
            </div>
          )}

        </main>

        {/* RIGHT ADS */}
        <aside className="col-span-3">
          <SupplierAds />
        </aside>
      </div>
    </div>
  )
}
