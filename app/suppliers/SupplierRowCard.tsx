import Link from "next/link"
import Image from "next/image"
import {
  LucideFacebook,
  LucideLinkedin,
  LucideTwitter,
  LucideYoutube,
} from "lucide-react"

/* ---------------- HELPER ---------------- */
function stripHtml(html: string) {
  if (!html) return ""
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

/* ---------------- COMPONENT ---------------- */
export default function SupplierRowCard({ supplier }: any) {
  const social = supplier.socialLinks || {}

  return (
    <div className="bg-white border border-[#dee2e6] border-[0.8px] rounded-[4px] p-6 flex gap-6">

      {/* LOGO */}
      <div className="w-40 flex items-center justify-center shrink-0">
        {supplier.logoUrl ? (
          <Image
            src={supplier.logoUrl}
            alt={supplier.name}
            width={140}
            height={80}
            className="object-contain"
          />
        ) : (
          <div className="text-gray-400 text-sm">No Logo</div>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* TITLE */}
        <h2 className="text-xl font-bold text-gray-900">
          {supplier.name}
        </h2>

        {supplier.location && (
          <p className="text-sm text-gray-500 mt-1">
            {supplier.location}
          </p>
        )}

        {/* DESCRIPTION (PLAIN TEXT) */}
        <p className="text-sm text-gray-700 mt-2 line-clamp-4">
          {stripHtml(supplier.description)}
        </p>

        {/* FOOTER */}
        <div className="mt-auto pt-6">
          <div className="flex items-end gap-6 flex-wrap">

            {/* LEFT SIDE */}
            <div className="flex items-center gap-8 flex-wrap">

              {/* VIDEO GALLERY */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                  Video Gallery
                </span>
                <span className="w-9 h-9 flex items-center justify-center border border-gray-300">
                  <LucideYoutube className="w-5 h-5 text-red-600" />
                </span>
              </div>

              {/* CONNECT */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                  Connect
                </span>

                {/* FACEBOOK */}
                {social.facebook && (
                  <a
                    href={social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-[#3b5998] flex items-center justify-center hover:opacity-80 transition"
                  >
                    <LucideFacebook className="w-4 h-4 text-white" />
                  </a>
                )}

                {/* LINKEDIN */}
                {social.linkedin && (
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-[#0077b5] flex items-center justify-center hover:opacity-80 transition"
                  >
                    <LucideLinkedin className="w-4 h-4 text-white" />
                  </a>
                )}

                {/* TWITTER */}
                {social.twitter && (
                  <a
                    href={social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-black flex items-center justify-center hover:opacity-80 transition"
                  >
                    <LucideTwitter className="w-4 h-4 text-white" />
                  </a>
                )}

                {/* YOUTUBE */}
                {social.youtube && (
                  <a
                    href={social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-red-600 flex items-center justify-center hover:opacity-80 transition"
                  >
                    <LucideYoutube className="w-4 h-4 text-white" />
                  </a>
                )}
              </div>
            </div>

            {/* RIGHT SIDE CTA */}
            <Link
              href={`/suppliers/${supplier.slug}`}
              className="ml-auto shrink-0 bg-red-700 text-white px-6 py-2 text-sm font-semibold uppercase whitespace-nowrap hover:bg-red-800 transition"
            >
              View Showroom
            </Link>

          </div>
        </div>
      </div>
    </div>
  )
}
