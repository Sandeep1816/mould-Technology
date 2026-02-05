import Image from "next/image"
import Link from "next/link"

export default function SupplierAds() {
  return (
    <div className="space-y-6 sticky top-6">

      <Ad src="/images/mmtsub.png" />
      <Ad src="/images/PTXPO26_RegNow.png" />
      <Ad src="/images/MMT-progress.png" />

      {/* 🔥 Recruiter Hiring Ad (with overlay + redirect) */}
      <RecruiterAd src="/images/rec-hiring.png" />

    </div>
  )
}

/* ---------- NORMAL AD ---------- */
function Ad({ src }: { src: string }) {
  return (
    <div className="bg-white">
      <Image
        src={src}
        alt="Advertisement"
        width={300}
        height={600}
        className="w-full object-cover"
      />
    </div>
  )
}

/* ---------- RECRUITER CTA AD ---------- */
function RecruiterAd({ src }: { src: string }) {
  return (
    <Link
      href="/signup?role=recruiter"
      className="relative block group overflow-hidden rounded-none"
    >
      {/* IMAGE */}
      <Image
        src={src}
        alt="Hire Candidates"
        width={300}
        height={600}
        className="w-full object-cover"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition" />

      {/* TEXT CONTENT */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h3 className="text-white text-xl font-bold mb-2">
          Hiring Talent?
        </h3>
        <p className="text-white/90 text-sm mb-4">
          Register your company & post jobs
        </p>

        <span className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-semibold group-hover:bg-indigo-700 transition">
          Hire Candidates
        </span>
      </div>
    </Link>
  )
}
