"use client"

import { Button } from "@ui/components/ui/button"
import { Input } from "@ui/components/ui/input"
import { Building2, ChevronRight, Heart, Search } from "lucide-react"
import { motion } from "framer-motion"
import { AnimatedCounter } from "./ui/animated-counter"
import { AnimatedGradient } from "./ui/animated-gradient"

export default function Hero() {
  return (
    <AnimatedGradient containerClassName="w-full py-44 md:py-48 lg:py-52">
      <section className="relative z-10">
        <motion.div
          className="absolute top-20 left-[10%] w-64 h-64 bg-primary-300 rounded-full opacity-30 blur-[80px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute bottom-20 right-[10%] w-80 h-80 bg-highlight-300 rounded-full opacity-30 blur-[80px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 2,
          }}
        />

        <motion.div
          className="absolute top-[40%] right-[30%] w-72 h-72 bg-accent-300 rounded-full opacity-30 blur-[80px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 9,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
        />

        {/* Removed lg:text-left so text stays centered on all screens */}
        <div className="container mx-auto px-4 md:px-6 -mt-18">
          <div className="grid gap-4 pl-10 lg:grid-cols-2 lg:gap-12 items-center justify-items-center">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl leading-none text-secondary-500 font-heading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Connecting hearts Changing lives
              </motion.h1>
              <motion.p
                className="max-w-[600px] text-secondary-600 md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Connect with meaningful volunteer opportunities that match your skills and passions.
                Join thousands making positive change in their communities.
              </motion.p>
                <motion.div
                className="flex flex-col sm:flex-row items-center gap-4 mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                >
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
                  <Input
                  type="text"
                  placeholder="Search opportunities..."
                  className="pl-10 pr-4 py-6 rounded-full border-accent-200 focus-visible:ring-highlight"
                  />
                </div>
                <Button
                  size="lg"
                  className="bg-primary-500/80 hover:bg-primary-500 text-white rounded-full px-8 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Search
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                </motion.div>
              <motion.p
                className="text-sm text-secondary-500 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Join over <span className="font-bold">500,000</span> volunteers and{" "}
                <span className="font-bold">10,000+</span> organizations
              </motion.p>
            </motion.div>

            <div className="flex justify-center">
              <div className="relative mx-auto">
                <motion.div
                  className="relative h-[350px] w-[350px] md:h-[400px] md:w-[400px]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <img
                    src="https://placehold.co/400"
                    alt="Volunteers helping in the community"
                    width={400}
                    height={400}
                    className="rounded-2xl object-cover shadow-xl w-full h-full"
                  />
                  <motion.div className="absolute inset-0 rounded-2xl border-2 border-highlight/30" />
                </motion.div>
                <motion.div
                  className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg"
                  initial={{ opacity: 0, x: -20, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <div className="flex items-center gap-2">
                    <div className="bg-accent-100 p-2 rounded-full">
                      <Building2 className="h-5 w-5 text-accent-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-secondary-500">
                        <AnimatedCounter
                          value={10000}
                          duration={1000}
                          formatter={(val) => `${val.toLocaleString()}+`}
                        />
                      </p>
                      <p className="text-xs text-secondary-400">Organizations</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg"
                  initial={{ opacity: 0, x: 20, y: -20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <div className="flex items-center gap-2">
                    <div className="bg-highlight-100 p-2 rounded-full">
                      <Heart className="h-5 w-5 text-highlight" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-secondary-500">
                        <AnimatedCounter
                          value={1000000}
                          duration={1000}
                          formatter={(val) => `${val / 1000000}M+`}
                        />
                      </p>
                      <p className="text-xs text-secondary-400">Hours Donated</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimatedGradient>
  )
}
