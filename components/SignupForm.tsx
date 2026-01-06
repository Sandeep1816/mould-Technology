import Link from "next/link"

export default function SignupForm() {
  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-semibold mb-8 text-center">
        Sign Up
      </h2>

      <form className="space-y-5">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full h-[52px] px-4 rounded-md border border-gray-200 focus:outline-none focus:border-[#0073FF]"
        />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full h-[52px] px-4 rounded-md border border-gray-200"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full h-[52px] px-4 rounded-md border border-gray-200"
        />

        <button className="w-full h-[52px] bg-[#0073FF] text-white rounded-md font-medium hover:bg-[#005fe0] transition">
          Create Account
        </button>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#0073FF]"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}
