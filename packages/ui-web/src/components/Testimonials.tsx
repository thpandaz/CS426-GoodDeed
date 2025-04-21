"use client"

import { Users } from "lucide-react"
import { ScrollReveal } from "./ui/scroll-reveal"
import { ParallaxSection } from "./ui/parallax-section"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Volunteer at City Food Bank",
      quote:
        "VolunteerMatch helped me find a cause I'm passionate about. I've been volunteering at the food bank for 6 months now!",
    },
    {
      name: "Priya Patel",
      role: "Environmental Activist",
      quote:
        "The personalized opportunity recommendations matched my environmental interests perfectly. I found projects I wouldn't have discovered elsewhere.",
    },
    {
      name: "Marcus Williams",
      role: "Volunteer Coordinator at Animal Shelter",
      quote:
        "As an organization, we've found amazing volunteers through VolunteerMatch who truly care about our mission.",
    },
  ]

  return (
    <ParallaxSection
      className="w-full py-12 md:py-24 lg:py-32 bg-secondary-500 text-white"
      direction="down"
      speed={0.15}
    >
      <div className=" px-4 md:px-6">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl font-heading">Success Stories</h2>
              <p className="max-w-[700px] text-white/90 md:text-xl">
                Hear from volunteers and organizations who connected through VolunteerMatch.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <ScrollReveal key={i} delay={i * 0.15} direction="up">
              <div className="flex flex-col items-center space-y-4 rounded-xl bg-secondary-600 p-6 text-center hover:bg-secondary-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="h-16 w-16 rounded-full bg-accent-100 flex items-center justify-center">
                  <Users className="h-8 w-8 text-accent-500" />
                </div>
                <p className="text-white/90">"{testimonial.quote}"</p>
                <div>
                  <h3 className="font-bold">{testimonial.name}</h3>
                  <p className="text-sm text-white/80">{testimonial.role}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </ParallaxSection>
  )
}
