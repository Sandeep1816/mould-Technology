"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react"
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

const PER_PAGE = 15

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/suppliers`)
      .then(res => res.json())
      .then(data => {
        setSuppliers(data)
        setLoading(false)
      })
  }, [])

  // Prevent body scroll when mobile filters are open
  useEffect(() => {
    if (showFilters) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [showFilters])

  const totalPages = Math.ceil(suppliers.length / PER_PAGE)

  const startIndex = (currentPage - 1) * PER_PAGE
  const endIndex = startIndex + PER_PAGE
  const visibleSuppliers = suppliers.slice(startIndex, endIndex)

  // Scroll to top when page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Generate pagination numbers with ellipsis
  const getPaginationNumbers = () => {
    const pages = []
    const showEllipsisStart = currentPage > 3
    const showEllipsisEnd = currentPage < totalPages - 2

    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (showEllipsisStart) {
        pages.push('...')
      }

      // Show pages around current
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (showEllipsisEnd) {
        pages.push('...')
      }

      // Always show last page
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <div className="bg-[#f5f6f7] min-h-screen">

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-4 md:py-6">
        
        {/* MOBILE FILTER BUTTON */}
        <button
          onClick={() => setShowFilters(true)}
          className="lg:hidden fixed bottom-6 right-6 z-40 bg-[#0b3954] text-white p-4 rounded-full shadow-lg flex items-center gap-2 hover:bg-[#0a2f42] transition-colors"
        >
          <SlidersHorizontal size={20} />
          <span className="font-semibold">Filters</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

          {/* LEFT FILTERS - DESKTOP */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <SupplierFilters />
            </div>
          </aside>

          {/* LEFT FILTERS - MOBILE MODAL */}
          {showFilters && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                onClick={() => setShowFilters(false)}
              />
              
              {/* Filter Panel */}
              <div className="fixed inset-y-0 left-0 w-full sm:w-[400px] bg-white z-50 overflow-y-auto lg:hidden">
                <div className="sticky top-0 bg-white border-b px-4 py-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#0b3954]">Filters</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
                <div className="p-4">
                  <SupplierFilters />
                </div>
                <div className="sticky bottom-0 bg-white border-t p-4">
                  <button
                    onClick={() => setShowFilters(false)}
                    className="w-full bg-[#0b3954] text-white py-3 rounded font-semibold hover:bg-[#0a2f42] transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </>
          )}

          {/* CENTER CONTENT */}
          <main className="lg:col-span-6 space-y-4 md:space-y-6">

            {/* HERO */}
            <div className="relative w-full h-[120px] sm:h-[140px] md:h-[160px] rounded-lg overflow-hidden">
              <img
                src="/images/search-landscape.jpg"
                alt="Find a MoldMaking Technology Supplier"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center px-4">
                <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center">
                  Find a MoldMaking Technology Supplier
                </h1>
              </div>
            </div>

            {/* BREADCRUMB */}
            <div className="text-sm text-gray-600">
              <span className="underline cursor-pointer hover:text-gray-800">Home</span>
              <span className="mx-2">›</span>
              <span className="font-medium text-gray-800">
                Find a Supplier
              </span>
            </div>

            {/* SEARCH HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0b3954]">
                  Search Results
                </h2>
                <p className="text-gray-600 mt-1 text-sm md:text-base">
                  {suppliers.length} total supplier{suppliers.length !== 1 ? 's' : ''}
                </p>
              </div>

              <select className="border border-gray-300 px-3 py-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-[#0b3954]">
                <option>Alphabetical</option>
                <option>Most Recent</option>
                <option>Most Popular</option>
              </select>
            </div>

            {/* RESULTS */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0b3954] mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading suppliers...</p>
                </div>
              </div>
            ) : visibleSuppliers.length > 0 ? (
              <div className="space-y-4">
                {visibleSuppliers.map(s => (
                  <SupplierRowCard key={s.id} supplier={s} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-600">No suppliers found.</p>
              </div>
            )}

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 pb-20 lg:pb-6">
                
                {/* Page Info - Mobile */}
                <div className="text-sm text-gray-600 sm:hidden">
                  Page {currentPage} of {totalPages}
                </div>

                {/* Pagination Buttons */}
                <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
                  
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`w-9 h-9 sm:w-10 sm:h-10 border flex items-center justify-center text-sm font-semibold rounded transition-colors
                      ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-[#0b3954] hover:bg-gray-100"
                      }
                    `}
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {/* Page Numbers */}
                  {getPaginationNumbers().map((page, idx) => {
                    if (page === '...') {
                      return (
                        <span key={`ellipsis-${idx}`} className="px-2 text-gray-500">
                          ...
                        </span>
                      )
                    }

                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page as number)}
                        className={`w-9 h-9 sm:w-10 sm:h-10 border text-sm font-semibold rounded transition-colors
                          ${
                            page === currentPage
                              ? "bg-[#0b3954] text-white"
                              : "bg-white text-[#0b3954] hover:bg-gray-100"
                          }
                        `}
                      >
                        {page}
                      </button>
                    )
                  })}

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`w-9 h-9 sm:w-10 sm:h-10 border flex items-center justify-center text-sm font-semibold rounded transition-colors
                      ${
                        currentPage === totalPages
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-[#0b3954] hover:bg-gray-100"
                      }
                    `}
                    aria-label="Next page"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                {/* Page Info - Desktop */}
                <div className="hidden sm:block text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>
              </div>
            )}

          </main>

          {/* RIGHT ADS - DESKTOP */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <SupplierAds />
            </div>
          </aside>

          {/* RIGHT ADS - MOBILE (Below content) */}
          <div className="lg:hidden">
            <SupplierAds />
          </div>
        </div>
      </div>
    </div>
  )
}