"use client"

import { useState, useEffect } from "react"
import EventRegistrationForm from "@/components/EventRegistrationForm"

interface Props {
  slug: string
}

export default function EventRegisterModal({ slug }: Props) {
  const [open, setOpen] = useState(false)

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [open])

  // ESC close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-block bg-[#0A2B57] text-white px-8 py-3 font-semibold hover:bg-[#061D3D] transition rounded-lg"
      >
        REGISTER NOW
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">

          <div className="relative bg-white w-full max-w-4xl rounded-2xl p-8 shadow-2xl">

            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>

            <EventRegistrationForm slug={slug} />

          </div>
        </div>
      )}
    </>
  )
}
