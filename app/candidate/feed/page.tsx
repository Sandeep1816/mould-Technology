"use client"
import Image from "next/image"
import Link from "next/link"
import { useCandidateGuard } from "@/lib/useCandidateGuard"
import JobFeed from "@/components/job/JobFeed"

export default function CandidateFeedPage() {
  // 🔐 Candidate-only page
  useCandidateGuard()

  return (
    <div className="bg-[#f3f2ef] min-h-screen lg:h-screen lg:overflow-hidden scrollbar-hide">
      <div className="max-w-[1200px] mx-auto px-4 py-6 grid grid-cols-12 gap-6 lg:h-full">

        {/* ================= LEFT SIDEBAR ================= */}
        <aside className="col-span-12 lg:col-span-3 space-y-4 lg:sticky lg:top-6 self-start">

          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="h-16 bg-gradient-to-r from-blue-600 to-indigo-600" />
            <div className="flex flex-col items-center -mt-8 pb-4">
              <div className="relative w-16 h-16">
  <Image
    src="https://i.pravatar.cc/100"
    alt="Profile"
    fill
    className="rounded-full border-2 border-white object-cover"
    sizes="64px"
  />
</div>
              <h3 className="font-semibold mt-2">Candidate</h3>
              <p className="text-xs text-gray-500">
                Aspiring Professional
              </p>
            </div>

            <div className="border-t px-4 py-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">
                  Profile viewers
                </span>
                <span className="text-blue-600 font-medium">
                  24
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 text-sm space-y-2">
            <p className="font-medium">Quick links</p>
            <p className="text-gray-600">Saved jobs</p>
            <Link
              href="/candidate/applications"
              className="text-gray-600 hover:underline block"
            >
              My applications
            </Link>
            <p className="text-gray-600">Job alerts</p>
          </div>
        </aside>

        {/* ================= FEED ================= */}
        <main className="col-span-12 lg:col-span-6 space-y-4 lg:overflow-y-auto scrollbar-hide lg:h-full pr-2">

          {/* SEARCH BAR (unchanged UI) */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-3">
             <div className="relative w-10 h-10">
  <Image
    src="https://i.pravatar.cc/40"
    alt="User"
    fill
    className="rounded-full object-cover"
    sizes="40px"
  />
</div>
              <input
                disabled
                placeholder="Search jobs, companies, locations"
                className="flex-1 border rounded-full px-4 py-2 text-sm bg-gray-50"
              />
            </div>
          </div>

          {/* 🔥 REUSED COMPONENT */}
          <JobFeed />

        </main>

        {/* ================= RIGHT SIDEBAR ================= */}
        <aside className="col-span-12 lg:col-span-3 space-y-4 lg:sticky lg:top-6 self-start">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h4 className="font-semibold mb-3">
              Job Market News
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <p className="font-medium">
                  Hiring increases in tech
                </p>
                <p className="text-xs text-gray-500">
                  2h ago · 4,200 readers
                </p>
              </li>
              <li>
                <p className="font-medium">
                  Remote jobs still trending
                </p>
                <p className="text-xs text-gray-500">
                  4h ago · 2,100 readers
                </p>
              </li>
              <li>
                <p className="font-medium">
                  Interview tips for 2026
                </p>
                <p className="text-xs text-gray-500">
                  1d ago · 6,800 readers
                </p>
              </li>
            </ul>
          </div>
        </aside>

      </div>
    </div>
  )
}
