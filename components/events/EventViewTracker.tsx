"use client"

import { useEffect } from "react"

export default function EventViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/events/${slug}/view`,
      { method: "POST" }
    )
  }, [slug])

  return null
}
