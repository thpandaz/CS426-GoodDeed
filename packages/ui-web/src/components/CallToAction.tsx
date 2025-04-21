"use client"

import { Button } from "@ui/components/ui/button"
import { motion } from "framer-motion"
import { ScrollReveal } from "./ui/scroll-reveal"

export default function CallToAction() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-primary-500 text-white overflow-hidden">
      <div className=" px-4 md:px-6 relative">
        {/* Enhanced animated background elements */}
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-primary-400 rounded-full opacity-40 blur-[120px]"
          animate={{
            x: [0, 70, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary-600 rounded-full opacity-40 blur-[120px]"
          animate={{
            x: [0, -90, 0],
            y: [0, -60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent-500 rounded-full opacity-20 blur-[150px]"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        <ScrollReveal className="relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <motion.h2
                className="text-3xl font-bold tracking-tighter md:text-4xl font-heading"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Ready to Make a Difference?
              </motion.h2>
              <motion.p
                className="max-w-[700px] text-white/90 md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Join thousands of volunteers and organizations creating positive change in communities everywhere.
              </motion.p>
            </div>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 min-[400px]:flex-row"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-white text-primary-500 hover:bg-accent-50 transition-all duration-300 hover:shadow-lg"
                >
                  Sign Up Now
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-primary-600 transition-all duration-300"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
