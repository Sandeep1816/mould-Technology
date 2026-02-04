import Link from "next/link"
import Image from "next/image"
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative bg-[#0A2B57] text-[#BEBEBE]">
      {/* ================= FOOTER TOP ================= */}
      <div className="pt-[70px] pb-[30px]">
        <div className="max-w-[1320px] mx-auto px-[15px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">

            {/* ================= BRAND ================= */}
            <div className="lg:col-span-4">
              <Link href="/" className="inline-block mb-6">
                <Image
                  src="/images/moldinglogo2.png"
                  alt="Logo"
                  width={240}
                  height={80}
                />
              </Link>

              <p className="text-sm leading-relaxed mb-6 max-w-sm">
                MoldMaking Technology addresses the complete life cycle of the manufacture and maintenance of a mold—from design to first shot—by providing solutions and strategies to moldmaking professionals charged with designing, building and repairing molds. All original technical content on our sites and in our publications is created by Gardner Business Media staff and contributing writers.
              </p>

              <div className="flex items-center gap-4 mb-6">
                {[Facebook, Instagram, Twitter, Linkedin, Youtube].map(
                  (Icon, i) => (
                    <Link
                      key={i}
                      href="#"
                      className="w-9 h-9 flex items-center justify-center border border-white/20 rounded hover:bg-white/10 transition"
                    >
                      <Icon size={16} />
                    </Link>
                  )
                )}
              </div>

              <div className="flex gap-3">
                <Image
                  src="/images/google-play.png"
                  alt="Google Play"
                  width={120}
                  height={36}
                />
                <Image
                  src="/images/apple-store.png"
                  alt="Apple Store"
                  width={120}
                  height={36}
                />
              </div>
            </div>

            {/* ================= TOPICS ================= */}
            <div className="lg:col-span-2">
              <h5 className="text-white text-lg font-semibold mb-6 uppercase">
                Topics
              </h5>
              <ul className="space-y-3 text-sm">
                <li><Link href="/topics/engineer">Engineer</Link></li>
                <li><Link href="/topics/build">Build</Link></li>
                <li><Link href="/topics/maintain">Maintain</Link></li>
                <li><Link href="/topics/manage">Manage</Link></li>
                <li><Link href="/topics">View All</Link></li>
              </ul>
            </div>

            {/* ================= RESOURCES ================= */}
            <div className="lg:col-span-2">
              <h5 className="text-white text-lg font-semibold mb-6 uppercase">
                Resources
              </h5>
              <ul className="space-y-3 text-sm">
                <li><Link href="/mmtchats">MMT Chats</Link></li>
                <li><Link href="/videos">Videos</Link></li>
                <li><Link href="/news">News</Link></li>
                <li><Link href="/products">Products</Link></li>
                <li><Link href="/podcast">Podcast</Link></li>
              </ul>
            </div>

            {/* ================= MAGAZINE + CALENDAR ================= */}
            <div className="lg:col-span-2">
              <h5 className="text-white text-lg font-semibold mb-6 uppercase">
                Magazine
              </h5>
              <ul className="space-y-3 text-sm mb-8">
                <li><Link href="/articles">Latest Issue</Link></li>
                <li><Link href="/">Archives</Link></li>
                <li><Link href="/subscribe">Subscribe</Link></li>
                <li><Link href="/">Renew Subscription</Link></li>
                <li><Link href="/">Subscription Customer Service</Link></li>
              </ul>

              {/* <h5 className="text-white text-lg font-semibold mb-6 uppercase">
                Calendar
              </h5>
              <ul className="space-y-3 text-sm">
                <li><Link href="/webinars">Webinars</Link></li>
                <li><Link href="/events">Events</Link></li>
              </ul> */}
            </div>

            {/* ================= MORE ================= */}
            <div className="lg:col-span-2">
              <h5 className="text-white text-lg font-semibold mb-6 uppercase">
                More
              </h5>
              <ul className="space-y-3 text-sm">
                <li><Link href="/contact">Contact Us</Link></li>
                <li><Link href="/suppliers">Find a Supplier</Link></li>
                {/* <li><Link href="/editorial-guidelines">Editorial Guidelines</Link></li> */}
                {/* <li><Link href="/leadtime-leader">Leadtime Leader</Link></li> */}
                {/* <li><Link href="/ask-the-expert">Ask the Expert</Link></li> */}
                {/* <li><Link href="/30-under-30">30 Under 30</Link></li> */}
              </ul>

              <br />

               <h5 className="text-white text-lg font-semibold mb-4 uppercase">
                Calendar
              </h5>
              <ul className="space-y-3 text-sm">
                <li><Link href="/webinars">Webinars</Link></li>
                <li><Link href="/events">Events</Link></li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* ================= COPYRIGHT BAR ================= */}
      <div className="border-t border-white/10">
        <div className="max-w-[1320px] mx-auto px-[15px] py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 items-center text-sm gap-4">
            <div className="text-center md:text-left">
              <Link href="/terms">Terms & Agreements</Link>
            </div>

            <div className="text-center">
              <p className="underline underline-offset-4">
                Copyright © 2026 Molding Trends.
              </p>
            </div>

            <div className="text-center md:text-right">
              <Link href="/privacy-policy">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
