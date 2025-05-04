"use client"

import { Badge } from "@ui/components/ui/badge"
import { Button } from "@ui/components/ui/button"
import { Bookmark, MapPin } from "lucide-react"
import { useState } from "react"

interface OpportunityCardProps {
  opportunity: {
    id: number
    title: string
    organization: string
    logo: string
    location: string
    postedDate: string
    skills: string[]
    matched: number
  }
}

export default function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const [saved, setSaved] = useState(false)

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
          <img
            src={opportunity.logo || "/placeholder.svg"}
            alt={opportunity.organization}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-secondary-800">{opportunity.title}</h3>
              <p className="text-secondary-600">{opportunity.organization}</p>
              <div className="flex items-center gap-4 mt-1 text-sm text-secondary-500">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{opportunity.location}</span>
                </div>
                <div>Posted {opportunity.postedDate}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-primary-50 text-primary-700 border-primary-200 font-medium">
                {opportunity.matched}% Match
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                className={saved ? "text-accent-500" : "text-gray-400"}
                onClick={() => setSaved(!saved)}
              >
                <Bookmark className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {opportunity.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="bg-gray-100 text-secondary-600">
                {skill}
              </Badge>
            ))}
          </div>

          <div className="mt-4">
            <Button className="bg-primary-500 hover:bg-primary-600 text-white">Apply Now</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
