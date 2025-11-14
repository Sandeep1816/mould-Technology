"use client";

import Link from "next/link";
import { Search, Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMega, setOpenMega] = useState<"topics" | "resources" | null>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMega = (menu: "topics" | "resources") => {
    setOpenMega(openMega === menu ? null : menu);
  };

  return (
    <>
      {/* HEADER */}
      <header
        className={`bg-[#004d73] text-white w-full z-50 transition-all duration-300 ${
          isSticky ? "fixed top-0 shadow-md" : "relative"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <div className="text-lg font-black leading-tight text-white">
              MoldMaking
              <div className="text-xs tracking-widest">TECHNOLOGY.</div>
            </div>
          </Link>

          <div className="flex-1" />

          {/* NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => toggleMega("topics")}
              className="flex items-center gap-1 text-sm font-bold hover:text-gray-200"
            >
              TOPICS
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${
                  openMega === "topics" ? "rotate-180" : ""
                }`}
              />
            </button>

            <button
              onClick={() => toggleMega("resources")}
              className="flex items-center gap-1 text-sm font-bold hover:text-gray-200"
            >
              RESOURCES
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${
                  openMega === "resources" ? "rotate-180" : ""
                }`}
              />
            </button>

            <Link href="#" className="text-sm font-bold hover:text-gray-200">
              MAGAZINE
            </Link>
            <Link href="#" className="text-sm font-bold hover:text-gray-200">
              MMT CHATS
            </Link>
            <Link href="#" className="text-sm font-bold hover:text-gray-200">
              LEADTIME LEADERS
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-4 ml-6">
          <Link href="/subscribe">
           <button className="hidden md:block bg-red-600 hover:bg-red-700 text-white px-5 py-1.5 text-sm font-bold rounded">
              SUBSCRIBE
            </button>
          
          </Link>

            <button className="text-white hover:text-gray-200">
              <Search size={20} />
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white hover:text-gray-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* SLIDING MEGA MENU */}
        <div
          className={`overflow-hidden transition-[max-height] duration-500 bg-[#004d73] ${
            openMega ? "max-h-[650px]" : "max-h-0"
          }`}
        >
          {openMega && (
            <div className="flex w-full shadow-lg border-t border-blue-800">
              {/* LEFT SIDEBAR (Exact like screenshot) */}
              <div className="w-72 bg-[#003c59] py-6 border-r border-blue-900">
                {openMega === "topics" && (
                  <div className="space-y-1">
                    {["ENGINEER", "BUILD", "MAINTAIN", "MANAGE", "ALL TOPICS"].map(
                      (item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-4 px-6 text-lg font-semibold text-white hover:bg-[#004d73] cursor-pointer"
                        >
                          {item}
                          <ChevronRight size={18} />
                        </div>
                      )
                    )}
                  </div>
                )}

                {openMega === "resources" && (
                  <div className="space-y-1">
                    {["WEBINARS", "VIDEOS", "EVENTS", "SUPPLIERS", "BASICS/101"].map(
                      (item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-4 px-6 text-lg font-semibold text-white hover:bg-[#004d73] cursor-pointer"
                        >
                          {item}
                          <ChevronRight size={18} />
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* RIGHT CONTENT AREA */}
              <div className="flex-1 p-8">
                {/* TOP HEADING BAR EXACT LIKE SCREENSHOT */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold tracking-wide uppercase">
                    {openMega === "topics" ? "ENGINEER" : "WEBINARS"}
                  </h2>

                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 text-sm font-bold flex items-center gap-1 rounded">
                    SEE ALL <ChevronRight size={16} />
                  </button>
                </div>

                {/* CONTENT CARDS GRID – EXACT 4-COLUMN */}
                <div className="grid grid-cols-4 gap-8">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="max-w-xs">
                      <div className="w-full h-40 bg-white"></div>

                      <div className="text-xs text-blue-200 mt-3 tracking-wide">
                        ON DEMAND
                      </div>

                      <div className="text-lg font-bold mt-1 leading-snug">
                        Sample Webinar Title {i}
                      </div>

                      <div className="text-sm text-blue-100 mt-2 leading-relaxed">
                        Short description text goes exactly like the example screenshot...
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Red Tagline */}
      <div className="bg-red-700 text-white font-semibold text-xs px-3 py-1.5 max-w-max ml-5 mt-0 rounded-tr-md shadow-sm">
        What's New and What Works in Mold Manufacturing
      </div>
    </>
  );
}
