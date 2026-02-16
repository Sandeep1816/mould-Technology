// "use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"

// export function useAdminGuard(): boolean {
//   const router = useRouter()
//   const [checking, setChecking] = useState(true)
//   const [allowed, setAllowed] = useState(false)

//   useEffect(() => {
//     const token = localStorage.getItem("token")
//     const userRaw = localStorage.getItem("user")

//     if (!token || !userRaw) {
//       router.replace("/admin/login")
//       return
//     }

//     const user = JSON.parse(userRaw)

//     if (user.role !== "admin") {
//       router.replace("/unauthorized")
//       return
//     }

//     setAllowed(true)
//     setChecking(false)
//   }, [router])

//   if (checking) return false
//   return allowed
// }


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

    if (!token || !userRaw || userRaw === "undefined") {
      localStorage.clear()
      router.replace("/admin/login")
      setChecking(false)
      return
    }

    let user = null

    try {
      user = JSON.parse(userRaw)
    } catch {
      console.error("Invalid admin JSON")
      localStorage.clear()
      router.replace("/admin/login")
      setChecking(false)
      return
    }

    if (user?.role !== "admin") {
      router.replace("/unauthorized")
      setChecking(false)
      return
    }

    setAllowed(true)
    setChecking(false)
  }, [router])

  if (checking) return false
  return allowed
}
