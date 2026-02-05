import AuthHero from "@/components/AuthHero"
import SignupForm from "@/components/SignupForm"
import Image from "next/image"
import { Suspense } from "react"

export default function SignupPage() {
  return (
    <>
      <AuthHero title="Sign Up" />

      <section className="py-24 bg-[#f5f7fa]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden">

            {/* LEFT – FORM */}
            <div className="flex items-center justify-center px-10 py-14">
              <Suspense fallback={<div>Loading...</div>}>
                <SignupForm />
              </Suspense>
            </div>

            {/* RIGHT – IMAGE */}
            <div className="hidden lg:block relative">
              <Image
                src="/images/login.png"
                alt="Signup"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#0b3954]/40 to-[#0b3954]/20" />
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
