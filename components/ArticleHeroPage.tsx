import LatestHero from "@/components/ArticleHeroPage"

export default function ArticleHeroPage() {
  return (
    <main className="min-h-screen bg-white">
      <LatestHero
        date="7 NOV 2025"
        title="Passion on Wheels: Who Will Carry Charlie's Torch?"
        description="As Charlie Harris prepares to hand off his mission, who in the moldmaking community will keep his spirit of tool-sharing alive?"
        readMoreLink="/article/charlies-torch"
        imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-m81vYDjmcqgnqv8kXzHRmpkMOn90at.png"
        imageAlt="Moldmaking machine at work"
      />
    </main>
  )
}
