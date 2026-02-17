"use client"

import { useState } from "react"

export default function CreateRecruiter() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    companyId: "",
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const token = localStorage.getItem("token")

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/create-recruiter`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      }
    )

    if (res.ok) {
      alert("Recruiter created successfully")
    } else {
      alert("Error creating recruiter")
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Create Recruiter</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="input"
        />
        <input
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="input"
        />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="input"
        />
        <input
          placeholder="Company ID"
          onChange={(e) => setForm({ ...form, companyId: e.target.value })}
          className="input"
        />

        <button className="btn-primary">Create Recruiter</button>
      </form>
    </div>
  )
}
