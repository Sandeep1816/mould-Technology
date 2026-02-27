"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function ApplySection({ jobId }: { jobId: number }) {
  const router = useRouter()
  const [coverNote, setCoverNote] = useState("")
  const [resumeUrl, setResumeUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  async function apply() {
    const user = JSON.parse(localStorage.getItem("user") || "{}")

    // 🔐 AUTH CHECK ONLY HERE
    if (!user?.id) {
      router.push("/signup?role=candidate")
      return
    }

    setLoading(true)
    setMessage("")

    const token = localStorage.getItem("token")

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/applications`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          jobId,
          resumeUrl,
          coverNote,
        }),
      }
    )

    const data = await res.json()

    if (!res.ok) {
      setMessage(data.error || "Failed to apply")
    } else {
      setMessage("✅ Successfully applied!")
    }

    setLoading(false)
  }

return (
  <div>
    <h3 className="text-xl font-semibold mb-6">
      Apply for this job
    </h3>

    <div className="space-y-4">

      <input
        placeholder="Resume URL (optional)"
        value={resumeUrl}
        onChange={(e) => setResumeUrl(e.target.value)}
        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        placeholder="Cover note (optional)"
        value={coverNote}
        onChange={(e) => setCoverNote(e.target.value)}
        rows={4}
        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={apply}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Applying..." : "Apply Now"}
      </button>

      {message && (
        <p className="text-sm mt-3 text-center">
          {message}
        </p>
      )}

    </div>
  </div>
)
}
