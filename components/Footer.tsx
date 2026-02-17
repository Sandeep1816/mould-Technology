import Link from "next/link"
import Image from "next/image"
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Mail,
  Phone,
} from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-red-700 to-[#08243F] text-[#BEBEBE]">
      
      {/* ================= FOOTER TOP ================= */}
      <div className="pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-12 lg:pb-16">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Mobile: Stacked Layout */}
          <div className="lg:hidden space-y-8 sm:space-y-10">
            
            {/* BRAND - Mobile */}
            <div className="text-center sm:text-left">
              <Link href="/" className="inline-block mb-4">
                <Image
                  src="/images/moldinglogo2.png"
                  alt="MoldMaking Technology Logo"
                  width={200}
                  height={67}
                  className="w-auto h-14 sm:h-16"
                />
              </Link>

              <p className="text-sm leading-relaxed mb-5 max-w-md mx-auto sm:mx-0">
                MoldMaking Technology addresses the complete life cycle of mold manufacturing and maintenance—providing solutions to professionals charged with designing, building and repairing molds.
              </p>

              {/* Social Icons - Mobile */}
              <div className="flex items-center justify-center sm:justify-start gap-3 mb-5">
                {[
                  { Icon: Facebook, href: "#" },
                  { Icon: Instagram, href: "#" },
                  { Icon: Twitter, href: "#" },
                  { Icon: Linkedin, href: "#" },
                  { Icon: Youtube, href: "#" }
                ].map(({ Icon, href }, i) => (
                  <Link
                    key={i}
                    href={href}
                    className="w-9 h-9 flex items-center justify-center border border-white/20 rounded-md hover:bg-white/10 hover:border-white/40 transition-all duration-200"
                    aria-label={`Social media link ${i + 1}`}
                  >
                    <Icon size={16} />
                  </Link>
                ))}
              </div>

              {/* App Store Buttons - Mobile */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
                <Link href="#" className="inline-block">
                  <Image
                    src="/images/google-play.png"
                    alt="Download on Google Play"
                    width={135}
                    height={40}
                    className="h-10 w-auto hover:opacity-80 transition"
                  />
                </Link>
                <Link href="#" className="inline-block">
                  <Image
                    src="/images/apple-store.png"
                    alt="Download on App Store"
                    width={135}
                    height={40}
                    className="h-10 w-auto hover:opacity-80 transition"
                  />
                </Link>
              </div>
            </div>

            {/* Quick Links Grid - Mobile/Tablet */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
              
              {/* Topics */}
              <div>
                <h5 className="text-white text-base font-bold mb-4 uppercase tracking-wide">
                  Topics
                </h5>
                <ul className="space-y-2.5 text-sm">
                  <li><Link href="/topics/engineer" className="hover:text-white transition-colors">Engineer</Link></li>
                  <li><Link href="/topics/build" className="hover:text-white transition-colors">Build</Link></li>
                  <li><Link href="/topics/maintain" className="hover:text-white transition-colors">Maintain</Link></li>
                  <li><Link href="/topics/manage" className="hover:text-white transition-colors">Manage</Link></li>
                  <li><Link href="/topics" className="hover:text-white transition-colors font-semibold">View All →</Link></li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h5 className="text-white text-base font-bold mb-4 uppercase tracking-wide">
                  Resources
                </h5>
                <ul className="space-y-2.5 text-sm">
                  <li><Link href="/mmtchats" className="hover:text-white transition-colors">MMT Chats</Link></li>
                  <li><Link href="/videos" className="hover:text-white transition-colors">Videos</Link></li>
                  <li><Link href="/news" className="hover:text-white transition-colors">News</Link></li>
                  <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
                  <li><Link href="/podcast" className="hover:text-white transition-colors">Podcast</Link></li>
                </ul>
              </div>

              {/* Magazine */}
              <div>
                <h5 className="text-white text-base font-bold mb-4 uppercase tracking-wide">
                  Magazine
                </h5>
                <ul className="space-y-2.5 text-sm">
                  <li><Link href="/articles" className="hover:text-white transition-colors">Latest Issue</Link></li>
                  <li><Link href="/" className="hover:text-white transition-colors">Archives</Link></li>
                  <li><Link href="/subscribe" className="hover:text-white transition-colors">Subscribe</Link></li>
                  <li><Link href="/" className="hover:text-white transition-colors">Renew</Link></li>
                </ul>
              </div>

              {/* Calendar */}
              <div>
                <h5 className="text-white text-base font-bold mb-4 uppercase tracking-wide">
                  Calendar
                </h5>
                <ul className="space-y-2.5 text-sm">
                  <li><Link href="/webinars" className="hover:text-white transition-colors">Webinars</Link></li>
                  <li><Link href="/events" className="hover:text-white transition-colors">Events</Link></li>
                </ul>
              </div>

              {/* More */}
              <div className="col-span-2 sm:col-span-1">
                <h5 className="text-white text-base font-bold mb-4 uppercase tracking-wide">
                  More
                </h5>
                <ul className="space-y-2.5 text-sm">
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                  <li><Link href="/suppliers" className="hover:text-white transition-colors">Find a Supplier</Link></li>
                </ul>
              </div>

            </div>

          </div>

          {/* Desktop: Grid Layout */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-10 xl:gap-12">

            {/* BRAND - Desktop */}
            <div className="lg:col-span-4">
              <Link href="/" className="inline-block mb-6">
                <Image
                  src="/images/whitelogo.png"
                  alt="MoldMaking Technology Logo"
                  width={240}
                  height={80}
                  className="w-auto h-20"
                />
              </Link>

              <p className="text-sm leading-relaxed mb-6 max-w-sm">
                MoldMaking Technology addresses the complete life cycle of the manufacture and maintenance of a mold—from design to first shot—by providing solutions and strategies to moldmaking professionals charged with designing, building and repairing molds.
              </p>

              {/* Social Icons - Desktop */}
              <div className="flex items-center gap-3 mb-6">
                {[
                  { Icon: Facebook, href: "#" },
                  { Icon: Instagram, href: "#" },
                  { Icon: Twitter, href: "#" },
                  { Icon: Linkedin, href: "#" },
                  { Icon: Youtube, href: "#" }
                ].map(({ Icon, href }, i) => (
                  <Link
                    key={i}
                    href={href}
                    className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-md hover:bg-white/10 hover:border-white/40 transition-all duration-200"
                    aria-label={`Social media link ${i + 1}`}
                  >
                    <Icon size={18} />
                  </Link>
                ))}
              </div>

              {/* App Store Buttons - Desktop */}
              <div className="flex gap-3">
                <Link href="#">
                  <Image
                    src="/images/google-play.png"
                    alt="Download on Google Play"
                    width={135}
                    height={40}
                    className="hover:opacity-80 transition"
                  />
                </Link>
                <Link href="#">
                  <Image
                    src="/images/apple-store.png"
                    alt="Download on App Store"
                    width={135}
                    height={40}
                    className="hover:opacity-80 transition"
                  />
                </Link>
              </div>
            </div>

            {/* TOPICS - Desktop */}
            <div className="lg:col-span-2">
              <h5 className="text-white text-lg font-bold mb-6 uppercase tracking-wide">
                Topics
              </h5>
              <ul className="space-y-3 text-sm">
                <li><Link href="/topics/engineer" className="hover:text-white hover:translate-x-1 inline-block transition-all">Engineer</Link></li>
                <li><Link href="/topics/build" className="hover:text-white hover:translate-x-1 inline-block transition-all">Build</Link></li>
                <li><Link href="/topics/maintain" className="hover:text-white hover:translate-x-1 inline-block transition-all">Maintain</Link></li>
                <li><Link href="/topics/manage" className="hover:text-white hover:translate-x-1 inline-block transition-all">Manage</Link></li>
                <li><Link href="/topics" className="hover:text-white hover:translate-x-1 inline-block transition-all font-semibold">View All →</Link></li>
              </ul>
            </div>

            {/* RESOURCES - Desktop */}
            <div className="lg:col-span-2">
              <h5 className="text-white text-lg font-bold mb-6 uppercase tracking-wide">
                Resources
              </h5>
              <ul className="space-y-3 text-sm">
                <li><Link href="/mmtchats" className="hover:text-white hover:translate-x-1 inline-block transition-all">MMT Chats</Link></li>
                <li><Link href="/videos" className="hover:text-white hover:translate-x-1 inline-block transition-all">Videos</Link></li>
                <li><Link href="/news" className="hover:text-white hover:translate-x-1 inline-block transition-all">News</Link></li>
                <li><Link href="/products" className="hover:text-white hover:translate-x-1 inline-block transition-all">Products</Link></li>
                <li><Link href="/podcast" className="hover:text-white hover:translate-x-1 inline-block transition-all">Podcast</Link></li>
              </ul>
            </div>

            {/* MAGAZINE - Desktop */}
            <div className="lg:col-span-2">
              <h5 className="text-white text-lg font-bold mb-6 uppercase tracking-wide">
                Magazine
              </h5>
              <ul className="space-y-3 text-sm">
                <li><Link href="/articles" className="hover:text-white hover:translate-x-1 inline-block transition-all">Latest Issue</Link></li>
                <li><Link href="/" className="hover:text-white hover:translate-x-1 inline-block transition-all">Archives</Link></li>
                <li><Link href="/subscribe" className="hover:text-white hover:translate-x-1 inline-block transition-all">Subscribe</Link></li>
                <li><Link href="/" className="hover:text-white hover:translate-x-1 inline-block transition-all">Renew Subscription</Link></li>
                <li><Link href="/" className="hover:text-white hover:translate-x-1 inline-block transition-all">Customer Service</Link></li>
              </ul>
            </div>

            {/* MORE + CALENDAR - Desktop */}
            <div className="lg:col-span-2">
              <h5 className="text-white text-lg font-bold mb-6 uppercase tracking-wide">
                More
              </h5>
              <ul className="space-y-3 text-sm mb-8">
                <li><Link href="/contact" className="hover:text-white hover:translate-x-1 inline-block transition-all">Contact Us</Link></li>
                <li><Link href="/suppliers" className="hover:text-white hover:translate-x-1 inline-block transition-all">Find a Supplier</Link></li>
              </ul>

              <h5 className="text-white text-lg font-bold mb-6 uppercase tracking-wide">
                Calendar
              </h5>
              <ul className="space-y-3 text-sm">
                <li><Link href="/webinars" className="hover:text-white hover:translate-x-1 inline-block transition-all">Webinars</Link></li>
                <li><Link href="/events" className="hover:text-white hover:translate-x-1 inline-block transition-all">Events</Link></li>
              </ul>
            </div>

          </div>

        </div>
      </div>

      {/* ================= COPYRIGHT BAR ================= */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm">
            
            <Link 
              href="/terms" 
              className="hover:text-white transition-colors order-2 sm:order-1"
            >
              Terms & Agreements
            </Link>

            <p className="text-center order-1 sm:order-2">
              Copyright © 2026 <span className="font-semibold">Molding Trends</span>. All rights reserved.
            </p>

            <Link 
              href="/privacy-policy" 
              className="hover:text-white transition-colors order-3"
            >
              Privacy Policy
            </Link>
            
          </div>
        </div>
      </div>
    </footer>
  )
}