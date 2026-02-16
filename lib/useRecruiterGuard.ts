// "use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"

// export function useRecruiterGuard(): boolean {
//   const router = useRouter()
//   const [checking, setChecking] = useState(true)
// const [allowed, setAllowed] = useState(false)

// useEffect(() => {
//   const token = localStorage.getItem("token")
//   const userRaw = localStorage.getItem("user")

//   if (!token || !userRaw) {
//     router.replace("/login")
//     return
//   }

//   const user = JSON.parse(userRaw)

//   if (user.role !== "recruiter") {
//     router.replace("/")
//     return
//   }

//   setAllowed(true)
//   setChecking(false)
// }, [])

// if (checking) return false
// return allowed

// }


"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function useRecruiterGuard(): boolean {
  const router = useRouter()
  const [allowed, setAllowed] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userRaw = localStorage.getItem("user")

    if (!token || !userRaw) {
      router.replace("/login")
      setChecking(false)
      return
    }

    let user = null

    try {
      user = JSON.parse(userRaw)
    } catch {
      console.error("Corrupted user JSON. Clearing storage.")
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      router.replace("/login")
      setChecking(false)
      return
    }

    if (user?.role !== "recruiter") {
      router.replace("/")
      setChecking(false)
      return
    }

    setAllowed(true)
    setChecking(false)
  }, [router])

  if (checking) return false
  return allowed
}

