"use client"

import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { useState, useRef } from "react"
import { Turnstile } from "@marsidev/react-turnstile"
import {
  User,
  Mail,
  Phone,
  Building2,
  Briefcase,
  Globe,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"

interface Props {
  slug: string
}

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  companyName: Yup.string().required("Company Name is required"),
  jobTitle: Yup.string().required("Job Title is required"),
  country: Yup.string().required("Country is required"),
  agree: Yup.boolean().oneOf([true], "You must accept Terms"),
})

export default function EventRegistrationForm({ slug }: Props) {
  const [success, setSuccess] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const turnstileRef = useRef<any>(null)

  const inputBase =
    "w-full pl-10 pr-3 py-2.5 border rounded-lg text-sm bg-white text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0A2B57] focus:border-[#0A2B57]"

  return (
    <div className="w-full bg-white rounded-2xl p-8">

      <h2 className="text-2xl font-bold text-[#0A2B57] mb-8 text-center">
        Event Registration
      </h2>

      <Formik
        initialValues={{
          fullName: "",
          email: "",
          phone: "",
          companyName: "",
          jobTitle: "",
          country: "",
          specialRequirements: "",
          agree: false,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          setErrorMsg("")
          setSuccess("")

          if (!captchaToken) {
            setErrorMsg("Please verify you are human.")
            return
          }

          try {
            setLoading(true)

            const res = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/api/events/${slug}/register`,
              { ...values, captchaToken }
            )

            if (res.data.success) {
              setSuccess("Registration Successful 🎉")

              resetForm()
              setCaptchaToken(null)

              // 🔄 Reset Turnstile widget properly
              turnstileRef.current?.reset()
            }

          } catch (err: any) {
            setErrorMsg(
              err?.response?.data?.message || "Registration failed"
            )

            // 🔄 Reset token if backend rejected
            setCaptchaToken(null)
            turnstileRef.current?.reset()
          } finally {
            setLoading(false)
          }
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {[
                { name: "fullName", label: "Full Name", icon: User },
                { name: "email", label: "Email", icon: Mail, type: "email" },
                { name: "phone", label: "Phone", icon: Phone },
                { name: "companyName", label: "Company", icon: Building2 },
                { name: "jobTitle", label: "Job Title", icon: Briefcase },
                { name: "country", label: "Country", icon: Globe },
              ].map((field) => {
                const Icon = field.icon
                return (
                  <div key={field.name}>
                    <label className="text-sm font-semibold text-[#0A2B57]">
                      {field.label} *
                    </label>
                    <div className="relative mt-1">
                      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Field
                        name={field.name}
                        type={field.type || "text"}
                        className={`${inputBase} ${
                          errors[field.name as keyof typeof errors] &&
                          touched[field.name as keyof typeof touched]
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                    </div>
                    <ErrorMessage
                      name={field.name}
                      component="div"
                      className="text-red-600 text-xs mt-1"
                    />
                  </div>
                )
              })}
            </div>

            {/* Special Requirements */}
            <div>
              <label className="text-sm font-semibold text-[#0A2B57]">
                Special Requirements (Optional)
              </label>
              <Field
                as="textarea"
                name="specialRequirements"
                rows={2}
                className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#0A2B57] resize-none"
              />
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-center gap-2 text-sm text-[#0A2B57]">
                <Field type="checkbox" name="agree" />
                I agree to Terms & Conditions *
              </label>
              <ErrorMessage
                name="agree"
                component="div"
                className="text-red-600 text-xs mt-1"
              />
            </div>

            {/* 🔐 Turnstile */}
            <div className="flex justify-center">
              <Turnstile
                ref={turnstileRef}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                onSuccess={(token: string) => {
                  console.log("Turnstile token:", token)
                  setCaptchaToken(token)
                }}
                onExpire={() => {
                  setCaptchaToken(null)
                }}
                onError={() => {
                  setCaptchaToken(null)
                }}
                options={{
                  theme: "light",
                  appearance: "always",
                }}
              />
            </div>

            {success && (
              <div className="flex items-center gap-2 text-green-600 text-sm">
                <CheckCircle2 size={18} />
                {success}
              </div>
            )}

            {errorMsg && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle size={18} />
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0A2B57] text-white py-3 rounded-lg font-semibold hover:bg-[#061D3D] transition shadow-md"
            >
              {loading ? "Processing..." : "Register Now"}
            </button>

          </Form>
        )}
      </Formik>
    </div>
  )
}
