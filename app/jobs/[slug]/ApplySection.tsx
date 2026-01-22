"use client"

import { useState } from "react"

export function ApplySection({ jobId }: { jobId: number }) {
  const [coverNote, setCoverNote] = useState("")
  const [resumeUrl, setResumeUrl] = useState("") // ✅ NEW
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  async function apply() {
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
          resumeUrl, // ✅ SENT
          coverNote, // ✅ SENT
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
    <div id="apply" className="border-t pt-6">
      <h3 className="font-semibold mb-2">Apply for this job</h3>

      {/* Resume URL (temporary, until Cloudinary) */}
      <input
        placeholder="Resume URL (optional)"
        value={resumeUrl}
        onChange={(e) => setResumeUrl(e.target.value)}
        className="w-full border rounded p-3 mb-3"
      />

      <textarea
        placeholder="Cover note (optional)"
        value={coverNote}
        onChange={(e) => setCoverNote(e.target.value)}
        className="w-full border rounded p-3 mb-3"
      />

      <button
        disabled={loading}
        onClick={apply}
        className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Applying..." : "Apply"}
      </button>

      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  )
}
