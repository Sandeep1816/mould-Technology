import Link from "next/link"
import { Linkedin, Facebook, Youtube, Twitter, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <div className="text-xl font-black mb-4">
              <div className="text-gray-900">MoldMaking</div>
              <div className="text-xs tracking-widest">TECHNOLOGY.</div>
            </div>
            <p className="text-sm text-gray-700 mb-6 leading-relaxed">
              MoldMaking Technology addresses the complete life cycle of the manufacture and maintenance of a mold—from
              design to first shot—by providing solutions and strategies to moldmaking professionals.
            </p>
            <p className="text-xs text-gray-600 mb-4">About Us ›</p>
            <p className="text-xs font-bold text-gray-900 mb-2">FOLLOW US</p>
            <div className="flex gap-3">
              <a href="#" className="text-teal-700 hover:text-teal-900">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-teal-700 hover:text-teal-900">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-teal-700 hover:text-teal-900">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-teal-700 hover:text-teal-900">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-teal-700 hover:text-teal-900">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Topics */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">TOPICS</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-700 hover:text-teal-700">
                  Engineer
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-teal-700">
                  Build
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-teal-700">
                  Maintain
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-teal-700">
                  Manage
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-teal-700">
                  View All
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">RESOURCES</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-700 hover:text-teal-700">
                  MMT Chats
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-teal-700">
                  Videos
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-teal-700">
                  News
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-teal-700">
                  Products
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-teal-700">
                  Podcast
                </Link>
              </li>
            </ul>
          </div>

          {/* Magazine */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">MAGAZINE</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-700 hover:text-teal-700">
                  Latest Issue
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-teal-700">
                  Archives
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-teal-700">
                  Subscribe
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-teal-700">
                  Renew Subscription
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-teal-700">
                  Subscription Customer Service
                </Link>
              </li>
            </ul>
          </div>

          {/* More */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">MORE</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-700 hover:text-teal-700">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-teal-700">
                  Find a Supplier
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-teal-700">
                  Editorial Guidelines
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-teal-700">
                  Leadtime Leader
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-teal-700">
                  Ask the Expert
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-teal-700">
                  30 Under 30
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="mb-12">
          <h3 className="font-bold text-gray-900 mb-4">CALENDAR</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="text-gray-700 hover:text-teal-700">
                Webinars
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-700 hover:text-teal-700">
                Events
              </Link>
            </li>
          </ul>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 pt-6 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} MoldMaking Technology. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
