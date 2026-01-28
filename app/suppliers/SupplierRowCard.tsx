import Link from "next/link"
import Image from "next/image"
import {
  LucideFacebook,
  LucideLinkedin,
  LucideTwitter,
  LucideYoutube,
} from "lucide-react"

export default function SupplierRowCard({ supplier }: any) {
  return (
    <div className="bg-white border rounded-lg p-6 flex gap-6">

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
      <div className="flex-1 flex flex-col">

        {/* TITLE */}
        <h2 className="text-xl font-bold text-gray-900">
          {supplier.name}
        </h2>

        {supplier.location && (
          <p className="text-sm text-gray-500 mt-1">
            {supplier.location}
          </p>
        )}

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-700 mt-2 line-clamp-4">
          {supplier.description}
        </p>

        {/* FOOTER */}
        <div className="mt-auto pt-6">

          <div className="flex items-end gap-6 flex-wrap">

            {/* LEFT SIDE: VIDEO + CONNECT */}
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

                <span className="w-9 h-9 bg-[#3b5998] flex items-center justify-center">
                  <LucideFacebook className="w-4 h-4 text-white" />
                </span>

                <span className="w-9 h-9 bg-[#0077b5] flex items-center justify-center">
                  <LucideLinkedin className="w-4 h-4 text-white" />
                </span>

                <span className="w-9 h-9 bg-black flex items-center justify-center">
                  <LucideTwitter className="w-4 h-4 text-white" />
                </span>

                <span className="w-9 h-9 bg-red-600 flex items-center justify-center">
                  <LucideYoutube className="w-4 h-4 text-white" />
                </span>
              </div>
            </div>

            {/* RIGHT SIDE: CTA */}
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
