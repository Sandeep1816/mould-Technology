import SupplierAds from "@/components/SupplierAds"
import type { Post } from "@/types/Post"
import Link from "next/link"

export default async function ArticlesPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts?limit=1000`,
    { cache: "no-store" }
  )

  const data = await res.json()
  const posts: Post[] = data.data || data

  const slugOf = (post: Post) =>
    typeof post.category === "object"
      ? post.category?.slug?.toLowerCase()
      : String(post.category || "").toLowerCase()

const getImageUrl = (url?: string | null) => {
  if (!url) return "/placeholder.svg"
  if (url.startsWith("http")) return url

  const base = process.env.NEXT_PUBLIC_API_URL || ""
  return `${base.replace(/\/$/, "")}/${url.replace(/^\//, "")}`
}


  const archivePosts = posts.filter(p => slugOf(p).includes("archive"))
  const inThisIssuePosts = posts.filter(p =>
    slugOf(p).includes("inthisissue")
  )
  const departmentPosts = posts.filter(p =>
    slugOf(p).includes("department")
  )
  const productPosts = posts.filter(p =>
    slugOf(p).includes("product")
  )

  const whatsNewPosts = posts
  .filter(p => !slugOf(p).includes("whatsnew"))
  .slice(0, 5)


  const latestArchive = archivePosts[0]
  const latestIssue = inThisIssuePosts[0]
  const remainingIssues = inThisIssuePosts.slice(1)

  return (
    <main className="bg-white ">
  {/* ================= WHATS NEW SECTION ================= */}
<section className="border-b border-gray-200 bg-white">
  {/* RED STRIP */}
  {/* <div className="bg-[#C70000] text-white text-sm font-bold px-6 py-2 inline-block">
    What&apos;s New and What Works in Mold Manufacturing
  </div> */}

  {/* CONTENT */}
  <div className="max-w-[1320px] mx-auto px-6 py-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {whatsNewPosts.map((post) => (
        <Link
          key={post.id}
          href={`/post/${post.slug}`}
          className="group"
        >
          {/* BADGE + DATE */}
          <div className="flex items-center gap-3 mb-1">
            <span className="bg-[#0072BC] text-white text-[10px] font-bold px-2 py-[2px] uppercase">
              {typeof post.category === "object"
                ? post.category?.name
                : post.category}
            </span>
            <span className="text-xs text-gray-500">
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : ""}
            </span>
          </div>

          {/* TITLE */}
          <p className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-[#C70000]">
            {post.title}
          </p>
        </Link>
      ))}
    </div>
  </div>
</section>





