"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function RecruiterOnboardingPage() {
  const router = useRouter()

  const [fullName, setFullName] = useState("")
  const [headline, setHeadline] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [location, setLocation] = useState("")
  const [website, setWebsite] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    if (user.role !== "recruiter") {
      router.push("/login")
    }
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const token = localStorage.getItem("token")
      const user = JSON.parse(localStorage.getItem("user") || "{}")

      // 1️⃣ Create company
      const companyRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/companies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: companyName,
            website,
            location,
          }),
        }
      )

      if (!companyRes.ok) {
        const data = await companyRes.json()
        setError(data.error || "Failed to create company")
        return
      }

      // 2️⃣ Update recruiter profile
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/recruiters/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            fullName,
            headline,
          }),
        }
      )

      // 3️⃣ Redirect to recruiter dashboard
      router.push("/recruiter/dashboard")
    } catch (err) {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f3f2ef] flex items-center justify-center px-4">
      <div className="bg-white max-w-xl w-full rounded-lg shadow-sm p-8">
        <h1 className="text-2xl font-bold mb-2">
          Let’s set up your recruiter profile
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          This helps candidates trust you and your company
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            required
            placeholder="Your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full h-12 px-4 border rounded"
          />

          <input
            placeholder="Your headline (e.g. Senior Recruiter)"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="w-full h-12 px-4 border rounded"
          />

          <hr />

          <input
            required
            placeholder="Company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full h-12 px-4 border rounded"
          />

          <input
            placeholder="Company website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full h-12 px-4 border rounded"
          />

          <input
            placeholder="Company location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full h-12 px-4 border rounded"
          />

          <button
            disabled={loading}
            className="w-full h-12 bg-[#0073FF] text-white rounded font-medium disabled:opacity-60"
          >
            {loading ? "Setting up..." : "Finish setup"}
          </button>
        </form>
      </div>
    </div>
  )
}
