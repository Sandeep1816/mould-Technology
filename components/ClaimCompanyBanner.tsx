"use client"

import Link from "next/link"

export default function ClaimCompanyBanner() {
  return (
    <div className="mt-12">
      <div className="bg-[#e6f0f3] border border-gray-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-4">

          {/* Left Text */}
          <div className="text-gray-700 font-semibold tracking-wide uppercase text-sm">
            Is this your company?
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">

            <Link
              href="/login"
              className="bg-[#0b3954] text-white px-6 py-2 text-sm font-semibold uppercase text-center hover:bg-[#092f46] transition"
            >
              Update Your Listing
            </Link>

            <Link
              href="/login"
              className="bg-black text-white px-6 py-2 text-sm font-semibold uppercase text-center hover:bg-gray-900 transition"
            >
              Submit a Press Release to Our Editorial Teams
            </Link>

          </div>
        </div>
      </div>
    </div>
  )
}