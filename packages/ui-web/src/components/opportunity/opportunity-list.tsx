import { Badge } from "@repo/ui-web/components/ui/badge"
import { Button } from "@repo/ui-web/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@repo/ui-web/components/ui/card"
import { Bookmark, BookmarkCheck, Calendar, Clock, MapPin, Star } from "lucide-react"
import { useState } from "react"
import { cn } from "@repo/ui-web/lib/utils"
import { Link } from "react-router-dom"
import type { OpportunityType } from "./data.temp"
import { OpportunityListSkeleton } from "./opportunity-skeleton"

interface OpportunityListProps {
    opportunities: OpportunityType[]
    view: string
    page: number
    pageSize: number
    totalItems: number
    isLoading?: boolean
    onPageChange: (newPage: number) => void
}

export default function OpportunityList({
    opportunities,
    view,
    page,
    pageSize,
    totalItems,
    isLoading = false,
    onPageChange,
}: OpportunityListProps) {
    const totalPages = Math.ceil(totalItems / pageSize)
    
    if (isLoading) {
        return <OpportunityListSkeleton view={view as "grid" | "list"} />
    }
    
    if (opportunities.length === 0) {
        return (
            <div className="bg-white/95 rounded-lg border border-gray-200/60 p-10 text-center shadow-sm">
                <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <Calendar className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-3 text-secondary-800">No opportunities found</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    Try adjusting your filters or search terms to find more opportunities.
                </p>
                <Button className="bg-primary-500 hover:bg-primary-600 text-white shadow-sm">Clear Filters</Button>
            </div>
        )
    }

    return (
        <div
            className={cn(
                "grid gap-6",
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
        // Here you would typically call an API to save/unsave the opportunity
    }

    return (
        <Card className="group transition-all duration-300 hover:shadow-md border-gray-200/50">
            <CardHeader className="p-5 pb-0">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
                            {opportunity.logo ? (
                                <img 
                                    src={opportunity.logo} 
                                    alt={opportunity.organization}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="text-secondary-500 font-medium text-sm">
                                    {opportunity.organization.substring(0, 2).toUpperCase()}
                                </div>
                            )}
                        </div>
                        <div className="min-w-0">
                            <h3 className="font-medium text-base text-secondary-800 group-hover:text-primary-600 transition-colors duration-300 truncate">
                                {opportunity.title}
                            </h3>
                            <p className="text-sm text-secondary-500 truncate">
                                {opportunity.organization}
                            </p>
                        </div>
                    </div>
                    <Badge
                        variant="outline"
                        className="flex-shrink-0 bg-primary-50/80 text-primary-700 border-primary-200/50 text-xs font-medium px-2.5 py-0.5"
                    >
                        {opportunity.matched}% Match
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="p-5">
                <div className="flex flex-wrap gap-3 mb-4 text-xs text-secondary-500">
                    <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-secondary-400" />
                        <span>{opportunity.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-secondary-400" />
                        <span>{opportunity.commitment}</span>
                    </div>
                </div>

                <p className="text-secondary-600 text-sm line-clamp-2 mb-4">
                    {opportunity.description}
                </p>

                <div className="flex flex-wrap gap-2">
                    {opportunity.skills.slice(0, 3).map((skill) => (
                        <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-gray-50/90 text-secondary-600 text-xs border-gray-100/70"
                        >
                            {skill}
                        </Badge>
                    ))}
                    {opportunity.skills.length > 3 && (
                        <Badge
                            variant="secondary"
                            className="bg-gray-50/90 text-secondary-600 text-xs border-gray-100/70"
                        >
                            +{opportunity.skills.length - 3} more
                        </Badge>
                    )}
                </div>
            </CardContent>

            <CardFooter className="p-5 pt-0 flex items-center justify-between">
                <span className="text-xs text-secondary-500">
                    Posted {opportunity.postedDate}
                </span>
                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                            "h-9 w-9 p-0", 
                            isSaved 
                                ? "text-accent-500 bg-accent-50/50 hover:bg-accent-50" 
                                : "text-gray-400 hover:text-accent-500"
                        )}
                        onClick={handleSave}
                    >
                        {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                    </Button>
                    <Link to={`/opportunities/${opportunity.id}`}>
                        <Button 
                            size="sm" 
                            className={cn(
                                "h-9 px-4",
                                opportunity.status === "applied"
                                    ? "bg-secondary-100 text-secondary-700 hover:bg-secondary-200"
                                    : "bg-primary-500 hover:bg-primary-600 text-white"
                            )}
                        >
                            {opportunity.status === "applied" ? "Applied" : "Apply"}
                        </Button>
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}
