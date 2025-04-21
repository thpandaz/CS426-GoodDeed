"use client"

import { Calendar, Heart, Search } from "lucide-react"
import { motion } from "framer-motion"
import { ParallaxSection } from "./ui/parallax-section"
import { ScrollReveal } from "./ui/scroll-reveal"

export default function HowItWorks() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <ParallaxSection className="w-full py-12 md:py-24 lg:py-32 bg-accent-50" speed={0.1}>
      <div className=" px-4 md:px-6">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-secondary-500 font-heading">
                How VolunteerMatch Works
              </h2>
              <p className="max-w-[700px] text-secondary-600 md:text-xl">
                Your all-in-one platform for finding and managing volunteer opportunities.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <motion.div
          className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <ScrollReveal delay={0.1} direction="up">
            <motion.div
              className="flex flex-col items-center space-y-4 text-center"
              variants={item}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-100 transition-transform duration-300 hover:scale-110">
                <Search className="h-8 w-8 text-accent-500" />
              </div>
              <h3 className="text-xl font-bold text-secondary-500">Find Opportunities</h3>
              <p className="text-secondary-600">
                Search for volunteer opportunities that match your skills, interests, and availability.
              </p>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} direction="up">
            <motion.div
              className="flex flex-col items-center space-y-4 text-center"
              variants={item}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 transition-transform duration-300 hover:scale-110">
                <Heart className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-bold text-secondary-500">Apply & Connect</h3>
              <p className="text-secondary-600">
                Reach out to organizations and apply for opportunities that inspire you.
              </p>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.3} direction="up">
            <motion.div
              className="flex flex-col items-center space-y-4 text-center"
              variants={item}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-highlight-100 transition-transform duration-300 hover:scale-110">
                <Calendar className="h-8 w-8 text-highlight" />
              </div>
              <h3 className="text-xl font-bold text-secondary-500">Track Your Impact</h3>
              <p className="text-secondary-600">
                Log your volunteer hours and see the difference you're making in your community.
              </p>
            </motion.div>
          </ScrollReveal>
        </motion.div>
      </div>
    </ParallaxSection>
  )
}
