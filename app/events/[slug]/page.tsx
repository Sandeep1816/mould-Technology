import Image from "next/image"
import Link from "next/link"
import SupplierAds from "@/components/SupplierAds"
import EventViewTracker from "@/components/events/EventViewTracker"
import EventRegisterModal from "@/components/events/EventRegisterModal"

type Event = {
  id: number
  title: string
  slug: string
  logoUrl?: string
  bannerUrl?: string
  startDate: string
  endDate: string
  location?: string
  description: string
  websiteUrl?: string
  calendarUrl?: string
}

async function getEvent(slug: string): Promise<Event | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/events/${slug}`,
    { cache: "no-store" }
  )

  if (!res.ok) return null
  return res.json()
}

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const event = await getEvent(slug)

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto p-10">
        <h1 className="text-2xl font-bold">Event not found</h1>
      </div>
    )
  }

  return (
    <div className="w-full">

      <EventViewTracker slug={slug} />

      {/* HERO */}
      <div className="relative w-full h-[420px]">
        {event.bannerUrl && (
          <Image
            src={event.bannerUrl}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
        )}

        <div className="absolute inset-0 bg-black/60 flex items-center">
          <div className="max-w-7xl mx-auto px-6 text-white max-w-2xl">

            {event.logoUrl && (
              <Image
                src={event.logoUrl}
                alt={event.title}
                width={220}
                height={120}
                className="mb-4 bg-white p-3"
              />
            )}

            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              {event.title}
            </h1>

            <p className="text-lg mb-2">
              {new Date(event.startDate).toLocaleDateString()} –{" "}
              {new Date(event.endDate).toLocaleDateString()}
            </p>

            {event.location && (
              <p className="text-lg mb-6">
                📍 {event.location}
              </p>
            )}

            {/* Popup Register Button */}
            <EventRegisterModal slug={slug} />

          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">

        <main className="lg:col-span-8 space-y-10">

          <section>
            <h2 className="text-2xl font-bold mb-4">
              About This Event
            </h2>
            <p className="text-gray-800 whitespace-pre-line">
              {event.description}
            </p>
          </section>

          <section className="border-t pt-6">
            <h3 className="text-xl font-semibold mb-4">
              Event Information
            </h3>

            <ul className="space-y-2 text-gray-700">
              <li>
                <strong>Dates:</strong>{" "}
                {new Date(event.startDate).toLocaleDateString()} –{" "}
                {new Date(event.endDate).toLocaleDateString()}
              </li>

              {event.location && (
                <li>
                  <strong>Location:</strong> {event.location}
                </li>
              )}

              {event.websiteUrl && (
                <li>
                  <strong>Website:</strong>{" "}
                  <Link
                    href={event.websiteUrl}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    Visit event website
                  </Link>
                </li>
              )}

              {event.calendarUrl && (
                <li>
                  <strong>Add to calendar:</strong>{" "}
                  <Link
                    href={`${process.env.NEXT_PUBLIC_API_URL}/api/calendar/event/${event.slug}.ics`}
                    className="text-blue-600 underline"
                  >
                    Add to calendar
                  </Link>
                </li>
              )}
            </ul>
          </section>

        </main>

        <aside className="lg:col-span-4">
          <SupplierAds />
        </aside>

      </div>
    </div>
  )
}
