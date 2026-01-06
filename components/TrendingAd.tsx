export default function TrendingAd() {
  return (
    /* 🔹 section-space = 80px top & bottom */
    <section className="py-[80px] w-full bg-[#F7F7F7]">
      {/* 🔹 Nerio container */}
      <div className="max-w-[1320px] mx-auto px-[12px]">
        <p className="text-center text-[#616C74] text-sm mb-4">
          Advertisement
        </p>

        {/* 🔹 Banner wrapper (no extra max-widths) */}
        <div className="rounded-xl overflow-hidden">
          <img
            src="/trending-ad.jpg"
            alt="Trending Advertisement"
            className="w-full h-[218px] object-cover"
          />
        </div>
      </div>
    </section>
  )
}
