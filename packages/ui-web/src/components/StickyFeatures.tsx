"use client"

import React, { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@ui/lib/utils"
import { Heart, Users, Calendar, Award } from "lucide-react"

interface FeatureItem {
  icon: React.ReactNode
  label: string
  title: string
  description: string
  stat?: {
    value: string
    text: string
  }
  imageUrl: string
  bgColor?: string
}

export default function StickyFeatures() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const features: FeatureItem[] = [
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
      imageUrl: "https://placehold.co/400",
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
      imageUrl: "https://placehold.co/400",
      bgColor: "bg-accent-50",
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
      imageUrl: "https://placehold.co/400",
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
      imageUrl: "https://placehold.co/400",
      bgColor: "bg-highlight-50",
    },
  ]

  return (
    <section className="relative bg-background pb-10" ref={containerRef}>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left side - scrolling panels */}
        <div className="relative z-10 max-w-md mx-auto lg:max-w-full lg:mx-0">
          {features.map((feature, index) => (
            <FeaturePanel
              key={index}
              feature={feature}
              index={index}
              onInView={() => setActiveIndex(index)}
            />
          ))}
        </div>

        {/* Right side - hidden on mobile, sticky on large */}
        <div className="hidden lg:flex lg:sticky lg:top-20 lg:self-start lg:h-[calc(100vh-5rem)] lg:items-center lg:justify-center lg:p-8">
          <div className="relative w-full h-full max-w-[600px] max-h-[600px] rounded-2xl overflow-hidden">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  scale: activeIndex === index ? 1 : 0.9,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <img
                  src={feature.imageUrl}
                  alt={feature.title}
                  className="w-full h-full object-cover rounded-2xl"
                />

                {/* Overlay animation */}
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-transparent"
                />

                <div
                  className="absolute bottom-4 right-4 bg-white p-3 rounded-xl shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    {feature.icon}
                    <span className="font-medium text-secondary-500">{feature.label}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface FeaturePanelProps {
  feature: FeatureItem
  index: number
  onInView: () => void
}

function FeaturePanel({ feature, index, onInView }: FeaturePanelProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: 0.5, once: false })

  if (isInView) onInView()

  return (
    <div
      ref={ref}
      className={cn(
        "min-h-screen flex items-center py-20 px-4 md:px-12 lg:px-16",
        feature.bgColor,
      )}
    >
      <div className="max-w-xl mx-auto lg:mx-0 space-y-8">
        <div className="flex items-center gap-2 text-primary-500 mb-2">
          {feature.icon}
          <span className="text-sm font-semibold uppercase tracking-wider">
            {feature.label}
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-500 font-heading leading-tight">
          {feature.title}
        </h2>

        <p className="text-secondary-600 text-lg md:text-xl">{feature.description}</p>

        {feature.stat && (
          <div className="flex items-baseline gap-4 mt-8">
            <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-500">
              {feature.stat.value}
            </span>
            <span className="text-secondary-600 max-w-sm">
              {feature.stat.text}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
