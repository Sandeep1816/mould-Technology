import JobFeed from "@/components/job/JobFeed"
import Link from "next/link"

export default function PublicFeedPage() {
  return (
    <div className="bg-[#f4f6f8] min-h-screen">

      {/* ================= HERO ================= */}
      <section className="relative bg-[#0b3954]">
        <div className="absolute inset-0">
          <img
            src="/images/hirings.png"
            alt="Tooling Trends Hiring Platform"
            className="w-full h-full object-cover opacity-25"
          />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-6 py-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white max-w-3xl leading-tight">
            Find the right job.  
            <br />
            Hire the right talent.
          </h1>

          <p className="text-white/80 mt-4 max-w-2xl text-lg">
            Tooling Trends is a professional hiring platform for
            manufacturing & technology talent.
          </p>

          {/* CTA CARDS */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">

{/* CANDIDATE */}
<div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl p-6 shadow-xl">
  <h3 className="text-xl font-semibold mb-2 text-white">
    Looking for a job?
  </h3>

  <p className="text-white/80 mb-5">
    Browse verified opportunities and apply in minutes.
  </p>

  <ul className="text-sm text-white/80 space-y-2 mb-6">
    <li>✔ Verified job listings</li>
    <li>✔ Apply & track applications</li>
    <li>✔ Job alerts</li>
  </ul>

  <Link
    href="/signup?role=candidate"
    className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
  >
    Apply for Jobs
  </Link>
</div>

{/* RECRUITER */}
<div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl p-6 shadow-xl">
  <h3 className="text-xl font-semibold mb-2 text-white">
    Hiring talent?
  </h3>

  <p className="text-white/80 mb-5">
    Post jobs and manage candidates effortlessly.
  </p>

  <ul className="text-sm text-white/80 space-y-2 mb-6">
    <li>✔ Post jobs in minutes</li>
    <li>✔ Manage applicants</li>
    <li>✔ Reach qualified talent</li>
  </ul>

  <Link
    href="/signup?role=recruiter"
    className="inline-flex items-center justify-center bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
  >
    Post a Job
  </Link>
</div>


          </div>
        </div>
      </section>

      {/* ================= JOB LIST ================= */}
      <section className="max-w-[900px] mx-auto px-4 py-14">

        <div className="mb-8">
          <h2 className="text-3xl font-bold">
            Explore Jobs
          </h2>
          <p className="text-gray-600 mt-1">
            Sign up to apply or post jobs on Tooling Trends
          </p>
        </div>

        {/* PUBLIC JOB FEED */}
        <JobFeed isPublic />
      </section>

    </div>
  )
}
