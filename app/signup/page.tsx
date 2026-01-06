import AuthHero from "@/components/AuthHero"
import SignupForm from "@/components/SignupForm"
import Image from "next/image"

export default function SignupPage() {
  return (
    <>
      <AuthHero title="Sign Up" />

      <section className="py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[20px] shadow-xl overflow-hidden">
            
            <div className="flex items-center justify-center p-14">
              <SignupForm />
            </div>

            <div className="hidden lg:block relative">
              <Image
                src="/images/login.png"
                alt="Signup"
                fill
                className="object-cover"
              />
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
