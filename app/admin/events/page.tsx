"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

type Event = {
  id: number
  title: string
  slug: string
  status: "DRAFT" | "PUBLISHED"
  startDate: string
  endDate: string
  location?: string
  createdAt: string
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [publishingId, setPublishingId] = useState<number | null>(null)

  const fetchEvents = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/admin/all`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )

      const data = await res.json()
      setEvents(data)
    } catch (error) {
      console.error("Failed to fetch events", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const publishEvent = async (id: number) => {
    if (!confirm("Publish this event?")) return

    setPublishingId(id)

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/publish/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )

      if (res.ok) {
        await fetchEvents()
      } else {
        alert("Failed to publish event")
      }
    } catch (error) {
      alert("Error publishing event")
    } finally {
      setPublishingId(null)
    }
  }

  if (loading) {
    return <p className="p-6">Loading events...</p>
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Events</h1>

        <Link
          href="/admin/events/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Create Event
        </Link>
      </div>

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Title</th>
                <th className="border p-2">Dates</th>
                <th className="border p-2">Location</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {events.map(event => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="border p-2 font-medium">
                    {event.title}
                  </td>

                  <td className="border p-2 text-center">
                    {new Date(event.startDate).toLocaleDateString()} –{" "}
                    {new Date(event.endDate).toLocaleDateString()}
                  </td>

                  <td className="border p-2 text-center">
                    {event.location || "-"}
                  </td>

                  <td className="border p-2 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        event.status === "PUBLISHED"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {event.status}
                    </span>
                  </td>

                  <td className="border p-2 text-center space-x-2">
                    {event.status === "DRAFT" && (
                      <button
                        onClick={() => publishEvent(event.id)}
                        disabled={publishingId === event.id}
                        className="bg-green-600 text-white px-3 py-1 rounded text-xs disabled:opacity-50"
                      >
                        {publishingId === event.id
                          ? "Publishing..."
                          : "Publish"}
                      </button>
                    )}

                    <Link
                      href={`/admin/events/edit/${event.id}`}
                      className="bg-gray-200 px-3 py-1 rounded text-xs"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
