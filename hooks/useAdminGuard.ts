"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function useAdminGuard(): boolean {
  const router = useRouter()
  const [checking, setChecking] = useState(true)
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userRaw = localStorage.getItem("user")

    if (!token || !userRaw) {
      router.replace("/admin/login")
      return
    }

    const user = JSON.parse(userRaw)

    if (user.role !== "admin") {
      router.replace("/unauthorized")
      return
    }

    setAllowed(true)
    setChecking(false)
  }, [router])

  if (checking) return false
  return allowed
}
