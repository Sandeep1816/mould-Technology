"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export function useCandidateGuard() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // ✅ Allow public job pages
    if (pathname.startsWith("/jobs")) return

    const raw = localStorage.getItem("user")
    if (!raw) {
      router.push("/login")
      return
    }

    const user = JSON.parse(raw)

    if (!user?.id) {
      router.push("/login")
      return
    }

    if (user.role !== "candidate") {
      router.push("/")
      return
    }

    if (!user.isOnboarded) {
      router.push("/candidate/onboarding")
    }
  }, [pathname, router])
}
