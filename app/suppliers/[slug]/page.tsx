import Link from "next/link"

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
      <div className="relative h-[260px] bg-black">
        {supplier.coverImageUrl && (
          <img
            src={supplier.coverImageUrl}
            alt={supplier.name}
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
        )}
      </div>

      {/* ================= MAIN CARD ================= */}
      <div className="max-w-6xl mx-auto px-6 -mt-24">
        <div className="bg-white rounded-lg shadow p-8">

          {/* HEADER */}
          <h1 className="text-3xl font-bold text-gray-900">
            {supplier.name}
          </h1>

          {supplier.location && (
            <p className="text-gray-500 mt-1">
              {supplier.location}
            </p>
          )}

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8">

            {/* ========== LEFT COLUMN ========== */}
            <aside className="space-y-6">

              {/* LOGO */}
              {supplier.logoUrl && (
                <img
                  src={supplier.logoUrl}
                  alt={supplier.name}
                  className="w-full max-w-[220px] object-contain"
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
            </aside>

            {/* ========== RIGHT COLUMN ========== */}
            <section className="md:col-span-2 space-y-8">

              {/* ABOUT */}
              <div>
                <h2 className="font-semibold text-lg mb-2">
                  About {supplier.name}
                </h2>
                <p className="text-sm text-gray-700 whitespace-pre-line">
                  {supplier.description}
                </p>
              </div>

              {/* VIDEO GALLERY */}
              {supplier.videoGallery && supplier.videoGallery.length > 0 && (
                <div>
                  <h2 className="font-semibold text-lg mb-4">
                    Video Gallery
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {supplier.videoGallery.map((url, idx) => {
                      const videoId =
                        url.split("v=")[1]?.split("&")[0] ||
                        url.split("/").pop()

                      return (
                        <iframe
                          key={idx}
                          className="w-full aspect-video rounded border"
                          src={`https://www.youtube.com/embed/${videoId}`}
                          allowFullScreen
                        />
                      )
                    })}
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
