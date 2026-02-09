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
    <div className="border-t pt-6">
      <h3 className="font-semibold mb-4">
        Apply for this job
      </h3>

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
        className="w-full border rounded p-3 mb-4"
      />

      <button
        onClick={apply}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Applying..." : "Apply"}
      </button>

      {message && (
        <p className="mt-3 text-sm">{message}</p>
      )}
    </div>
  )
}
