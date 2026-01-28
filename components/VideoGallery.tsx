"use client"

import { useState } from "react"

export default function VideoGallery({
  videos,
}: {
  videos: string[]
}) {
  const getVideoId = (url: string) =>
    url.split("v=")[1]?.split("&")[0] || url.split("/").pop()

  const [activeVideo, setActiveVideo] = useState(
    getVideoId(videos[0])
  )

  return (
    <div>
      <h2 className="font-semibold text-lg mb-4">
        Video Gallery
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* ===== MAIN VIDEO ===== */}
        <div className="md:col-span-2">
          <iframe
            key={activeVideo}
            className="w-full aspect-video rounded border"
            src={`https://www.youtube.com/embed/${activeVideo}`}
            allowFullScreen
          />
        </div>

        {/* ===== SIDE SCROLL LIST ===== */}
        <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2">
          {videos.map((url, idx) => {
            const id = getVideoId(url)

            return (
              <div
                key={idx}
                onClick={() => setActiveVideo(id)}
                className={`cursor-pointer border rounded overflow-hidden transition
                  ${
                    activeVideo === id
                      ? "border-blue-600 ring-2 ring-blue-200"
                      : "hover:border-gray-400"
                  }
                `}
              >
                <iframe
                  className="w-full aspect-video pointer-events-none"
                  src={`https://www.youtube.com/embed/${id}`}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
