"use client"

import { type ReactNode, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@ui/lib/utils"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  threshold?: number
  once?: boolean
}

export function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })

  const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  }

  const initial = {
    opacity: 0,
    y: directionMap[direction].y,
    x: directionMap[direction].x,
  }

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div
        initial={initial}
        animate={isInView ? { opacity: 1, y: 0, x: 0 } : initial}
        transition={{
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
