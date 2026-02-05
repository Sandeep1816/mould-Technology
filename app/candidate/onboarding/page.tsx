"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function CandidateOnboardingPage() {
  const router = useRouter()

  const [fullName, setFullName] = useState("")
  const [currentRole, setCurrentRole] = useState("")
  const [headline, setHeadline] = useState("")
  const [experienceLevel, setExperienceLevel] = useState("")
  const [skills, setSkills] = useState("")
  const [location, setLocation] = useState("")
  const [about, setAbout] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}")

    if (!user || user.role !== "candidate") {
      router.push("/login")
    }
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const token = localStorage.getItem("token")

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/candidates/onboarding`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            fullName,
            currentRole,
            headline,
            experienceLevel,
            skills: skills.split(",").map(s => s.trim()),
            location,
            about,
          }),
        }
      )

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Onboarding failed")
        return
      }

      const updatedUser = JSON.parse(localStorage.getItem("user") || "{}")
      updatedUser.isOnboarded = true
      localStorage.setItem("user", JSON.stringify(updatedUser))

      router.push("/candidate/feed")
    } catch {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f3f2ef] flex items-center justify-center px-4">
      <div className="bg-white max-w-xl w-full rounded-lg shadow p-8">

        <h1 className="text-2xl font-bold mb-1">
          Set up your candidate profile
        </h1>
        <p className="text-gray-600 mb-6">
          This helps recruiters discover you faster
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            required
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full h-12 px-4 border rounded"
          />

          <input
            required
            placeholder="Current role (e.g. Tooling Engineer)"
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value)}
            className="w-full h-12 px-4 border rounded"
          />

          <input
            placeholder="Headline (short professional summary)"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="w-full h-12 px-4 border rounded"
          />

          <select
            required
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            className="w-full h-12 px-4 border rounded"
          >
            <option value="">Experience level</option>
            <option value="fresher">Fresher</option>
            <option value="1-3">1–3 years</option>
            <option value="3-5">3–5 years</option>
            <option value="5+">5+ years</option>
          </select>

          <input
            required
            placeholder="Skills (comma separated)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full h-12 px-4 border rounded"
          />

          <input
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full h-12 px-4 border rounded"
          />

          <textarea
            placeholder="About you"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full h-28 px-4 py-2 border rounded"
          />

          <button
            disabled={loading}
            className="w-full h-12 bg-[#0073FF] text-white rounded font-medium"
          >
            {loading ? "Setting up..." : "Finish setup"}
          </button>
        </form>
      </div>
    </div>
  )
}
