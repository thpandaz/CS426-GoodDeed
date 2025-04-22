"use client"

import React from "react"
import { Button } from "@ui/components/ui/button"
import { Input } from "@ui/components/ui/input"
import { Building2, ChevronRight, Heart, Search } from "lucide-react"
import { motion } from "framer-motion"
import { AnimatedCounter } from "./ui/animated-counter"
import { AnimatedGradient } from "./ui/animated-gradient"
import { volunteerImage } from "@repo/assets"

export default function Hero() {
  return (
    <AnimatedGradient containerClassName="w-full overflow-hidden h-[calc(100vh+20rem)]  md:h-[calc(100vh-6rem)]">
      <section className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12 items-center">
            {/* Text Content */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-secondary-500 font-heading font-family-sans"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Connecting hearts,
                <br />
                Changing lives
              </motion.h1>

              <motion.p
                className="max-w-lg text-secondary-600 md:text-lg font-family-sans font-normal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Connect with meaningful volunteer opportunities that match your skills and passions. Join thousands making positive change in their communities.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary-400" />
                  <Input
                    type="text"
                    placeholder="Search opportunities..."
                    className="pl-10 pr-4 py-3 rounded-full border-accent-200 focus-visible:ring-highlight font-family-sans"
                  />
                </div>

                <Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-white rounded-full px-6 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg font-family-sans">
                  Search <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>

              <motion.p
                className="text-sm text-secondary-500 font-family-sans"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Join over <span className="font-semibold">500,000</span> volunteers and <span className="font-semibold">10,000+</span> organizations
              </motion.p>
            </motion.div>

            {/* Image Content */}
            <div className="flex justify-center">
              <div className="relative">
                <motion.div
                  className="rounded-2xl overflow-hidden shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
                  style={{ aspectRatio: '1 / 1' }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <img
                    src={volunteerImage}
                    alt="Volunteers helping in the community"
                    className="w-full h-full object-cover"
                  />
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
                        <AnimatedCounter value={10000} duration={1000} formatter={val => `${val.toLocaleString()}+`} />
                      </p>
                      <p className="text-xs text-secondary-400 font-family-sans">Organizations</p>
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
                        <AnimatedCounter value={1000000} duration={1000} formatter={val => `${val / 1000000}M+`} />
                      </p>
                      <p className="text-xs text-secondary-400 font-family-sans">Hours Donated</p>
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
