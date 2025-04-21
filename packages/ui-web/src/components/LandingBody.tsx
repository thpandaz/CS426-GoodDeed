"use client"

import { ScrollReveal } from "./ui/scroll-reveal"
import { useEffect, useRef, useState } from "react"
import { cn } from "@ui/lib/utils"

const DynamicEllipse = () => (
  <div className="absolute inset-0 z-10">
    <div
      className="absolute -top-[4rem] left-1/2 transform -translate-x-1/2 from-white from-50% to-transparent bg-gradient-to-b h-[12rem] w-full clip-ellipse"
    />
    <div
      className="absolute -top-[4rem] left-1/2 transform -translate-x-1/2 from-orange-300 to-custom-orange-50 bg-gradient-to-b h-[12rem] w-full clip-ellipse"
    />
  </div>
)

export default function LandingBody() {
  return (
    <section className="relative w-full py-12 md:py-8 lg:py-16">
      <DynamicEllipse />
      <div className="container w-full mt-18 md:mt-20 lg:mt-14  z-20 bg-linear-180 from-custom-orange-50 to-background">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="mt-4 inline-block rounded-lg bg-teal-100 px-3 py-1 text-sm text-teal-700">
                Trusted by Leading Organizations
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl font-heading">
                Be the Change, One Click at a Time
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Thousands of nonprofits and community organizations use VolunteerMatch to find dedicated volunteers.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 py-12 md:grid-cols-6">
          {[
            "Red Cross",
            "Habitat for Humanity",
            "Food Bank",
            "Animal Shelter",
            "Children's Hospital",
            "Environmental Group",
          ].map((org, i) => (
            <ScrollReveal key={i} delay={i * 0.1} direction="up">
              <div className="flex items-center justify-center">
                <img
                  src={'https://placehold.co/120x120'}
                  alt={`${org} logo`}
                  width={120}
                  height={40}
                  className="grayscale transition-all hover:grayscale-0 hover:scale-110 duration-300"
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
