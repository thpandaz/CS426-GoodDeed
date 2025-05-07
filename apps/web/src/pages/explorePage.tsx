import { useState, useEffect } from "react"
import { useUser } from "@clerk/clerk-react"
import { Button } from "@repo/ui-web/components/ui/button"

import { Card, CardContent, CardFooter } from "@repo/ui-web/components/ui/card"
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  Heart, 
  Lightbulb,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
} from "lucide-react"
import { Badge } from "@repo/ui-web/components/ui/badge"
import { Link } from "react-router-dom"
import { OpportunityPageSkeleton } from "@repo/ui-web/components/opportunity/opportunity-page-skeleton"
import { cn } from "@repo/ui-web/lib/utils"

// Temporary mock data - this would come from your API
import { opportunities } from "./data.temp"

// Mock data for events (same as in EventsPage for consistency)
const events = [
  {
    id: "e1",
    title: "Connect with Organization - Spring 2025 Edition",
    organizer: "Impact Solutions",
    logo: "https://placehold.co/400?text=IS",
    dateRange: "Wed, Jan 1-Sun, Jun 1",
    isVirtual: true,
    tags: ["HIRING", "EMPLOYER INFO"],
    attendees: 1368,
    isSaved: false,
  },
  {
    id: "e2",
    title: "Grad Students: Navigating a Non-Academic Job Search",
    organizer: "University Career Services",
    logo: "https://placehold.co/400?text=USC",
    dateRange: "Mon, May 5-Fri, May 9",
    isVirtual: true,
    tags: ["GUIDANCE"],
    isToday: true,
    isSaved: true,
  },
  {
    id: "e3",
    title: "VIRTUAL JOB FAIR - NATIONWIDE OPPORTUNITIES",
    organizer: "National Volunteer Network",
    logo: "https://placehold.co/400?text=NVN",
    dateRange: "Wed, Mar 26-Wed, Jun 25",
    isVirtual: true,
    tags: ["HIRING", "GUIDANCE"],
    attendees: 101,
    isSaved: false,
  },
  {
    id: "e4",
    title: "Change Makers 2025 Scholarship",
    organizer: "Community Foundation",
    logo: "https://placehold.co/400?text=CF",
    dateRange: "Tue, Apr 22-Fri, May 23",
    isVirtual: true,
    tags: ["GUIDANCE"],
    attendees: 24,
    isSaved: true,
  },
]

// Categories
const categories = [
  { id: 1, name: "Education", icon: Lightbulb, count: 45 },
  { id: 2, name: "Environment", icon: TrendingUp, count: 32 },
  { id: 3, name: "Community", icon: Users, count: 28 },
  { id: 4, name: "Health", icon: Heart, count: 20 },
]

