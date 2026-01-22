"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function useCandidateGuard() {
  const router = useRouter()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}")

    if (!user.id) {
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
  }, [])
}
