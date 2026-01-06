import AuthHero from "@/components/AuthHero"
import LoginForm from "@/components/LoginForm"
import Image from "next/image"

export default function LoginPage() {
  return (
    <>
      <AuthHero title="Login" />

      <section className="py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[20px] shadow-xl overflow-hidden">
            
            {/* Left */}
            <div className="flex items-center justify-center p-14">
              <LoginForm />
            </div>

            {/* Right image */}
            <div className="hidden lg:block relative">
              <Image
                src="/images/login.png"
                alt="Login"
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