export default function ExplorePage() {
  const { user, isLoaded } = useUser()
  const [isLoading, setIsLoading] = useState(true)
  const [eventSearchTerm, setEventSearchTerm] = useState("")
  const [savedEvents, setSavedEvents] = useState(events.filter(event => event.isSaved))
  
  // Simulating data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)
    
    return () => clearTimeout(timer)
  }, [])
  
  if (!isLoaded || isLoading) {
    return <OpportunityPageSkeleton />
  }
  
  // Get time of day for personalized greeting
  const getTimeOfDay = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "morning"
    if (hour < 18) return "afternoon"
    return "evening"
  }
  
  const firstName = user?.firstName || "there"
  
  // Get featured opportunities (high matching score)
  const featuredOpportunities = opportunities
    .filter(opp => opp.matched >= 85)
    .slice(0, 3)
  
  // Get featured events with type safety
  const featuredEvents = events
    .filter(event => event.isToday || (event.attendees ?? 0) > 500)
    .slice(0, 2)
      
  // Toggle event saved state
  const toggleSaveEvent = (eventId: string) => {
    const updatedEvents = events.map(event => 
      event.id === eventId ? { ...event, isSaved: !event.isSaved } : event
    )
    setSavedEvents(updatedEvents.filter(event => event.isSaved))
  }

  return (
    <div className="bg-gray-50/50 min-h-screen font-family-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 py-6 sm:py-8">
        {/* Welcome Banner */}
        <div className="mb-8 md:mb-10 relative overflow-hidden">
          <div className="inset-0 bg-gradient-to-br via-background/100 to-highlight-300/50 opacity-80 p-5 md:p-8 rounded-lg md:rounded-xl border border-primary-100/50 shadow-sm relative z-10">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-0 right-0 w-16 md:w-24 h-16 md:h-24 bg-primary-200/20 rounded-full -mr-8 md:-mr-12 -mt-8 md:-mt-12 blur-xl md:blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-20 md:w-32 h-20 md:h-32 bg-highlight-200/20 rounded-full -ml-10 md:-ml-16 -mb-10 md:-mb-16 blur-xl md:blur-2xl"></div>
            </div>
            
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <span className="inline-block text-primary-600 text-xs md:text-sm font-medium mb-1 md:mb-2 bg-white/70 px-2 md:px-3 py-0.5 md:py-1 rounded-full shadow-sm">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: window.innerWidth < 640 ? 'short' : 'long', 
                    month: window.innerWidth < 640 ? 'short' : 'long', 
                    day: 'numeric' 
                  })}
                </span>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary-900 tracking-tight">
                  Good {getTimeOfDay()}, <span className="text-primary-600">{firstName}!</span>
                </h1>
                <p className="text-primary-700 mt-1 md:mt-2 text-sm sm:text-base md:text-lg max-w-lg">
                  Ready to discover new opportunities that match your interests?
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content sections with consistent spacing */}
        <div className="space-y-8 md:space-y-10">
          {/* Categories For You */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base md:text-lg font-bold text-secondary-800 flex items-center">
                <TrendingUp className="h-3.5 md:h-4 w-3.5 md:w-4 text-primary-500 mr-1.5 md:mr-2" /> 
                Categories For You
              </h2>
              <Button variant="ghost" size="sm" asChild className="text-primary-600 h-7 md:h-8 px-1.5 md:px-2 text-xs md:text-sm">
                <Link to="/categories" className="flex items-center">
                  View all <ArrowRight className="ml-1 h-3 md:h-3.5 w-3 md:w-3.5" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {categories.map((category) => (
                <Card 
                  key={category.id} 
                  className="border border-gray-100 hover:border-gray-300 transition-all duration-200"
                >
                  <CardContent className="p-3 md:p-4 flex flex-col items-center text-center">
                    <div className="h-9 md:h-10 w-9 md:w-10 rounded-full bg-primary-50 flex items-center justify-center mb-2">
                      <category.icon className="h-4 md:h-5 w-4 md:w-5 text-primary-500" />
                    </div>
                    <h3 className="font-medium text-sm md:text-base text-secondary-800">{category.name}</h3>
                    <p className="text-xs md:text-sm text-secondary-500 mt-1">{category.count} opportunities</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Featured Opportunities */}
          <section>
          <div className="flex items-center justify-between mb-3 md:mb-4">
                <h2 className="text-base md:text-lg font-bold text-secondary-800 flex items-center">
                  <TrendingUp className="h-3.5 md:h-4 w-3.5 md:w-4 text-primary-500 mr-1.5 md:mr-2" /> 
                  Categories For You
                </h2>
                <Button variant="ghost" size="sm" asChild className="text-primary-600 h-7 md:h-8 px-1.5 md:px-2 text-xs md:text-sm">
                  <Link to="/categories" className="flex items-center">
                    View all <ArrowRight className="ml-1 h-3 md:h-3.5 w-3 md:w-3.5" />
                  </Link>
                </Button>
              </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {featuredOpportunities.map((opportunity) => (
                <Card
                key={opportunity.id}
                className="border border-gray-100 rounded-md hover:border-gray-300 transition-all duration-200 p-2"
                >
                <CardContent className="p-3 md:p-4">
                    {/* Logo + Org & Industry + Bookmark */}
                    <div className="flex justify-between items-start mb-2 md:mb-3">
                        <div className="flex items-center">
                        <div className="h-10 md:h-12 w-10 md:w-12 rounded-md overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0 mr-2 md:mr-3">
                            <img
                            src={opportunity.logo || "https://placehold.co/80"}
                            alt={opportunity.organization}
                            className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="min-w-0">
                            <p className="text-secondary-600 text-sm md:text-base truncate">
                            {opportunity.organization}
                            </p>
                            <p className="text-secondary-500 text-xs md:text-sm truncate">
                            {opportunity.category}
                            </p>
                        </div>
                        </div>
                        <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 md:h-8 w-6 md:w-8 p-0 text-secondary-400"
                        >
                        <Bookmark className="h-3.5 md:h-4 w-3.5 md:w-4" />
                        </Button>
                    </div>

                    {/* Job Title */}
                    <h3 className="font-medium text-sm md:text-base text-secondary-900 mb-1 truncate">
                        {opportunity.title}
                    </h3>

                    {/* Commitment */}
                    <p className="text-secondary-500 text-xs md:text-base mb-1">
                        {opportunity.commitment || "Full-time job"}
                    </p>

                    {/* Location + Posted date */}
                    <p className="text-secondary-500 text-xs md:text-sm">
                        {opportunity.location} &middot; {opportunity.postedDate}
                    </p>
                    </CardContent>
                </Card>
            ))}
            </div>
          </section>

          {/* Featured Events */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base md:text-lg font-bold text-secondary-800 flex items-center">
                <Calendar className="h-3.5 md:h-4 w-3.5 md:w-4 text-secondary-500 mr-1.5 md:mr-2" /> 
                Upcoming Events
              </h2>
              <Button variant="ghost" size="sm" asChild className="text-primary-600 h-7 md:h-8 px-1.5 md:px-2 text-xs md:text-sm">
                <Link to="/events" className="flex items-center">
                  View all <ArrowRight className="ml-1 h-3 md:h-3.5 w-3 md:w-3.5" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {featuredEvents.map((event) => (
                <Card key={event.id} className="border border-gray-100 overflow-hidden p-6">
                  <CardContent className="px-0">
                    <div className="flex gap-3 mb-4">
                      <div className="h-12 w-12 bg-gray-100 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center">
                        {event.logo ? (
                          <img src={event.logo} alt={event.organizer} className="h-full w-full object-cover" />
                        ) : (
                          <Calendar className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-secondary-800 mb-1">{event.organizer}</h3>
                      </div>
                      <button 
                        onClick={() => toggleSaveEvent(event.id)}
                        className={cn(
                          "h-8 w-8 rounded-full flex items-center justify-center",
                          event.isSaved ? "text-primary-500" : "text-gray-300 hover:text-primary-400"
                        )}
                      >
                        {event.isSaved ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
                      </button>
                    </div>
                    
                    <h2 className="text-lg font-semibold text-secondary-800 mb-3">{event.title}</h2>
                    
                    <div className="flex items-center gap-2 text-sm text-secondary-600 mb-4">
                      {event.isVirtual && <Badge variant="outline" className="bg-primary-50 border-primary-100">Virtual</Badge>}
                      <span>•</span>
                      <span>{event.dateRange}</span>
                    </div>
                    
                    <div className="flex gap-2 mb-4">
                      {event.tags && event.tags.map(tag => (
                        <Badge 
                          key={tag} 
                          className={cn(
                            "text-xs py-1 px-2",
                            tag === "HIRING" ? "bg-green-100 text-green-700" :
                            tag === "GUIDANCE" ? "bg-blue-100 text-blue-700" :
                            "bg-gray-100 text-gray-700"
                          )}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    {event.isToday && (
                      <div className="text-sm font-medium text-accent-500">Event is today!</div>
                    )}
                    
                    {event.attendees && (
                      <div className="flex items-center text-sm text-secondary-500">
                        <Users className="h-4 w-4 mr-1.5" />
                        <span>{event.attendees} people going</span>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="pt-0 flex justify-between bg-gray-50">
                    <Button variant="outline" size="sm" className="text-secondary-700 text-xs md:text-sm">
                      Details
                    </Button>
                    <Button size="sm" className="bg-primary-500 hover:bg-primary-600 text-white text-xs md:text-sm">
                      {event.isToday ? "Join now" : "Register"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
