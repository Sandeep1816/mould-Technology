import Header from "../components/Header"
import AdBanner from "../components/AdBanner"
import PassionOnWheels from "../components/PassionOnWheels"
import LatestHero from "../components/LatestHero"
import TrendingAd from "../components/TrendingAd"
import ShopTalkAd from "../components/ShopTalkAd"
import ManufacturingConnected from "../components/ManufacturingConnected"
import BasicsSection from "../components/BasicsSection"
import VideosSection from "../components/VideosSection"
import NewsProductsSection from "../components/NewsProductsSection"
import LatestIssues from "../components/LatestIssues"
import Footer from "../components/Footer"

import type { Post } from "../types/Post"
import TrendingSection from "@/components/TrendingSection"
import CompanyArticles from "@/components/company/CompanyArticles"

export default async function Home() {
// quick fix: ask for many posts
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?limit=1000`, {
  cache: "no-store",
})
  const data = await res.json()
  const posts: Post[] = data.data || data

  if (!Array.isArray(posts) || posts.length === 0) {
    return <div className="text-center p-10">No posts available</div>
  }

  // ✅ Safely get category slug
  const getCategorySlug = (post: Post) =>
    typeof post.category === "object"
      ? post.category?.slug?.toLowerCase()
      : String(post.category || "").toLowerCase()

  // ✅ Group posts by category
  const latestPosts = posts.filter((p) => getCategorySlug(p) === "latest")
  const newsPosts = posts.filter((p) => getCategorySlug(p) === "news")
  const videoPosts = posts.filter((p) => getCategorySlug(p) === "videos")
  const basicsPosts = posts.filter((p) => getCategorySlug(p) === "basics")
  const manufacturingPosts = posts.filter((p) => getCategorySlug(p) === "manufacturing")
  const productPosts = posts.filter((p) => getCategorySlug(p) === "products")

  // ✅ Featured posts
  const latestPost = latestPosts[0]
  const passionPost = posts.find((p) => p.slug !== latestPost?.slug)

  return (
    <>
     
      {/* <Header /> */}
       {/* <AdBanner /> */}
        {/* 📖 Latest Issue1 */}

        <CompanyArticles />
      {/* <LatestIssues /> */}

      {/* 📰 Latest Category Hero */}
      {latestPost && <LatestHero post={latestPost} />}
       <TrendingAd />

      {/* 🚗 Passion / Featured Story */}
      {/* {passionPost && <PassionOnWheels post={passionPost} />} */}

      <TrendingSection />

     

    

      {/* 📘 Basics */}
      <BasicsSection  />

      {/* <ShopTalkAd /> */}
      <TrendingAd />

      {/* 🎥 Videos */}
      <VideosSection />

        {/* 🏭 Manufacturing Section */}
      <ManufacturingConnected posts={manufacturingPosts.slice(0, 4)} />

      <TrendingAd />

     

      {/* 📰 News & Products 2*/}
      {/* <NewsProductsSection
        newsPosts={newsPosts.slice(0, 6)}
        productPosts={productPosts.slice(0, 6)}
      /> */}

      {/* <Footer /> */}
    </>
  )
}
