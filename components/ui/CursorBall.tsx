"use client"

import { useEffect, useRef } from "react"

export default function CursorBall() {
  const ballRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const pos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    window.addEventListener("mousemove", handleMouseMove)

    const animate = () => {
      // smooth follow
      pos.current.x += (mouse.current.x - pos.current.x) * 0.1
      pos.current.y += (mouse.current.y - pos.current.y) * 0.1

      if (ballRef.current) {
        ballRef.current.style.transform = `translate3d(
          ${pos.current.x - 10}px,
          ${pos.current.y - 10}px,
          0
        )`
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={ballRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999]
                 w-3 h-3 rounded-full
                 bg-blue-500/40 mix-blend-difference backdrop-blur-sm
                 transition-colors duration-1000 ease-in-out"
    />
  )
}
