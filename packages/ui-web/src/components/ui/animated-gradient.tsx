"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { cn } from "@ui/lib/utils"

export function AnimatedGradient({
  className,
  containerClassName,
  children,
}: {
  className?: string
  containerClassName?: string
  children: React.ReactNode
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect()
      const x = (e.clientX - left) / width
      const y = (e.clientY - top) / height

      container.style.setProperty("--x-pos", `${x * 100}%`)
      container.style.setProperty("--y-pos", `${y * 100}%`)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", containerClassName)}>
        <div
            className={cn(
                "absolute inset-0 bg-gradient-to-br from-accent-300/30 via-white/100 to-highlight-300/30 opacity-80 blur-[100px] transition-opacity duration-500 ease-in-out group-hover:opacity-90",
                "animate-gradient-fast",
                className,
            )}
            style={{
                backgroundPosition: "var(--x-pos, 0) var(--y-pos, 0)",
                backgroundSize: "200% 200%",
            }}
        />
        {children}
    </div>
  )
}
