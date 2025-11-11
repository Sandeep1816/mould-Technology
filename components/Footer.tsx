import Link from "next/link"
import { Linkedin, Facebook, Youtube, Twitter, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full">
      {/* Main Footer Content */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Main Grid - Logo + 4 Columns + Calendar */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
            {/* Logo & Description */}
            <div className="lg:col-span-1">
              <div className="mb-4">
                <h2 className="text-2xl font-black text-gray-900 leading-tight">MoldMaking</h2>
                <p className="text-xs font-bold tracking-widest text-gray-900">TECHNOLOGY.</p>
              </div>
              <p className="text-sm text-gray-700 mb-6 leading-relaxed">
                <span className="font-semibold">MoldMaking Technology</span> addresses the complete life cycle of the
                manufacture and maintenance of a mold—from design to first shot—by providing solutions and strategies to
                moldmaking professionals charged with designing, building and repairing molds. All original technical
                content on our sites and in our publications is created by Gardner Business Media staff and contributing
                writers.{" "}
                <Link href="#" className="font-bold hover:underline">
                  About Us ›
                </Link>
              </p>
              <p className="text-xs font-bold text-gray-900 mb-3">FOLLOW US</p>
              <div className="flex gap-2">
                <a
                  href="#"
                  className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white hover:bg-blue-700 rounded"
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white hover:bg-blue-700 rounded"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center w-8 h-8 bg-red-600 text-white hover:bg-red-700 rounded"
                >
                  <Youtube size={16} />
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center w-8 h-8 bg-black text-white hover:bg-gray-800 rounded"
                >
                  <Twitter size={16} />
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:opacity-90 rounded"
                >
                  <Instagram size={16} />
                </a>
              </div>
            </div>

            {/* Topics */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wide">Topics</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-700 hover:text-blue-600 transition">
                    Engineer
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-700 hover:text-blue-600 transition">
                    Build
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-700 hover:text-blue-600 transition">
                    Maintain
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-700 hover:text-blue-600 transition">
                    Manage
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-700 hover:text-blue-600 transition">
                    View All
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wide">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-700 hover:text-blue-600 transition">
                    MMT Chats
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-700 hover:text-blue-600 transition">
                    Videos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-700 hover:text-blue-600 transition">
                    News
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-700 hover:text-blue-600 transition">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-700 hover:text-blue-600 transition">
                    Podcast
                  </Link>
                </li>
              </ul>
            </div>

            {/* Magazine */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wide">Magazine</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-700 hover:text-blue-600 transition">
                    Latest Issue
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-700 hover:text-blue-600 transition">
                    Archives
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-700 hover:text-blue-600 transition">
                    Subscribe
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-700 hover:text-blue-600 transition">
                    Renew Subscription
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-700 hover:text-blue-600 transition">
                    Subscription Customer Service
                  </Link>
                </li>
              </ul>
            </div>

            {/* More */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wide">More</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-700 hover:text-blue-600 transition">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-700 hover:text-blue-600 transition">
                    Find a Supplier
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-700 hover:text-blue-600 transition">
                    Editorial Guidelines
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-700 hover:text-blue-600 transition">
                    Leadtime Leader
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-700 hover:text-blue-600 transition">
                    Ask the Expert
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-700 hover:text-blue-600 transition">
                    30 Under 30
                  </Link>
                </li>
              </ul>
            </div>

            {/* Calendar */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wide">Calendar</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-700 hover:text-blue-600 transition">
                    Webinars
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-700 hover:text-blue-600 transition">
                    Events
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-300 my-8"></div>

          {/* Copyright & Bottom Links */}
          <div className="flex flex-col md:flex-row items-center justify-between text-xs text-gray-600 mb-8">
            <p>
              © 2025 Gardner Business Media, Inc. | 6915 Valley Ave | Cincinnati, OH | 45244 USA | PH (513) 527-8800
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="#" className="hover:text-blue-600 transition">
                Advertise
              </Link>
              <Link href="#" className="hover:text-blue-600 transition">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-blue-600 transition">
                Site Map
              </Link>
              <Link href="#" className="hover:text-blue-600 transition">
                [Log In]
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Dark Footer Bar */}
      <div className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-6 overflow-x-auto text-xs font-semibold">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">
                G
              </div>
              <span>GARDNER</span>
            </div>
            <span className="text-gray-500">|</span>
            <Link href="#" className="hover:text-blue-400 transition whitespace-nowrap">
              Modern Machine Shop
            </Link>
            <span className="text-gray-500">|</span>
            <Link href="#" className="hover:text-blue-400 transition whitespace-nowrap">
              MoldMaking Technology
            </Link>
            <span className="text-gray-500">|</span>
            <Link href="#" className="hover:text-blue-400 transition whitespace-nowrap">
              Additive Manufacturing
            </Link>
            <span className="text-gray-500">|</span>
            <Link href="#" className="hover:text-blue-400 transition whitespace-nowrap">
              CompositsWorld
            </Link>
            <span className="text-gray-500">|</span>
            <Link href="#" className="hover:text-blue-400 transition whitespace-nowrap">
              Products Finishing
            </Link>
            <span className="text-gray-500">|</span>
            <Link href="#" className="hover:text-blue-400 transition whitespace-nowrap">
              Production Machining
            </Link>
            <span className="text-gray-500">|</span>
            <Link href="#" className="hover:text-blue-400 transition whitespace-nowrap">
              Plastics Technology
            </Link>
            <span className="text-gray-500">|</span>
            <Link href="#" className="hover:text-blue-400 transition whitespace-nowrap">
              Gardner Intelligence
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
