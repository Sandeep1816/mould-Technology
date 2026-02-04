"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SignupForm() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"candidate" | "recruiter">("candidate")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

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
          body: JSON.stringify({
            email,
            password,
            role,
          }),
        }
      )

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Signup failed")
        return
      }

      // ✅ Save token & user
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      // ✅ Redirect to onboarding (LinkedIn style)
      if (data.user.role === "recruiter") {
        router.push("/recruiter/onboarding")
      } else {
        router.push("/candidate/onboarding")
      }
    } catch (err) {
      setError("Something went wrong. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-semibold mb-8 text-center">
        Sign Up
      </h2>

      {error && (
        <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded">
          {error}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>

        {/* ROLE SELECT */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setRole("candidate")}
            className={`flex-1 h-[44px] rounded-md border text-sm font-medium ${
              role === "candidate"
                ? "bg-[#0073FF] text-white border-[#0073FF]"
                : "bg-white text-gray-600"
            }`}
          >
            Candidate
          </button>

          <button
            type="button"
            onClick={() => setRole("recruiter")}
            className={`flex-1 h-[44px] rounded-md border text-sm font-medium ${
              role === "recruiter"
                ? "bg-[#0073FF] text-white border-[#0073FF]"
                : "bg-white text-gray-600"
            }`}
          >
            Register Company
          </button>
        </div>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full h-[52px] px-4 rounded-md border border-gray-200 focus:outline-none focus:border-[#0073FF]"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full h-[52px] px-4 rounded-md border border-gray-200 focus:outline-none focus:border-[#0073FF]"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full h-[52px] bg-[#0073FF] text-white rounded-md font-medium hover:bg-[#005fe0] transition disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-[#0073FF]">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}
