import VideoGallery from "@/components/VideoGallery"

type Supplier = {
  name: string
  slug: string
  description: string
  website?: string
  logoUrl?: string
  coverImageUrl?: string
  location?: string
  phoneNumber?: string
  email?: string
  tradeNames?: string[]
  videoGallery?: string[]
}

export default async function SupplierShowroomPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/suppliers/${slug}`,
    { cache: "no-store" }
  )

  if (!res.ok) {
    return (
      <div className="p-10 text-center text-gray-600">
        Supplier not found
      </div>
    )
  }

  const supplier: Supplier = await res.json()

  return (
    <div className="bg-[#f5f6f7] min-h-screen">

      {/* ================= HERO ================= */}
      <div className="relative h-[300px] bg-black">
        {supplier.coverImageUrl && (
          <img
            src={supplier.coverImageUrl}
            alt={supplier.name}
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
        )}
      </div>

      {/* ================= MAIN CARD ================= */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 -mt-36">
        <div className="bg-white rounded-lg shadow p-10 border-t-4 border-red-700">

          {/* HEADER */}
          <h1 className="text-3xl font-bold text-center text-[#0b3954]">
            {supplier.name}
          </h1>

          {supplier.location && (
            <p className="text-gray-500 text-center mt-2">
              {supplier.location}
            </p>
          )}

          {/* ================= CONTENT GRID ================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-14 mt-12">

            {/* ========== LEFT COLUMN ========== */}
            <aside className="space-y-8 md:col-span-1">

              {/* LOGO */}
              {supplier.logoUrl && (
                <img
                  src={supplier.logoUrl}
                  alt={supplier.name}
                  className="w-full max-w-[150px] object-contain"
                />
              )}

              {/* CONTACT INFO */}
              <div className="text-sm space-y-2">
                {supplier.website && (
                  <p>
                    <strong>Website:</strong>{" "}
                    <a
                      href={supplier.website}
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      {supplier.website}
                    </a>
                  </p>
                )}

                {supplier.phoneNumber && (
                  <p>
                    <strong>Phone:</strong> {supplier.phoneNumber}
                  </p>
                )}

                {supplier.email && (
                  <p>
                    <strong>Email:</strong>{" "}
                    <a
                      href={`mailto:${supplier.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {supplier.email}
                    </a>
                  </p>
                )}
              </div>

              {/* SOCIAL MEDIA */}
              <div>
                <h4 className="text-sm font-semibold text-gray-600 uppercase mb-3">
                  Connect
                </h4>
                <div className="flex gap-3">
                  <span className="w-9 h-9 bg-gray-800 text-white flex items-center justify-center rounded cursor-pointer">
                    f
                  </span>
                  <span className="w-9 h-9 bg-gray-800 text-white flex items-center justify-center rounded cursor-pointer">
                    in
                  </span>
                  <span className="w-9 h-9 bg-gray-800 text-white flex items-center justify-center rounded cursor-pointer">
                    X
                  </span>
                  <span className="w-9 h-9 bg-gray-800 text-white flex items-center justify-center rounded cursor-pointer">
                    ▶
                  </span>
                </div>
              </div>

              {/* TRADE NAMES */}
              {/* {supplier.tradeNames && supplier.tradeNames.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2 text-sm uppercase text-gray-600">
                    Trade Names
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {supplier.tradeNames.map((name, idx) => (
                      <li key={idx}>{name}</li>
                    ))}
                  </ul>
                </div>
              )} */}
            </aside>

            {/* ========== RIGHT COLUMN ========== */}
           <section className="md:col-span-2">
  <h2 className="font-semibold text-lg mb-4">
    About {supplier.name}
  </h2>

  <div
    className="prose prose-sm max-w-none text-gray-700"
    dangerouslySetInnerHTML={{
      __html: supplier.description,
    }}
  />
</section>

          </div>

          {/* ================= DIVIDER ================= */}
          {supplier.videoGallery && supplier.videoGallery.length > 0 && (
            <>
              <hr className="my-12 border-gray-200" />

              {/* ================= CLAIM / CTA BAR ================= */}
<div className="bg-[#e9f7fb] border border-[#cfeaf3] rounded-md p-6 flex flex-col md:flex-row items-center justify-between gap-4">

  <div className="text-gray-700 font-semibold uppercase tracking-wide">
    Is this your company?
  </div>

  <div className="flex flex-col sm:flex-row gap-4">
    <a
      href="/recruiter/directories"
      className="bg-[#0b5c7a] text-white px-6 py-3 text-sm font-semibold uppercase text-center"
    >
      Update Your Listing
    </a>

    <a
      href="/press-release/submit"
      className="bg-black text-white px-6 py-3 text-sm font-semibold uppercase text-center"
    >
      Submit a Press Release to Our Editorial Teams
    </a>
  </div>
</div>

<br />
<br />


              {/* ================= VIDEO GALLERY ================= */}
              <VideoGallery videos={supplier.videoGallery} />
            </>
          )}


 <hr className="my-12 border-gray-200" />
              {/* TRADE NAMES */}
              {supplier.tradeNames && supplier.tradeNames.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2 text-sm uppercase text-gray-600">
                    Trade Names
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {supplier.tradeNames.map((name, idx) => (
                      <li key={idx}>{name}</li>
                    ))}
                  </ul>
                </div>
              )}

        </div>
      </div>
    </div>
  )
}
