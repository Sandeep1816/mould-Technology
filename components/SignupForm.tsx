"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

type Role = "candidate" | "recruiter"

export default function SignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const urlRole = searchParams.get("role")

  const allowedRoles = useMemo<Role[]>(() => {
    if (urlRole === "recruiter") return ["recruiter"]
    if (urlRole === "candidate") return ["candidate"]
    return ["candidate", "recruiter"]
  }, [urlRole])

  const [role, setRole] = useState<Role>(allowedRoles[0])
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    setRole(allowedRoles[0])
  }, [allowedRoles])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, role }),
        }
      )

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Signup failed")
        return
      }

      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      router.push(
        role === "recruiter"
          ? "/recruiter/onboarding"
          : "/candidate/onboarding"
      )
    } catch {
      setError("Something went wrong. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">

      {/* ROLE BADGE */}
      <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-wide text-[#0073FF] bg-blue-50 px-3 py-1 rounded-full">
        {role === "recruiter" ? "Recruiter Signup" : "Candidate Signup"}
      </span>

      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Create your account
      </h2>

      <p className="text-gray-600 mb-8">
        Join Tooling Trends and get started in minutes.
      </p>

      {error && (
        <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded">
          {error}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>

        {/* ROLE SELECT (only if both allowed) */}
        {allowedRoles.length > 1 && (
          <div className="flex gap-3">
            {allowedRoles.includes("candidate") && (
              <button
                type="button"
                onClick={() => setRole("candidate")}
                className={`flex-1 h-[42px] rounded-md border text-sm font-medium transition ${
                  role === "candidate"
                    ? "bg-[#0073FF] text-white border-[#0073FF]"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                Candidate
              </button>
            )}

            {allowedRoles.includes("recruiter") && (
              <button
                type="button"
                onClick={() => setRole("recruiter")}
                className={`flex-1 h-[42px] rounded-md border text-sm font-medium transition ${
                  role === "recruiter"
                    ? "bg-[#0073FF] text-white border-[#0073FF]"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                Register Company
              </button>
            )}
          </div>
        )}

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full h-[50px] px-4 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0073FF]"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full h-[50px] px-4 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0073FF]"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full h-[52px] bg-[#0073FF] text-white rounded-md font-semibold hover:bg-[#005fe0] transition disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p className="text-center text-sm mt-6 text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-[#0073FF] font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}