{/* ================= TOP SPLIT SECTION ================= */}
<section className="bg-[#E9ECEF]">
  <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-[420px_1fr]">

    {/* LEFT – LATEST ISSUE */}
    {latestArchive && (
      <div className="p-10 flex flex-col justify-center">
        <h2 className="text-[28px] font-bold text-[#003B5C] mb-8">
          Latest Issue
        </h2>

        <img
          src={getImageUrl(latestArchive.imageUrl)}
          alt={latestArchive.title}
          className="w-[220px] shadow-xl mb-6"
        />

        <p className="text-[#003B5C] font-semibold mb-2">
          January 2026
        </p>

        <span className="inline-block bg-[#C70000] text-white text-xs font-bold px-3 py-2 w-fit">
          DIGITAL EDITION
        </span>
      </div>
    )}

    {/* RIGHT – COVER STORY */}
    {latestIssue && (
      <div className="relative h-[520px]">
        <img
          src={getImageUrl(latestIssue.imageUrl)}
          alt={latestIssue.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/50" />

        {/* CONTENT */}
        <div className="absolute bottom-0 left-0 p-10 max-w-3xl text-white">
          <span className="inline-block bg-[#0072BC] text-xs font-bold px-3 py-1 mb-4">
            COVER STORY
          </span>

          <h1 className="text-[28px] font-bold leading-snug mb-3">
            {latestIssue.title}
          </h1>

          <p className="text-sm text-gray-200 mb-4">
            {latestIssue.excerpt ||
              latestIssue.content
                ?.replace(/<[^>]+>/g, "")
                .slice(0, 160) + "..."}
          </p>

          <Link
            href={`/post/${latestIssue.slug}`}
            className="text-[#C70000] font-bold uppercase text-sm"
          >
            Read More →
          </Link>
        </div>
      </div>
    )}
  </div>

  {/* BOTTOM NAV */}
  <div className="bg-[#003B5C]">
    <div className="max-w-[1320px] mx-auto flex gap-10 px-10 py-4 text-white text-sm font-semibold">
      <Link href="/features">FEATURES</Link>
      <Link href="/columns">COLUMNS</Link>
      <Link href="/archive">ARCHIVE</Link>
    </div>
  </div>
</section>


 {/* ================= REMAINING IN THIS ISSUE ================= */}
<section className="max-w-[1320px] mx-auto px-6 py-14">
  <h2 className="text-[32px] font-bold text-[#003B5C] mb-10">
    In this Issue
  </h2>

  <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
    {/* LEFT – ISSUE ARTICLES */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14">
      {remainingIssues.map((post) => (
        <article key={post.id}>
          {/* IMAGE */}
          <img
            src={getImageUrl(post.imageUrl)}
            alt={post.title}
            className="w-full aspect-[16/9] object-cover rounded mb-4"
          />

          {/* BADGE + DATE */}
          <div className="flex items-center gap-4 mb-3">
            <span className="bg-[#0072BC] text-white text-xs font-bold px-3 py-1 uppercase">
              {typeof post.category === "object"
                ? post.category?.name
                : post.category}
            </span>
            <span className="text-xs text-gray-500">
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : ""}
            </span>
          </div>

          {/* TITLE */}
          <h3 className="text-[20px] font-bold leading-snug mb-2">
            {post.title}
          </h3>

          {/* EXCERPT */}
          <p className="text-gray-600 text-[15px] leading-relaxed mb-3">
            {post.excerpt ||
              post.content
                ?.replace(/<[^>]+>/g, "")
                .slice(0, 140) + "..."}
          </p>

          {/* CTA */}
          <Link
            href={`/post/${post.slug}`}
            className="text-[#C70000] font-bold text-sm uppercase"
          >
            Read More →
          </Link>
        </article>
      ))}
    </div>

    {/* RIGHT – ADS */}
    <aside className="space-y-6">
      {/* <img src="/advertisement-banner.jpg" className="w-full border" />
      <img src="/advertisement-banner.jpg" className="w-full border" />
      <img src="/advertisement-banner.jpg" className="w-full border" /> */}
      <SupplierAds />
    </aside>
  </div>
</section>




      {/* ================= DEPARTMENTS & PRODUCTS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-10 bg-[#F7F7F7]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          <div>
            <h3 className="text-xl font-bold mb-6">Departments</h3>
            {departmentPosts.map(p => (
              <div
                key={p.id}
                className="border-b py-4 flex justify-between items-center"
              >
                <span className="font-semibold">{p.title}</span>
                <Link
                  href={`/post/${p.slug}`}
                  className="text-[#C70000] text-sm font-bold"
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Products</h3>
            {productPosts.map(p => (
              <div
                key={p.id}
                className="border-b py-4 flex justify-between items-center"
              >
                <span className="font-semibold">{p.title}</span>
                <Link
                  href={`/post/${p.slug}`}
                  className="text-[#C70000] text-sm font-bold"
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

       {/* ================= TOPMOUNT ADVERTISEMENT ================= */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <img src="/images/topmount.png" className="w-full border" />
      </section>


      {/* ================= ARCHIVE GRID ================= */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-[#003B5C] mb-8">
          Archive
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {archivePosts.map(post => (
            <div key={post.id} className="text-center">
              <img
                src={getImageUrl(post.imageUrl)}
                className="w-full mb-4 border bg-white"
                alt={post.title}
              />
              <p className="font-semibold mb-2">{post.title}</p>
              <Link
                href={`/post/${post.slug}`}
                className="text-[#C70000] text-sm font-bold uppercase"
              >
                Read Now →
              </Link>
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}
