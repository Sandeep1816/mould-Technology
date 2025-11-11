"use client"

import Link from "next/link"

export default function ShareSection() {
  const shareButtons = [
    { icon: "ri-facebook-fill", label: "Facebook", href: "#" },
    { icon: "ri-linkedin-fill", label: "LinkedIn", href: "#" },
    { icon: "ri-twitter-x-fill", label: "Twitter", href: "#" },
    { icon: "ri-mail-fill", label: "Email", href: "#" },
    { icon: "ri-whatsapp-fill", label: "WhatsApp", href: "#" },
    { icon: "ri-printer-fill", label: "Print", href: "#" },
  ]

  return (
    <div className="flex items-center gap-3 mt-10 border-t border-gray-200 pt-4">
      <span className="text-gray-600 font-semibold uppercase text-xs tracking-widest">Share:</span>
      <div className="flex gap-2">
        {shareButtons.map((btn) => (
          <Link
            key={btn.label}
            href={btn.href}
            className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center hover:bg-[#0077b6] hover:text-white transition duration-200"
            title={btn.label}
          >
            <i className={`${btn.icon} text-lg`}></i>
          </Link>
        ))}
      </div>
    </div>
  )
}
