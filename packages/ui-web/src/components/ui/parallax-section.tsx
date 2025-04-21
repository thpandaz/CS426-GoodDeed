"use client"

import { type ReactNode, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@ui/lib/utils"

interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  direction?: "up" | "down"
  speed?: number
  opacity?: boolean
  scale?: boolean
}

export function ParallaxSection({
  children,
  className,
  direction = "up",
  speed = 0.2,
  opacity = true,
  scale = false,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const yRange = direction === "up" ? [speed * 100, -speed * 100] : [-speed * 100, speed * 100]
  const y = useTransform(scrollYProgress, [0, 1], yRange)

  const opacityRange = opacity ? [0.4, 1] : [1, 1]
  const opacityValue = useTransform(scrollYProgress, [0, 0.5], opacityRange)

  const scaleRange = scale ? [0.95, 1] : [1, 1]
  const scaleValue = useTransform(scrollYProgress, [0, 0.5], scaleRange)

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        style={{
          y,
          opacity: opacityValue,
          scale: scaleValue,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>
    </div>
  )
}
