// DashboardContent.tsx
"use client"

import { useState } from "react"
import { Button } from "@ui/components/ui/button"
import { Alert, AlertClose } from "@ui/components/ui/alert"
import { ChevronDown, Download, X } from "lucide-react"
import { Link } from "react-router-dom"
import ProfileCompletionCard from "./profile-completion-card"
import OpportunityCard from "./opportunity-card"
import ExploreCard from "./explore-card"

export default function DashboardContent() {
  const [volunteerStatus, setVolunteerStatus] = useState("Open to Opportunities")
  const profileCompletion = 100

  // Sample opportunities data
  const opportunities = [
    {
      id: 1,
      title: "Community Garden Volunteer",
      organization: "Green City Initiative",
      logo: "https://placehold.co/80",
      location: "San Francisco, CA",
      postedDate: "2 days ago",
      skills: ["Gardening", "Sustainability"],
      matched: 95,
    },
    {
      id: 2,
      title: "Homeless Shelter Meal Provider",
      organization: "City Hope Center",
      logo: "https://placehold.co/80",
      location: "Chicago, IL",
      postedDate: "1 day ago",
      skills: ["Cooking", "Service"],
      matched: 88,
    },
    {
      id: 3,
      title: "Virtual Tutor for Underserved Students",
      organization: "Education for All",
      logo: "https://placehold.co/80",
      location: "Remote",
      postedDate: "3 days ago",
      skills: ["Teaching", "Mentoring"],
      matched: 92,
    },
  ]

  // Explore cards data
  const exploreCards = [
    {
      title: "Opportunities",
      description: "from top nonprofits and community organizations",
      icon: "https://placehold.co/100",
      href: "/explore",
      color: "bg-blue-100",
    },
    {
      title: "Communities",
      description: "with like-minded volunteers, mentors, and organizers",
      icon: "https://placehold.co/100",
      href: "/communities",
      color: "bg-teal-100",
    },
    {
      title: "Events",
      description: "to spark and continue your volunteer interests",
      icon: "https://placehold.co/100",
      href: "/events",
      color: "bg-orange-100",
    },
    {
      title: "Organizations",
      description: "that value diverse backgrounds and skills",
      icon: "https://placehold.co/100",
      href: "/organizations",
      color: "bg-purple-100",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-secondary-800 mb-8">Welcome, Alex!</h1>

        {/* Volunteer Status */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-secondary-700 mb-2">Your volunteer search status</h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
              <span className="h-2.5 w-2.5 bg-primary-500 rounded-full"></span>
              <span className="font-medium">{volunteerStatus}</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Profile Completion */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-secondary-700 mb-2">Complete your profile</h2>
          <p className="text-secondary-600 mb-4">
            Having a complete profile increases your chances of being matched with the perfect volunteer opportunities.
          </p>
          <div className="flex items-center justify-between mb-2">
            <div className="w-full max-w-3xl">
              <ProfileCompletionCard percentage={profileCompletion} />
            </div>
            <div className="ml-8 hidden md:block">
              <div className="relative h-24 w-24">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary-500">{profileCompletion}%</span>
                </div>
                <svg className="h-24 w-24" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#e6e6e6" strokeWidth="10" strokeLinecap="round" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#00D9B6"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${(profileCompletion / 100) * 283} 283`}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Apply Alert */}
        {/* Explore GoodDeed */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-secondary-800 mb-6">Explore GoodDeed</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {exploreCards.map((card, index) => (
              <ExploreCard key={index} {...card} href={card.href} />
            ))}
          </div>
        </div>

        {/* Opportunities For You */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-secondary-800">Opportunities for You</h2>
            <Link to="/explore" className="text-primary-500 hover:text-primary-600 font-medium text-sm underline">
              View all opportunities
            </Link>
          </div>
          <p className="text-secondary-600 mb-6">
            We've curated these opportunities just for you! As you level up your skills,{" "}
            <Link to="/profile" className="text-primary-500 hover:text-primary-600 underline">
              update your profile
            </Link>{" "}
            for better recommendations.
          </p>

          <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
            {opportunities.map((opportunity, index) => (
              <div key={opportunity.id}>
                <OpportunityCard opportunity={opportunity} />
                {index < opportunities.length - 1 && <hr className="border-gray-200" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
