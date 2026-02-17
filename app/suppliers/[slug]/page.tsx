import CompanyArticlesCarousel from "@/components/CompanyArticlesCarousel"
import VideoGallery from "@/components/VideoGallery"
import SocialLinksTracker from "@/components/SocialLinksTracker"
import {
  LucideFacebook,
  LucideLinkedin,
  LucideTwitter,
  LucideYoutube,
} from "lucide-react"

/* ================= TYPES ================= */

type Article = {
  id: number
  title: string
  slug: string
  excerpt?: string | null
  imageUrl?: string | null
  publishedAt: string
}

type Supplier = {
  id: number
  companyId: number
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
  socialLinks?: {
    facebook?: string
    linkedin?: string
    twitter?: string
    youtube?: string
  }
}

/* ================= PAGE ================= */

export default async function SupplierShowroomPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  /* ---------- FETCH SUPPLIER ---------- */
  const supplierRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/suppliers/${slug}`,
    { cache: "no-store" }
  )

  if (!supplierRes.ok) {
    return (
      <div className="p-10 text-center text-gray-600">
        Supplier not found
      </div>
    )
  }

  const supplier: Supplier = await supplierRes.json()
  const social = supplier.socialLinks || {}

  /* ---------- FETCH COMPANY ARTICLES ---------- */
  const articlesRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/companies/${supplier.companyId}/articles`,
    { cache: "no-store" }
  )

  let articles: Article[] = []
  if (articlesRes.ok) {
    articles = await articlesRes.json()
  }

  /* ================= UI ================= */

  return (
    <div className="bg-[#f5f6f7] min-h-screen">

      {/* HERO */}
      <div className="relative h-[300px] bg-black">
        {supplier.coverImageUrl && (
          <img
            src={supplier.coverImageUrl}
            alt={supplier.name}
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
        )}
      </div>

      {/* MAIN CARD */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 -mt-36">
        <div className="bg-white rounded-lg shadow p-10 border-t-4 border-red-700">

          <h1 className="text-3xl font-bold text-center text-[#0b3954]">
            {supplier.name}
          </h1>

          {supplier.location && (
            <p className="text-gray-500 text-center mt-2">
              {supplier.location}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-14 mt-12">

            {/* LEFT */}
            <aside className="space-y-8 md:col-span-1">

              {supplier.logoUrl && (
                <img
                  src={supplier.logoUrl}
                  alt={supplier.name}
                  className="w-full max-w-[150px] object-contain"
                />
              )}

              {/* CONTACT */}
              <div className="text-sm space-y-2">
                <p>{supplier.tradeNames}</p>
                <p>{supplier.phoneNumber}</p>
                <p>{supplier.email}</p>
                {supplier.website && (
                  <p>
                    <strong>Website:</strong>{" "}
                    <a
                      href={supplier.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {supplier.website}
                    </a>
                  </p>
                )}
              </div>

              {/* SOCIAL (TRACKED) */}
              {(social.facebook ||
                social.linkedin ||
                social.twitter ||
                social.youtube) && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 uppercase mb-3">
                    Connect
                  </h4>

                  <SocialLinksTracker supplierId={supplier.id}>
                    <div className="flex gap-3">
                      {social.facebook && (
                        <a href={social.facebook} target="_blank">
                          <LucideFacebook className="w-5 h-5 text-[#3b5998]" />
                        </a>
                      )}
                      {social.linkedin && (
                        <a href={social.linkedin} target="_blank">
                          <LucideLinkedin className="w-5 h-5 text-[#0077b5]" />
                        </a>
                      )}
                      {social.twitter && (
                        <a href={social.twitter} target="_blank">
                          <LucideTwitter className="w-5 h-5" />
                        </a>
                      )}
                      {social.youtube && (
                        <a href={social.youtube} target="_blank">
                          <LucideYoutube className="w-5 h-5 text-red-600" />
                        </a>
                      )}
                    </div>
                  </SocialLinksTracker>
                </div>
              )}
            </aside>

            {/* RIGHT */}
            <section className="md:col-span-2">
              {/* <h2 className="font-semibold text-lg mb-4">
                About {supplier.name}
              </h2> */}

              <div
                className="prose prose-sm max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: supplier.description }}
              />
            </section>
          </div>

          {supplier.videoGallery?.length > 0 && (
            <>
              <hr className="my-12" />
              <VideoGallery videos={supplier.videoGallery} />
            </>
          )}

          {articles.length > 0 && (
            <>
              <hr className="my-12" />
              <CompanyArticlesCarousel articles={articles} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
