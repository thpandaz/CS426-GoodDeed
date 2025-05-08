"use client"

import { ScrollReveal } from "./ui/scroll-reveal"
import StickyFeatures from "./StickyFeatures"

const DynamicEllipse = () => (
  <div className="absolute inset-0 z-10">
    <div
      className="absolute -top-[4rem] left-1/2 transform -translate-x-1/2 from-white from-50% to-transparent bg-gradient-to-b h-[12rem] w-full clip-ellipse"
    />
    <div
      className="absolute -top-[4rem] left-1/2 transform -translate-x-1/2 from-custom-orange-200 to-custom-orange-100 bg-gradient-to-b h-[12rem] w-full clip-ellipse"
    />
  </div>
)

export default function LandingBody() {
  return (
    <section className="relative w-full -mt-10 pt-12 md:pt-8 lg:pt-16">
      <DynamicEllipse />
      <div className=" w-full mt-18 md:mt-20 lg:mt-14 z-20 h-120 bg-gradient-to-b from-custom-orange-100 to-custom-orange-50/50">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center text-center">
            <div className="space-y-2">
              <div className="my-4 inline-block rounded-full bg-custom-blue-100 px-3 py-1 text-sm font-medium text-custom-blue-700">
                Trusted by Leading Organizations
              </div>
              <div className="space-y-2">
                <h2 className="text-4xl font-bold tracking-tighter md:text-5xl font-heading text-foreground">
                  Be the Change, One Click at a Time
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl text-foreground font-family-display ">
                  Fuel Gen Z Volunteerism to Transform Communities and Shape a Brighter Future.
                </p>
              </div>
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
        <StickyFeatures />
    </section>
  )
}
