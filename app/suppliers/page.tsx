import SupplierFilters from "@/components/suppliers/SupplierFilters"
import SupplierList from "@/components/suppliers/SupplierList"
import SupplierAds from "@/components/suppliers/SupplierAds"
import { Supplier } from "@/types/Supplier"
import type { Post } from "@/types/Post"

export default async function SuppliersPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts?limit=1000`,
    { cache: "no-store" }
  )

  const data = await res.json()
  const posts: Post[] = data.data || data

  const getCategorySlug = (post: Post) =>
    typeof post.category === "object"
      ? post.category?.slug?.toLowerCase()
      : String(post.category || "").toLowerCase()

  // ✅ FILTER SUPPLIER BLOGS
  const supplierPosts: Supplier[] = posts
    .filter((p) => getCategorySlug(p).includes("supplier"))
    .map((p) => ({
      id: p.id,
      name: p.title,
      description: p.excerpt || p.content?.slice(0, 200) || "",
      logo: p.imageUrl
        ? p.imageUrl.startsWith("http")
          ? p.imageUrl
          : `${process.env.NEXT_PUBLIC_API_URL}${p.imageUrl}`
        : undefined,

      // ✅ SAFE FALLBACKS (NO TS ERRORS)
      location: "",
      socials: {},
    }))

  return (
    <main className="max-w-7xl mx-auto px-6 py-6">
      {/* Hero */}
      <div className="relative mb-6">
        <img
          src="/suppliers-hero.jpg"
          className="w-full h-[160px] object-cover"
        />
        <h1 className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold">
          Find a MoldMaking Technology Supplier
        </h1>
      </div>

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        Home <span className="mx-1">›</span> Find a Supplier
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_300px] gap-8">
        <SupplierFilters />
        <SupplierList suppliers={supplierPosts} />
        <SupplierAds />
      </div>
    </main>
  )
}
