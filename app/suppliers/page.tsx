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

      {/* HERO */}
      <div className="bg-[url('/supplier-hero.jpg')] bg-cover bg-center h-[220px] flex items-center">
        <div className="max-w-[1400px] mx-auto px-6">
          <h1 className="text-black text-4xl font-bold">
            Find a MoldMaking Technology Supplier
          </h1>
        </div>
      </div>

      {/* GRID */}
      <div className="max-w-[1400px] mx-auto px-6 py-8 grid grid-cols-12 gap-8">

        {/* LEFT FILTERS */}
        <aside className="col-span-3">
          <SupplierFilters />
        </aside>

        {/* RESULTS */}
        <main className="col-span-6 space-y-6">
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
