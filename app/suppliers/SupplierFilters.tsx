"use client"

export default function SupplierFilters() {
  return (
    <div className="bg-white  rounded p-4 sticky top-6 max-h-[calc(100vh-40px)] overflow-y-auto">

      {/* SEARCH */}
      <input className="w-full border p-2 mb-3" placeholder="Search by supplier name" />
      <input className="w-full border p-2 mb-3" placeholder="Search by location" />
      <input className="w-full border p-2 mb-4" placeholder="Search by product category" />

      {/* FEATURED */}
      <label className="flex items-center gap-2 mb-4">
        <input type="checkbox" />
        <span className="font-semibold text-sm">Featured Suppliers</span>
      </label>

      {/* FILTER GROUP */}
      <FilterSection title="Additive Manufacturing">
        <FilterItem label="Additive Manufacturing Machines (By Material)" />
        <FilterItem label="for Ceramic Parts" />
        <FilterItem label="for Composite Parts" />
        <FilterItem label="Continuous Fiber/Thermoplastic Resin" />
        <FilterItem label="Continuous Fiber/Thermoset Resin" />
        <FilterItem label="Discontinuous Fiber/Thermoplastic Resin" />
        <FilterItem label="Discontinuous Fiber/Thermoset Resin" />
      </FilterSection>

      <FilterSection title="Automation & AI" />
      <FilterSection title="Business Development" />
      <FilterSection title="Cleaning & Pretreatment" />
      <FilterSection title="Composites Fabrication" />
      <FilterSection title="Inspection, Testing, Measurement" />
      <FilterSection title="Manufacturing Execution & Automation Software & Controls" />
      <FilterSection title="Manufacturing Services" />
      <FilterSection title="Materials" />
      <FilterSection title="Metalworking" />
      <FilterSection title="Mold Making" />
      <FilterSection title="Plastics Processing Equipment" />
      <FilterSection title="Pollution Control & Sustainability" />
      <FilterSection title="Supplies" />
      <FilterSection title="Surface Finishing" />
      <FilterSection title="Temperature/Pressure Control Equipment" />
      <FilterSection title="Workholding" />
    </div>
  )
}

/* ---------- SMALL COMPONENTS ---------- */

function FilterSection({ title, children }: any) {
  return (
    <details open className="border-t pt-3 mt-3">
      <summary className="font-semibold text-sm cursor-pointer">
        {title}
      </summary>
      <div className="mt-2 space-y-1">
        {children}
      </div>
    </details>
  )
}

function FilterItem({ label }: { label: string }) {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-700">
      <input type="checkbox" />
      {label}
    </label>
  )
}
