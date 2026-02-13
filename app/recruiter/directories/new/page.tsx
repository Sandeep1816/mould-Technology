"use client"

import { useRouter } from "next/navigation"
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik"
import * as Yup from "yup"
import RichTextEditor from "@/components/RichTextField"
import UploadBox from "@/components/UploadBox"
import { useState } from "react"

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

  // ✅ NEW
  productSupplies: Yup.array().of(Yup.string().min(2)),
  socialLinks: Yup.object({
    facebook: Yup.string().url().nullable(),
    linkedin: Yup.string().url().nullable(),
    twitter: Yup.string().url().nullable(),
    youtube: Yup.string().url().nullable(),
  }),
})

/* ---------------- PAGE ---------------- */
export default function AddDirectoryPage() {
  const router = useRouter()
const [uploadingLogo, setUploadingLogo] = useState(false)
const [uploadingCover, setUploadingCover] = useState(false)
const [uploadError, setUploadError] = useState("")


  // 🔥 CLOUDINARY UPLOAD FUNCTION
 const handleImageUpload = async (
  file: File,
  setFieldValue: any,
  fieldName: "logoUrl" | "coverImageUrl",
  type: "logo" | "cover"
) => {
  if (type === "logo") setUploadingLogo(true)
  if (type === "cover") setUploadingCover(true)

  setUploadError("")

  try {
    const formData = new FormData()
    formData.append("image", file)

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
      {
        method: "POST",
        body: formData,
      }
    )

    if (!res.ok) {
      throw new Error("Image upload failed")
    }

    const data = await res.json()

    // ✅ Dynamically set field
    setFieldValue(fieldName, data.imageUrl)

  } catch (err: any) {
    setUploadError(err.message)
  } finally {
    if (type === "logo") setUploadingLogo(false)
    if (type === "cover") setUploadingCover(false)
  }
}



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

          // ✅ NEW
          productSupplies: [""],
          socialLinks: {
            facebook: "",
            linkedin: "",
            twitter: "",
            youtube: "",
          },
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

            {/* DESCRIPTION */}
            <div>
              <label className="label">Description</label>
              <RichTextEditor name="description" />
              <ErrorMessage name="description" component="p" className="error" />
            </div>

 {/* 🔥 LOGO + COVER IMAGE ROW */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

  {/* LOGO */}
  <div>
    <UploadBox
      label="Company Logo"
      value={values.logoUrl}
      onUpload={(file) =>
        handleImageUpload(file, setFieldValue, "logoUrl", "logo")
      }
      height="h-40"
    />

    {uploadingLogo && (
      <p className="text-sm text-gray-500 mt-2">
        Uploading logo...
      </p>
    )}
  </div>

  {/* COVER IMAGE */}
  <div>
    <UploadBox
      label="Cover Image"
      value={values.coverImageUrl}
      onUpload={(file) =>
        handleImageUpload(file, setFieldValue, "coverImageUrl", "cover")
      }
      height="h-40"
    />

    {uploadingCover && (
      <p className="text-sm text-gray-500 mt-2">
        Uploading cover image...
      </p>
    )}
  </div>

</div>






            {/* PRODUCT SUPPLIES */}
            <Section title="Product Supplies / Services">
              <FieldArray name="productSupplies">
                {({ push, remove }) => (
                  <>
                    {values.productSupplies.map((_: any, i: number) => (
                      <div key={i} className="flex gap-2">
                        <Field
                          name={`productSupplies.${i}`}
                          className="input flex-1"
                          placeholder="e.g. Injection Molds"
                        />
                        {i > 0 && (
                          <button type="button" onClick={() => remove(i)}>✕</button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={() => push("")} className="text-sm text-blue-600">
                      + Add product
                    </button>
                  </>
                )}
              </FieldArray>
            </Section>

            {/* SOCIAL LINKS */}
            <Section title="Social Media Links">
              <FieldBlock label="Facebook" name="socialLinks.facebook" />
              <FieldBlock label="LinkedIn" name="socialLinks.linkedin" />
              <FieldBlock label="Twitter / X" name="socialLinks.twitter" />
              <FieldBlock label="YouTube" name="socialLinks.youtube" />
            </Section>

            {/* TRADE NAMES */}
            <Section title="Trade Names">
              <FieldArray name="tradeNames">
                {({ push, remove }) => (
                  <>
                    {values.tradeNames.map((_: any, i: number) => (
                      <div key={i} className="flex gap-2">
                        <Field name={`tradeNames.${i}`} className="input flex-1" />
                        {i > 0 && (
                          <button type="button" onClick={() => remove(i)}>✕</button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={() => push("")} className="text-sm text-blue-600">
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
                        <Field name={`videoGallery.${i}`} className="input flex-1" />
                        {i > 0 && (
                          <button type="button" onClick={() => remove(i)}>✕</button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={() => push("")} className="text-sm text-blue-600">
                      + Add video
                    </button>
                  </>
                )}
              </FieldArray>
            </Section>

            <FieldBlock label="Website" name="website" />
            {/* <FieldBlock label="Logo URL" name="logoUrl" /> */}
            {/* <FieldBlock label="Cover Image URL" name="coverImageUrl" /> */}

            {status && <p className="text-red-600 text-sm">{status}</p>}

           <button
  type="submit"
  disabled={isSubmitting || uploadingLogo || uploadingCover}
  className="bg-black text-white px-6 py-2 rounded"
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
function FieldBlock({ label, name }: any) {
  return (
    <div>
      <label className="label">{label}</label>
      <Field name={name} className="input" />
      <ErrorMessage name={name} component="p" className="error" />
    </div>
  )
}

function Section({ title, children }: any) {
  return (
    <div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  )
}
