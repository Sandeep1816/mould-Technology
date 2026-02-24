"use client";

import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="w-full bg-white">

      {/* ================= HERO / BREADCRUMB ================= */}
      <section className="relative bg-[#f8f9fb] py-24 text-center">
        <h1 className="text-4xl font-semibold text-[#121213]">Contact</h1>
        <div className="mt-2 text-sm text-[#616C74]">
          <Link href="/" className="hover:text-blue-600">
            Tooling Trends
          </Link>
          <span className="mx-2">→</span>
          <span className="text-blue-600">Contact</span>
        </div>
      </section>

      {/* ================= LOCATIONS ================= */}
      <section className="py-24">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {[
              {
                title: "California",
                img: "/images/newyork.png",
                address: "Madison Avenue, New York",
                phone: "+990 123 456 789",
              },
              {
                title: "New York City",
                img: "/images/newyork.png",
                address: "Washington Ave, Manchester, Kentucky",
                phone: "+89 (308) 555-0121",
              },
              {
                title: "New Hampshire",
                img: "/images/newyork.png",
                address: "Parker Rd. Allentown, New Mexico",
                phone: "(907) 555-0101",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl shadow-sm p-8 text-center"
              >
                <div className="relative w-full h-[220px] rounded-full overflow-hidden mx-auto mb-6">
                  <Image
                    src={item.img}
                    alt={`${item.title} office`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <h3 className="text-xl font-semibold text-[#121213]">
                  {item.title}
                </h3>

                <div className="w-10 h-[2px] bg-blue-600 mx-auto my-4" />

                <p className="text-sm text-[#616C74] leading-relaxed">
                  {item.address}
                </p>
                <p className="text-sm text-[#616C74] mt-1">
                  {item.phone}
                </p>
                <p className="text-sm text-[#616C74] mt-1">
                  toolingtrends@gmail.com
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= CONTACT FORM ================= */}
      <section className="pb-32">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="bg-white rounded-[28px] border border-blue-500/20 p-10 md:p-14 grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* FORM */}
            <div>
              <h2 className="text-3xl font-semibold text-[#121213] mb-8">
                Feel Free to Contact Us
              </h2>

              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Full Name*", type: "text", placeholder: "Robot fox" },
                  { label: "Email Address*", type: "email", placeholder: "info@toolingtrends.com" },
                  { label: "Phone Number*", type: "text", placeholder: "(480) 555-0103" },
                  { label: "Website*", type: "text", placeholder: "www.toolingtrends.com" },
                ].map((field, i) => (
                  <div key={i}>
                    <label className="text-sm text-[#121213]">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="mt-2 w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-blue-600"
                    />
                  </div>
                ))}

                <div className="md:col-span-2">
                  <label className="text-sm text-[#121213]">
                    Message*
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Type here..."
                    className="mt-2 w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-blue-600"
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                  >
                    Send Message →
                  </button>
                </div>
              </form>
            </div>

            {/* IMAGE */}
            <div className="relative w-full h-[520px] rounded-2xl overflow-hidden">
              <Image
                src="/images/contact.png"
                alt="Customer support representative"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}