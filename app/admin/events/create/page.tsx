"use client"

import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/navigation"
import { useState } from "react"
import UploadBox from "@/components/UploadBox"

const EventSchema = Yup.object({
  title: Yup.string().required("Event title is required"),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date()
    .min(Yup.ref("startDate"), "End date must be after start date")
    .required("End date is required"),
  description: Yup.string().required("Description is required")
})

export default function CreateEventPage() {
  const router = useRouter()

  const [uploading] = useState({
    logo: false,
    banner: false
  })

  const initialValues = {
    title: "",
    logoUrl: "",
    bannerUrl: "",
    startDate: "",
    endDate: "",
    location: "",
    websiteUrl: "",
    registerUrl: "",
    calendarUrl: "",
    description: ""
  }

  // 🔥 Upload to Cloudinary (CORRECT)
  const uploadImage = async (
    file: File,
    setFieldValue: any,
    fieldName: "logoUrl" | "bannerUrl"
  ) => {
    const formData = new FormData()
    formData.append("image", file)

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      }
    )

    if (!res.ok) {
      const text = await res.text()
      console.error("Upload failed:", text)
      alert("Upload failed")
      return
    }

    const data = await res.json()
    setFieldValue(fieldName, data.imageUrl)
  }

  // 🔥 CREATE EVENT (FIXED ENDPOINT)
  const handleSubmit = async (values: typeof initialValues) => {
    const token = localStorage.getItem("token")

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/events`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...values,
          status: "DRAFT",
        }),
      }
    )

    const data = await res.json()
    console.log("CREATE EVENT RESPONSE:", data)

    if (res.ok) {
      router.push("/admin/events")
    } else {
      alert(data.message || "Failed to create event")
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Create Event</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={EventSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, isSubmitting }) => (
          <Form className="space-y-6">

            {/* Title */}
            <div>
              <Field name="title" placeholder="Event Title" className="input" />
              <ErrorMessage name="title" component="p" className="error" />
            </div>

            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UploadBox
                label="Event Logo"
                value={values.logoUrl}
                onUpload={file =>
                  uploadImage(file, setFieldValue, "logoUrl")
                }
              />

              <UploadBox
                label="Event Banner"
                value={values.bannerUrl}
                onUpload={file =>
                  uploadImage(file, setFieldValue, "bannerUrl")
                }
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field type="date" name="startDate" className="input" />
              <Field type="date" name="endDate" className="input" />
            </div>

            {/* Location */}
            <Field name="location" placeholder="Location" className="input" />

            {/* URLs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field name="websiteUrl" placeholder="Website URL" className="input" />
              <Field name="registerUrl" placeholder="Register URL" className="input" />
            </div>

            <Field name="calendarUrl" placeholder="Add to Calendar URL" className="input" />

            {/* Description */}
            <Field
              as="textarea"
              name="description"
              rows={6}
              placeholder="Event Description / About"
              className="input"
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-6 py-2 rounded"
            >
              {isSubmitting ? "Saving..." : "Save as Draft"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
