import type { Metadata } from "next"
import { Inter_Tight } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "remixicon/fonts/remixicon.css"

import "./globals.css"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import CTASection from "@/components/CTASection"

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter-tight",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Mould Technology",
  description: "Industrial & Manufacturing Technology News",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={interTight.variable}>
      <body className="antialiased">
        {/* FIXED HEADER */}
        <Header />

        {/* ✅ OFFSET FOR FIXED HEADER */}
        <main className="pt-[142px]">
          {children}
        </main>

        <CTASection />

        <Analytics />
        <Footer />
      </body>
    </html>
  )
}
