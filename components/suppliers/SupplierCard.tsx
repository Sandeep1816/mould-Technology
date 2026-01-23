"use client"

import { Supplier } from "@/types/Supplier"

export default function SupplierCard({ supplier }: { supplier: Supplier }) {
  return (
    <article className="border rounded p-6 flex gap-6">
      <img
        src={supplier.logo || "/placeholder.svg"}
        className="w-32 h-32 object-contain"
      />

      <div className="flex-1">
        <h3 className="text-xl font-bold">{supplier.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{supplier.location}</p>

        <p className="text-gray-700 mb-4 line-clamp-4">
          {supplier.description}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex gap-3 text-gray-600">
            {supplier.socials?.facebook && <span>FB</span>}
            {supplier.socials?.linkedin && <span>IN</span>}
            {supplier.socials?.twitter && <span>X</span>}
            {supplier.socials?.youtube && <span>YT</span>}
          </div>

          <button className="bg-red-600 text-white px-4 py-2 font-bold">
            VIEW SHOWROOM
          </button>
        </div>
      </div>
    </article>
  )
}
