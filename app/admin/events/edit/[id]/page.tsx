"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import UploadBox from "@/components/UploadBox"

const EventSchema = Yup.object({
  title: Yup.string().required("Event title is required"),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date()
    .min(Yup.ref("startDate"), "End date must be after start date")
    .required("End date is required"),
  description: Yup.string().required("Description is required"),
})

export default function EditEventPage() {
  const { id } = useParams()
  const router = useRouter()

  const [initialValues, setInitialValues] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // 🔥 Fetch event data (admin)
  const fetchEvent = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/admin/all`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )

      const events = await res.json()
      const event = events.find((e: any) => e.id === Number(id))

      if (!event) {
        alert("Event not found")
        router.push("/admin/events")
        return
      }

      setInitialValues({
        title: event.title || "",
        logoUrl: event.logoUrl || "",
        bannerUrl: event.bannerUrl || "",
        startDate: event.startDate?.slice(0, 10),
        endDate: event.endDate?.slice(0, 10),
        location: event.location || "",
        websiteUrl: event.websiteUrl || "",
        registerUrl: event.registerUrl || "",
        calendarUrl: event.calendarUrl || "",
        description: event.description || "",
      })
    } catch (error) {
      console.error("Failed to fetch event", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvent()
  }, [id])

  // 🔥 Upload image (reused)
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
      alert("Upload failed")
      return
    }

    const data = await res.json()
    setFieldValue(fieldName, data.imageUrl)
  }

  // 🔥 Update event
  const handleSubmit = async (values: any) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(values),
      }
    )

    if (res.ok) {
      router.push("/admin/events")
    } else {
      alert("Failed to update event")
    }
  }

  if (loading) return <p className="p-6">Loading event...</p>
  if (!initialValues) return null

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Event</h1>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={EventSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, isSubmitting }) => (
          <Form className="space-y-6">

            {/* Title */}
            <div>
              <Field name="title" className="input" />
              <ErrorMessage name="title" component="p" className="error" />
            </div>

            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UploadBox
                label="Event Logo"
                value={values.logoUrl}
                onUpload={(file) =>
                  uploadImage(file, setFieldValue, "logoUrl")
                }
              />

              <UploadBox
                label="Event Banner"
                value={values.bannerUrl}
                onUpload={(file) =>
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
            <div>
              <Field
                as="textarea"
                name="description"
                rows={6}
                className="input"
              />
              <ErrorMessage name="description" component="p" className="error" />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-6 py-2 rounded"
            >
              {isSubmitting ? "Updating..." : "Update Event"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
