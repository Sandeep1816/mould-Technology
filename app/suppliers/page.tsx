"use client"

import { useEffect, useState } from "react"
import SupplierRowCard from "./SupplierRowCard"
import SupplierFilters from "./SupplierFilters"
import SupplierAds from "./SupplierAds"

type Supplier = {
  id: number
  name: string
  slug: string
  description: string
  location?: string
  logoUrl?: string
}

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/suppliers`)
      .then(res => res.json())
      .then(setSuppliers)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="bg-[#f5f6f7]">

      {/* GRID */}
      <div className="max-w-[1400px] mx-auto px-6 py-6 grid grid-cols-12 gap-8">

        {/* LEFT FILTERS */}
        <aside className="col-span-3">
          <SupplierFilters />
        </aside>

        {/* CENTER CONTENT */}
        <main className="col-span-6 space-y-6">

       {/* HERO */}
<div className="relative w-full h-[220px]">
  <img
    src="/images/search-landscape.jpg"
    alt="Find a MoldMaking Technology Supplier"
    className="w-full h-full object-cover"
  />

  {/* Dark overlay for readability */}
  <div className="absolute inset-0 bg-black/40" />

  {/* Centered text */}
  <div className="absolute inset-0 flex items-center justify-center">
    <h1 className="text-white text-4xl font-bold tracking-wide text-center">
      Find a MoldMaking Technology Supplier
    </h1>
  </div>
</div>


          {/* BREADCRUMB */}
          <div className="text-sm text-gray-600">
            <span className="underline cursor-pointer">Home</span>
            <span className="mx-2">›</span>
            <span className="font-medium text-gray-800">Find a Supplier</span>
          </div>

          {/* SEARCH HEADER */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold text-[#0b3954]">
                Search Results
              </h2>
              <p className="text-gray-600 mt-1">
                {suppliers.length} filtered results
              </p>
            </div>

            <div>
              <select className="border px-3 py-2 text-sm">
                <option>Alphabetical</option>
              </select>
            </div>
          </div>

          {/* RESULTS */}
          {loading ? (
            <p>Loading suppliers...</p>
          ) : (
            suppliers.map(s => (
              <SupplierRowCard key={s.id} supplier={s} />
            ))
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
