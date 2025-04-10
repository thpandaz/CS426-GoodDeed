import { useEffect, useRef, useState } from "react"
import { cn } from "@ui/lib/utils"

interface AnimatedCounterProps {
  value: number
  duration?: number
  className?: string
  formatter?: (value: number) => string
}

export function AnimatedCounter({
  value,
  duration = 1000,
  className,
  formatter = (value) => value.toString(),
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  const startTimeRef = useRef<number | null>(null)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    startTimeRef.current = null
    countRef.current = 0
    setCount(0)

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp
      }

      const progress = timestamp - startTimeRef.current
      const percentage = Math.min(progress / duration, 1)

      // Easing function for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4)

      const nextCount = Math.floor(easeOutQuart * value)

      if (nextCount !== countRef.current) {
        countRef.current = nextCount
        setCount(nextCount)
      }

      if (percentage < 1) {
        frameRef.current = requestAnimationFrame(animate)
      } else {
        setCount(value)
      }
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [value, duration])

  return <span className={cn(className)}>{formatter(count)}</span>
}
