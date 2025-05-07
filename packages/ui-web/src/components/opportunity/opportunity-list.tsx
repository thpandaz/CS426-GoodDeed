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

    if (view === "list") {
        return (
            <Card className="overflow-hidden hover:shadow-md transition-all duration-300 border-gray-200/50 group">
                <div className="flex flex-col md:flex-row">
                    <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shadow-sm overflow-hidden group-hover:shadow-md transition-all duration-300">
                                    {opportunity.logoUrl ? (
                                        <img 
                                            src={opportunity.logoUrl} 
                                            alt={opportunity.organization} 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="text-lg font-bold text-primary-500">
                                            {opportunity.organization.substring(0, 2).toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-medium text-lg text-secondary-800 group-hover:text-primary-600 transition-colors duration-300">
                                        {opportunity.title}
                                    </h3>
                                    <p className="text-secondary-500 text-sm mt-1">
                                        {opportunity.organization}
                                    </p>
                                </div>
                            </div>
                            <Badge
                                variant="outline"
                                className="bg-primary-50/80 text-primary-700 border-primary-200/50 font-medium px-3 py-1 shadow-sm"
                            >
                                {opportunity.matched}% Match
                            </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-2 text-xs text-secondary-500">
                                <MapPin className="h-3.5 w-3.5 text-secondary-400" />
                                <span>{opportunity.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-secondary-500">
                                <Clock className="h-3.5 w-3.5 text-secondary-400" />
                                <span>{opportunity.commitment}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-secondary-500">
                                <Calendar className="h-3.5 w-3.5 text-secondary-400" />
                                <span>Posted {opportunity.postedDate}</span>
                            </div>
                        </div>

                        <p className="text-secondary-600 text-sm line-clamp-2 mb-5">
                            {opportunity.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {opportunity.skills.slice(0, 3).map((skill) => (
                                <Badge
                                    key={skill}
                                    variant="secondary"
                                    className="bg-gray-50/90 text-secondary-600 text-xs border-gray-100/70 py-1 px-2.5"
                                >
                                    {skill}
                                </Badge>
                            ))}
                            {opportunity.skills.length > 3 && (
                                <Badge
                                    variant="secondary"
                                    className="bg-gray-50/90 text-secondary-600 text-xs border-gray-100/70 py-1 px-2.5"
                                >
                                    +{opportunity.skills.length - 3} more
                                </Badge>
                            )}
                        </div>
                    </div>

                    <div className="bg-gray-50/70 p-6 md:p-5 flex md:flex-col justify-between items-center md:items-end gap-4 md:w-48 border-t md:border-t-0 md:border-l border-gray-200/50">
                        <div className="text-xs text-secondary-500 hidden md:block">
                            Actions
                        </div>
                        <div className="flex md:flex-col gap-3 w-full md:w-auto items-center md:items-end">
                            <Button
                                variant="ghost"
                                size="sm"
                                className={cn(
                                    "h-9 w-9 p-0 rounded-md",
                                    isSaved ? "text-accent-500 bg-accent-50/50" : "text-gray-400 hover:text-accent-500"
                                )}
                                onClick={handleSave}
                            >
                                {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                            </Button>
                            <Link to={`/opportunities/${opportunity.id}`} className="w-full md:w-auto">
                                <Button
                                    size="sm"
                                    className="h-9 bg-primary-500 hover:bg-primary-600 text-white shadow-sm w-full md:w-auto"
                                >
                                    {opportunity.status === "applied" ? "Applied" : "Apply"}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

    return (
        <Card className="overflow-hidden hover:shadow-md transition-all duration-300 border-gray-200/50 group">
            <CardHeader className="p-6 pb-0">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shadow-sm overflow-hidden group-hover:shadow-md transition-all duration-300">
                            {opportunity.logoUrl ? (
                                <img 
                                    src={opportunity.logoUrl} 
                                    alt={opportunity.organization}
                                    className="w-full h-full object-cover" 
                                />
                            ) : (
                                <div className="text-sm font-bold text-primary-500">
                                    {opportunity.organization.substring(0, 2).toUpperCase()}
                                </div>
                            )}
                        </div>
                        <div>
                            <h3 className="font-medium text-base text-secondary-800 group-hover:text-primary-600 transition-colors duration-300">
                                {opportunity.title}
                            </h3>
                            <p className="text-sm text-secondary-500 mt-0.5">
                                {opportunity.organization}
                            </p>
                        </div>
                    </div>
                    <Badge
                        variant="outline"
                        className="bg-primary-50/80 text-primary-700 border-primary-200/50 text-xs font-medium px-2 py-0.5 shadow-sm"
                    >
                        {opportunity.matched}% Match
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="p-6 pt-0">
                <div className="flex items-center flex-wrap gap-4 mb-3.5 text-xs text-secondary-500">
                    <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-secondary-400" />
                        <span>{opportunity.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-secondary-400" />
                        <span>{opportunity.commitment}</span>
                    </div>
                </div>

                <p className="text-secondary-600 text-sm line-clamp-3 mb-4">
                    {opportunity.description}
                </p>

                <div className="flex flex-wrap gap-2">
                    {opportunity.skills.slice(0, 2).map((skill) => (
                        <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-gray-50/90 text-secondary-600 text-xs border-gray-100/70 py-0.5 px-2"
                        >
                            {skill}
                        </Badge>
                    ))}
                    {opportunity.skills.length > 2 && (
                        <Badge
                            variant="secondary"
                            className="bg-gray-50/90 text-secondary-600 text-xs border-gray-100/70 py-0.5 px-2"
                        >
                            +{opportunity.skills.length - 2} more
                        </Badge>
                    )}
                </div>
            </CardContent>

            <CardFooter className="p-6 pt-0 flex justify-between items-center">
                <div className="text-xs text-secondary-500">
                    Posted {opportunity.postedDate}
                </div>
                <div className="flex gap-2.5">
                    <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                            "h-9 w-9 p-0 rounded-md", 
                            isSaved ? "text-accent-500 bg-accent-50/50" : "text-gray-400 hover:text-accent-500"
                        )}
                        onClick={handleSave}
                    >
                        {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                    </Button>
                    <Link to={`/opportunities/${opportunity.id}`}>
                        <Button size="sm" className="h-9 bg-primary-500 hover:bg-primary-600 text-white shadow-sm">
                            {opportunity.status === "applied" ? "Applied" : "Apply"}
                        </Button>
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}
