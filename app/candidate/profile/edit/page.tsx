"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type Profile = {
  email: string
  username: string
  fullName?: string
  headline?: string
  about?: string
  location?: string
  avatarUrl?: string
  websiteUrl?: string
}

export default function EditCandidateProfilePage() {
  const router = useRouter()

  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  // 🔹 Load profile
  useEffect(() => {
    fetch("/api/candidates/me", { credentials: "include" })
      .then(res => res.json())
      .then(setProfile)
      .finally(() => setLoading(false))
  }, [])

  // 🔹 Upload avatar to Cloudinary
  async function handleAvatarUpload(file: File) {
    if (!file) return

    setUploading(true)

    const formData = new FormData()
    formData.append("image", file)

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()

    if (data.imageUrl) {
      setProfile(prev =>
        prev ? { ...prev, avatarUrl: data.imageUrl } : prev
      )
    }

    setUploading(false)
  }

  // 🔹 Save profile
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!profile) return

    setSaving(true)

    await fetch("/api/candidates/me", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(profile),
    })

    setSaving(false)
    router.push("/candidate/feed")
  }

  if (loading || !profile) {
    return <p className="p-6">Loading…</p>
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* ================= AVATAR ================= */}
        <div className="flex items-center gap-4">
          <img
            src={profile.avatarUrl || "https://i.pravatar.cc/100"}
            className="w-20 h-20 rounded-full object-cover border"
            alt="Avatar"
          />

          <label className="text-sm cursor-pointer">
            <span className="text-blue-600 hover:underline">
              {uploading ? "Uploading..." : "Change avatar"}
            </span>
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={e =>
                e.target.files && handleAvatarUpload(e.target.files[0])
              }
            />
          </label>
        </div>

        {/* ================= READ ONLY ================= */}
        <div>
          <label className="text-sm text-gray-500">Email</label>
          <input
            value={profile.email}
            disabled
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="text-sm text-gray-500">Username</label>
          <input
            value={profile.username}
            disabled
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        {/* ================= EDITABLE ================= */}
        <input
          placeholder="Full name"
          value={profile.fullName || ""}
          onChange={e =>
            setProfile({ ...profile, fullName: e.target.value })
          }
          className="w-full border px-3 py-2 rounded"
        />

        <input
          placeholder="Headline"
          value={profile.headline || ""}
          onChange={e =>
            setProfile({ ...profile, headline: e.target.value })
          }
          className="w-full border px-3 py-2 rounded"
        />

        <input
          placeholder="Location"
          value={profile.location || ""}
          onChange={e =>
            setProfile({ ...profile, location: e.target.value })
          }
          className="w-full border px-3 py-2 rounded"
        />

        <input
          placeholder="Website URL"
          value={profile.websiteUrl || ""}
          onChange={e =>
            setProfile({ ...profile, websiteUrl: e.target.value })
          }
          className="w-full border px-3 py-2 rounded"
        />

        <textarea
          placeholder="About you"
          rows={5}
          value={profile.about || ""}
          onChange={e =>
            setProfile({ ...profile, about: e.target.value })
          }
          className="w-full border px-3 py-2 rounded"
        />

        <button
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  )
}
