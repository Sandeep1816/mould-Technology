"use client"

export default function SocialLinksTracker({
  supplierId,
  children,
}: {
  supplierId: number
  children: React.ReactNode
}) {
  const track = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/suppliers/${supplierId}/connection`,
        { method: "POST" }
      )
    } catch (err) {
      console.error("Failed to track connection", err)
    }
  }

  return (
    <div
      onClick={track}
      className="inline-flex"
    >
      {children}
    </div>
  )
}
