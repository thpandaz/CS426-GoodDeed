"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@ui/lib/utils"
import { ScrollReveal } from "./ui/scroll-reveal"
import { Heart, Users, Calendar, Award } from "lucide-react"

interface FeatureProps {
  icon: React.ReactNode
  label: string
  title: string
  description: string
  stat?: {
    value: string
    text: string
  }
  imageUrl: string
  reverse?: boolean
  bgColor?: string
}

const Feature = ({
  icon,
  label,
  title,
  description,
  stat,
  imageUrl,
  reverse = false,
  bgColor = "bg-white",
}: FeatureProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const yProgress = useTransform(scrollYProgress, [0, 1], [0, 100])
  const yProgressReverse = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacityProgress = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.6, 1, 1, 0.6])

  const y = reverse ? yProgress : yProgressReverse
  const opacity = opacityProgress

  return (
    <section ref={containerRef} className={cn("py-24 md:py-32 overflow-hidden", bgColor)}>
      <div className="container px-4 md:px-6">
        <div
          className={cn(
            "grid gap-8 lg:gap-16 items-center",
            reverse ? "lg:grid-cols-[1fr_1.2fr]" : "lg:grid-cols-[1.2fr_1fr]",
          )}
        >
          <div className={cn("space-y-8", reverse && "lg:order-2")}>
            <ScrollReveal>
              <div className="flex items-center gap-2 text-primary-500 mb-2">
                {icon}
                <span className="text-sm font-semibold uppercase tracking-wider">{label}</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-500 font-heading leading-tight">
                {title}
              </h2>
              <p className="text-secondary-600 text-lg md:text-xl max-w-xl">{description}</p>
            </ScrollReveal>

            {stat && (
              <ScrollReveal delay={0.2}>
                <div className="flex items-baseline gap-4 mt-8">
                  <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-500">{stat.value}</span>
                  <span className="text-secondary-600 max-w-sm">{stat.text}</span>
                </div>
              </ScrollReveal>
            )}
          </div>

          <div className={cn("relative h-[400px] md:h-[500px] lg:h-[600px]", reverse && "lg:order-1")}>
            <motion.div
              className="absolute inset-0 rounded-2xl overflow-hidden"
              style={{
                y: reverse ? y : y.interpolate((value) => -value),
                opacity,
              }}
            >
              <img
                src={imageUrl || "/placeholder.svg"}
                alt={title}
                className="w-full h-full object-cover rounded-2xl"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function FeatureSection() {
  const features: FeatureProps[] = [
    {
      icon: <Heart className="h-5 w-5" />,
      label: "Community Impact",
      title: "Make a difference in countless ways from one platform.",
      description:
        "VolunteerMatch is built for connecting passionate volunteers with meaningful opportunities. Find causes you care about, join community projects, and track your impact.",
      stat: {
        value: "80%",
        text: "of volunteers find opportunities that align with their personal values and skills through our platform",
      },
      imageUrl: "/placeholder.svg?height=600&width=800&text=Community+Impact",
      bgColor: "bg-accent-50",
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Organization Management",
      title: "Manage volunteers and grow your impact faster.",
      description:
        "Recruit dedicated volunteers, manage projects efficiently, and measure your organization's impact. VolunteerMatch brings every aspect of volunteer management together in one place.",
      stat: {
        value: "47%",
        text: "increase in volunteer retention for organizations using our platform",
      },
      imageUrl: "/placeholder.svg?height=600&width=800&text=Organization+Management",
      reverse: true,
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Event Coordination",
      title: "Organize impactful events with the right volunteers.",
      description:
        "Create, promote, and manage volunteer events with ease. Find the perfect volunteers based on skills, interests, and availability to make your events successful.",
      stat: {
        value: "3x",
        text: "more volunteer sign-ups for events posted on our platform compared to traditional recruitment methods",
      },
      imageUrl: "/placeholder.svg?height=600&width=800&text=Event+Coordination",
      bgColor: "bg-highlight-50",
    },
    {
      icon: <Award className="h-5 w-5" />,
      label: "Skill Development",
      title: "Build skills while making a difference in your community.",
      description:
        "Gain valuable experience, develop new skills, and enhance your resume through meaningful volunteer work. Track your hours and get recognition for your contributions.",
      stat: {
        value: "92%",
        text: "of volunteers report learning new skills that benefit their personal and professional development",
      },
      imageUrl: "/placeholder.svg?height=600&width=800&text=Skill+Development",
      reverse: true,
    },
  ]

  return (
    <>
      {features.map((feature, index) => (
        <Feature key={index} {...feature} />
      ))}
    </>
  )
}
