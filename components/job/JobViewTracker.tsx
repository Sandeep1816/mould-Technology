"use client"

import { useEffect } from "react"

export default function JobViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${slug}/view`,
      { method: "POST" }
    )
  }, [slug])

  return null
}
