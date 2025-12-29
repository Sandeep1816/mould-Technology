"use client"

import { useEffect } from "react"

export default function PostViewCounter({ slug }: { slug: string }) {
  if (!slug) return null

  useEffect(() => {
    const key = `viewed-${slug}`

    if (!sessionStorage.getItem(key)) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/posts/slug/${slug}/view`,
        { method: "POST" }
      )
      sessionStorage.setItem(key, "true")
    }
  }, [slug])

  return null
}
