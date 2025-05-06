import { Badge } from "@repo/ui-web/components/ui/badge"
import { Button } from "@repo/ui-web/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@repo/ui-web/components/ui/card"
import { Bookmark, BookmarkCheck, Calendar, Clock, MapPin, Star } from "lucide-react"
import { useState } from "react"
import { cn } from "@repo/ui-web/lib/utils"
import { Link } from "react-router-dom"
import type { OpportunityType } from "./data.temp"

interface OpportunityListProps {
    opportunities: OpportunityType[]
    view: string
    page: number
    pageSize: number
    totalItems: number
    onPageChange: (newPage: number) => void
  }
  

  export default function OpportunityList({
    opportunities,
    view,
    page,
    pageSize,
    totalItems,
    onPageChange,
  }: OpportunityListProps) {
    const totalPages = Math.ceil(totalItems / pageSize)
  if (opportunities.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Calendar className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium mb-2">No opportunities found</h3>
        <p className="text-gray-500 mb-4">
          Try adjusting your filters or search terms to find more opportunities.
        </p>
        <Button>Clear Filters</Button>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "grid gap-4",
        view === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-2" : "grid-cols-1"
      )}
    >
      {opportunities.map((opportunity) => (
        <OpportunityCard key={opportunity.id} opportunity={opportunity} view={view} />
      ))}
      
    </div>
  )
}

interface OpportunityCardProps {
  opportunity: OpportunityType
  view: string
}

function OpportunityCard({ opportunity, view }: OpportunityCardProps) {
  const [isSaved, setIsSaved] = useState(opportunity.status === "saved")

  const handleSave = () => {
    setIsSaved(!isSaved)
    // In a real app, you would update the backend here
  }

  if (view === "list") {
    return (
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <div className="flex flex-col md:flex-row">
          <div className="p-4 md:p-6 flex-1">
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
                    <h3 className="font-semibold text-secondary-800 text-lg">
                      {opportunity.title}
                    </h3>
                    <p className="text-secondary-600">
                      {opportunity.organization}
                    </p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-secondary-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{opportunity.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{opportunity.commitment}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Posted {opportunity.postedDate}</span>
                      </div>
                    </div>
                  </div>

                  <Badge
                    variant="outline"
                    className="bg-primary-50 text-primary-700 border-primary-200 font-medium"
                  >
                    {opportunity.matched}% Match
                  </Badge>
                </div>

                <p className="text-secondary-600 mt-3 line-clamp-2">
                  {opportunity.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {opportunity.skills.slice(0, 3).map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-gray-100 text-secondary-600"
                    >
                      {skill}
                    </Badge>
                  ))}
                  {opportunity.skills.length > 3 && (
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-secondary-600"
                    >
                      +{opportunity.skills.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 md:p-6 flex md:flex-col justify-between items-center md:items-stretch gap-4 md:w-48 border-t md:border-t-0 md:border-l border-gray-200">
            {opportunity.featured && (
              <div className="flex items-center gap-1 text-accent-500 text-sm font-medium">
                <Star className="h-4 w-4 fill-accent-500" />
                <span>Featured</span>
              </div>
            )}

            <div className="flex md:flex-col gap-2">
              <Link to={`/opportunities/${opportunity.id}`} className="flex-1">
                <Button className="w-full bg-primary-500 hover:bg-primary-600 text-white">
                  {opportunity.status === "applied" ? "Applied" : "Apply Now"}
                </Button>
              </Link>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "flex-shrink-0",
                  isSaved ? "text-accent-500 border-accent-200" : "text-gray-400"
                )}
                onClick={handleSave}
              >
                {isSaved ? (
                  <BookmarkCheck className="h-5 w-5" />
                ) : (
                  <Bookmark className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
              <img
                src={opportunity.logo || "/placeholder.svg"}
                alt={opportunity.organization}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-secondary-800">
                {opportunity.title}
              </h3>
              <p className="text-sm text-secondary-600">
                {opportunity.organization}
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="bg-primary-50 text-primary-700 border-primary-200 font-medium"
          >
            {opportunity.matched}% Match
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <div className="flex items-center gap-4 mb-3 text-xs text-secondary-500">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{opportunity.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{opportunity.commitment}</span>
          </div>
        </div>

        <p className="text-secondary-600 text-sm line-clamp-3">
          {opportunity.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1">
          {opportunity.skills.slice(0, 2).map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="bg-gray-100 text-secondary-600 text-xs"
            >
              {skill}
            </Badge>
          ))}
          {opportunity.skills.length > 2 && (
            <Badge
              variant="secondary"
              className="bg-gray-100 text-secondary-600 text-xs"
            >
              +{opportunity.skills.length - 2} more
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="text-xs text-secondary-500">
          Posted {opportunity.postedDate}
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className={cn("h-8 w-8 p-0", isSaved ? "text-accent-500" : "text-gray-400")}
            onClick={handleSave}
          >
            {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
          </Button>
          <Link to={`/opportunities/${opportunity.id}`}>
            <Button size="sm" className="h-8 bg-primary-500 hover:bg-primary-600 text-white">
              {opportunity.status === "applied" ? "Applied" : "Apply"}
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
