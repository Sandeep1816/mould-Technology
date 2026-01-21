"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginForm() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      )

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Login failed")
        return
      }

      // 🔐 Save token & user
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      // 🔁 Redirect by role
      if (data.user.role === "admin") {
        router.push("/admin/dashboard")
      } else if (data.user.role === "recruiter") {
        router.push("/recruiter/jobs")
      } else {
        router.push("/candidate/feed")
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
        Login
      </h2>

      {error && (
        <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded">
          {error}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
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

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            Remember me
          </label>

          <Link href="/forgot-password" className="text-[#0073FF]">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-[52px] bg-[#0073FF] text-white rounded-md font-medium hover:bg-[#005fe0] transition disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Social (UI only for now) */}
        <div className="flex justify-center gap-4">
          {["facebook", "instagram", "x", "linkedin"].map((s) => (
            <div
              key={s}
              className="w-10 h-10 flex items-center justify-center rounded bg-gray-100 cursor-pointer hover:bg-gray-200"
            >
              <i className={`ri-${s}-fill`} />
            </div>
          ))}
        </div>

        <p className="text-center text-sm mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[#0073FF]">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  )
}
