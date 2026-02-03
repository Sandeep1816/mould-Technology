"use client"

import { UploadCloud } from "lucide-react"

type Props = {
  label: string
  value?: string
  onUpload: (file: File) => void
  height?: string
}

export default function UploadBox({
  label,
  value,
  onUpload,
  height = "h-40"
}: Props) {
  return (
    <div>
      <p className="font-medium mb-2">{label}</p>

      <label className="block cursor-pointer">
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={e => {
            if (e.target.files && e.target.files[0]) {
              onUpload(e.target.files[0])
            }
          }}
        />

        {value ? (
          <div className="relative">
            <img
              src={value}
              alt="Uploaded"
              className={`w-full ${height} object-cover rounded-lg border`}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition flex items-center justify-center rounded-lg">
              <span className="text-white text-sm">
                Click to replace image
              </span>
            </div>
          </div>
        ) : (
          <div
            className={`w-full ${height} flex flex-col items-center justify-center
              border-2 border-dashed border-gray-300 rounded-lg
              hover:border-blue-500 transition`}
          >
            <UploadCloud size={42} className="text-gray-400 mb-2" />
            <p className="text-gray-500 text-sm">
              Click to upload image
            </p>
          </div>
        )}
      </label>
    </div>
  )
}
