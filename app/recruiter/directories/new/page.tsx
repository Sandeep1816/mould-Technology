"use client"

import { useRouter } from "next/navigation"
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik"
import * as Yup from "yup"
import RichTextEditor from "@/components/RichTextField"

/* ---------------- SLUG HELPER ---------------- */

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

/* ---------------- VALIDATION ---------------- */

const DirectorySchema = Yup.object({
  name: Yup.string().min(3).required("Company name is required"),
  slug: Yup.string()
    .matches(/^[a-z0-9-]+$/, "Only lowercase letters, numbers and hyphens")
    .required("Slug is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  email: Yup.string().email().required("Email is required"),
  description: Yup.string().min(20).required("Description is required"),
  website: Yup.string().url().nullable(),
  logoUrl: Yup.string().url().nullable(),
  coverImageUrl: Yup.string().url().nullable(),
  tradeNames: Yup.array().of(Yup.string()).min(1),
  videoGallery: Yup.array().of(Yup.string().url()),
})

/* ---------------- PAGE ---------------- */

export default function AddDirectoryPage() {
  const router = useRouter()

  async function submit(values: any, { setSubmitting, setStatus }: any) {
    try {
      const token = localStorage.getItem("token")

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/suppliers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        }
      )

      if (!res.ok) throw new Error()

      router.push("/recruiter/dashboard")
    } catch {
      setStatus("Failed to submit directory")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-10">
      <h1 className="text-2xl font-bold mb-6">
        Add Supplier Directory
      </h1>

      <Formik
        initialValues={{
          name: "",
          slug: "",
          phoneNumber: "",
          email: "",
          description: "",
          website: "",
          logoUrl: "",
          coverImageUrl: "",
          tradeNames: [""],
          videoGallery: [""],
        }}
        validationSchema={DirectorySchema}
        onSubmit={submit}
      >
        {({ isSubmitting, setFieldValue, values, status }) => (
          <Form className="space-y-6 bg-white p-6 rounded-xl shadow">

            {/* COMPANY NAME */}
            <div>
              <label className="label">Company Name</label>
              <Field
                name="name"
                className="input"
                onChange={(e: any) => {
                  const name = e.target.value
                  setFieldValue("name", name)
                  if (!values.slug || values.slug === slugify(values.name)) {
                    setFieldValue("slug", slugify(name))
                  }
                }}
              />
              <ErrorMessage name="name" component="p" className="error" />
            </div>

            {/* SLUG */}
            <div>
              <label className="label">Slug</label>
              <Field name="slug" className="input" />
              <ErrorMessage name="slug" component="p" className="error" />
              <p className="text-xs text-gray-400 mt-1">
                URL: /suppliers/{values.slug || "your-company"}
              </p>
            </div>

            <FieldBlock label="Phone Number" name="phoneNumber" />
            <FieldBlock label="Email" name="email" />

            {/* ✅ RICH TEXT DESCRIPTION */}
            <div>
              <label className="label">Description</label>
              <RichTextEditor name="description" />
              <ErrorMessage name="description" component="p" className="error" />
            </div>

            {/* TRADE NAMES */}
            <Section title="Trade Names">
              <FieldArray name="tradeNames">
                {({ push, remove }) => (
                  <>
                    {values.tradeNames.map((_: any, i: number) => (
                      <div key={i} className="flex gap-2">
                        <Field
                          name={`tradeNames.${i}`}
                          className="input flex-1"
                        />
                        {i > 0 && (
                          <button
                            type="button"
                            onClick={() => remove(i)}
                            className="text-red-500"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push("")}
                      className="text-sm text-blue-600"
                    >
                      + Add trade name
                    </button>
                  </>
                )}
              </FieldArray>
            </Section>

            {/* VIDEO GALLERY */}
            <Section title="YouTube Video Gallery">
              <FieldArray name="videoGallery">
                {({ push, remove }) => (
                  <>
                    {values.videoGallery.map((_: any, i: number) => (
                      <div key={i} className="flex gap-2">
                        <Field
                          name={`videoGallery.${i}`}
                          className="input flex-1"
                        />
                        {i > 0 && (
                          <button
                            type="button"
                            onClick={() => remove(i)}
                            className="text-red-500"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push("")}
                      className="text-sm text-blue-600"
                    >
                      + Add video
                    </button>
                  </>
                )}
              </FieldArray>
            </Section>

            <FieldBlock label="Website" name="website" />
            <FieldBlock label="Logo URL" name="logoUrl" />
            <FieldBlock label="Cover Image URL" name="coverImageUrl" />

            {status && (
              <p className="text-red-600 text-sm">{status}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-black text-white px-6 py-2 rounded disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit for Approval"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

/* ---------------- HELPERS ---------------- */

function FieldBlock({
  label,
  name,
}: {
  label: string
  name: string
}) {
  return (
    <div>
      <label className="label">{label}</label>
      <Field name={name} className="input" />
      <ErrorMessage name={name} component="p" className="error" />
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  )
}
