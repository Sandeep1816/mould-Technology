"use client"

import { useState } from "react"
import { ChevronDown, Search, MapPin, Tag } from "lucide-react"

export default function SupplierFilters() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">

      {/* HEADER */}
      <div className="bg-[#0F5B78] text-white px-4 sm:px-5 py-4 rounded-t-lg">
        <h3 className="text-base sm:text-lg font-bold">Filter Suppliers</h3>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        
        {/* SEARCH INPUTS */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F5B78] focus:border-transparent" 
              placeholder="Search by supplier name" 
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F5B78] focus:border-transparent" 
              placeholder="Search by location" 
            />
          </div>

          <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F5B78] focus:border-transparent" 
              placeholder="Search by product category" 
            />
          </div>
        </div>

        {/* FEATURED CHECKBOX */}
        <label className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-md cursor-pointer hover:bg-amber-100 transition">
          <input 
            type="checkbox" 
            className="w-4 h-4 text-[#0F5B78] border-gray-300 rounded focus:ring-2 focus:ring-[#0F5B78]"
          />
          <span className="font-semibold text-sm text-amber-900 flex items-center gap-2">
            ⭐ Featured Suppliers Only
          </span>
        </label>

        {/* DIVIDER */}
        <div className="border-t border-gray-200 my-4" />

        {/* FILTER SECTIONS */}
        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
          
          <FilterSection title="Additive Manufacturing" defaultOpen>
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

        {/* CLEAR FILTERS BUTTON */}
        <button className="w-full mt-4 py-2.5 text-sm font-semibold text-[#0F5B78] border border-[#0F5B78] rounded-md hover:bg-[#0F5B78] hover:text-white transition">
          Clear All Filters
        </button>
      </div>
    </div>
  )
}

/* ---------- FILTER SECTION ---------- */
function FilterSection({ title, children, defaultOpen = false }: any) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border border-gray-200 rounded-md overflow-hidden bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition text-left"
      >
        <span className="font-semibold text-sm text-gray-800">{title}</span>
        <ChevronDown 
          className={`w-4 h-4 text-gray-600 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      {isOpen && children && (
        <div className="px-4 py-3 space-y-2 bg-white border-t border-gray-100">
          {children}
        </div>
      )}
    </div>
  )
}

/* ---------- FILTER ITEM ---------- */
function FilterItem({ label }: { label: string }) {
  return (
    <label className="flex items-start gap-2.5 text-sm text-gray-700 cursor-pointer hover:text-gray-900 transition group">
      <input 
        type="checkbox" 
        className="w-4 h-4 mt-0.5 text-[#0F5B78] border-gray-300 rounded focus:ring-2 focus:ring-[#0F5B78] cursor-pointer"
      />
      <span className="leading-tight group-hover:text-[#0F5B78]">{label}</span>
    </label>
  )
}