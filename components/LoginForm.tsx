import Link from "next/link"

export default function LoginForm() {
  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-semibold mb-8 text-center">
        Login
      </h2>

      <form className="space-y-5">
        <input
          type="email"
          placeholder="Email Address"
          className="w-full h-[52px] px-4 rounded-md border border-gray-200 focus:outline-none focus:border-[#0073FF]"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full h-[52px] px-4 rounded-md border border-gray-200 focus:outline-none focus:border-[#0073FF]"
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            Remember me
          </label>

          <Link
            href="/forgot-password"
            className="text-[#0073FF]"
          >
            Forgot Password?
          </Link>
        </div>

        <button className="w-full h-[52px] bg-[#0073FF] text-white rounded-md font-medium hover:bg-[#005fe0] transition">
          Sign In
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Social */}
        <div className="flex justify-center gap-4">
          {["facebook", "instagram", "x", "linkedin"].map((s) => (
            <div
              key={s}
              className="w-10 h-10 flex items-center justify-center rounded bg-gray-100 cursor-pointer hover:bg-gray-200"
            >
              <i className={`ri-${s}-fill`} />
            </div>
          ))}
        </div>

        <p className="text-center text-sm mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-[#0073FF]"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  )
}
