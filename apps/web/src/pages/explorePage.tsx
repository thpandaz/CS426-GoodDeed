import { useState, useEffect } from "react"
import { useUser } from "@clerk/clerk-react"
import { Button } from "@repo/ui-web/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui-web/components/ui/tabs"
import { Input } from "@repo/ui-web/components/ui/input"
import { Card, CardContent, CardHeader, CardFooter } from "@repo/ui-web/components/ui/card"
import { 
  Search, 
  TrendingUp, 
  Users, 
  Briefcase, 
  Calendar, 
  Heart, 
  Lightbulb,
  ArrowRight,
  Filter,
  Star,
  MapPin,
  Clock,
  Bookmark,
  BookmarkCheck,
  CheckSquare
} from "lucide-react"
import { Badge } from "@repo/ui-web/components/ui/badge"
import { Link } from "react-router-dom"
import OpportunityList from "@repo/ui-web/components/opportunity/opportunity-list"
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
    logo: "/logos/impact-solutions.png",
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
    logo: "/logos/university.png",
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
    logo: "/logos/volunteer-network.png",
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
    logo: "/logos/community-foundation.png",
    dateRange: "Tue, Apr 22-Fri, May 23",
    isVirtual: true,
    tags: ["GUIDANCE"],
    attendees: 24,
    isSaved: true,
  },
]

const categories = [
  { id: "all", name: "All Categories" },
  { id: "volunteer", name: "Volunteer Work" },
  { id: "education", name: "Education" },
  { id: "environment", name: "Environment" },
  { id: "healthcare", name: "Healthcare" },
  { id: "advocacy", name: "Advocacy" },
  { id: "arts", name: "Arts & Culture" },
  { id: "animals", name: "Animal Welfare" },
]

const trendingTopics = [
  { id: "climate", name: "Climate Action", count: 128 },
  { id: "mentoring", name: "Youth Mentoring", count: 95 },
  { id: "literacy", name: "Literacy Programs", count: 87 },
  { id: "elderly", name: "Elder Support", count: 76 },
  { id: "food", name: "Food Security", count: 64 },
]

export default function ExplorePage() {
  const { user, isLoaded } = useUser()
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("featured")
  const [searchTerm, setSearchTerm] = useState("")
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
  
  // Get featured events
  const featuredEvents = events
    .filter(event => event.isToday || event.attendees > 500)
    .slice(0, 2)
    
  // Filter events based on search term
  const filteredEvents = events.filter(event => 
    !eventSearchTerm || 
    event.title.toLowerCase().includes(eventSearchTerm.toLowerCase()) ||
    event.organizer.toLowerCase().includes(eventSearchTerm.toLowerCase())
  )
  
  // Toggle event saved state
  const toggleSaveEvent = (eventId: string) => {
    const updatedEvents = events.map(event => 
      event.id === eventId ? { ...event, isSaved: !event.isSaved } : event
    )
    setSavedEvents(updatedEvents.filter(event => event.isSaved))
  }

  return (
    <div className="container max-w-screen-xl mx-auto px-4 pb-12">
      {/* Welcome section */}
      <div className="my-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-secondary-800 mb-1">
          Welcome, <span className="text-primary-600">{firstName}!</span>
        </h1>
        <p className="text-secondary-600">
          Here are some featured opportunities and events that match your interests.
        </p>
      </div>

      {/* Main tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-gray-100/70 w-full max-w-md mx-auto mb-8">
          <TabsTrigger value="featured" className="data-[state=active]:bg-white flex-1">
            Featured
          </TabsTrigger>
          <TabsTrigger value="opportunities" className="data-[state=active]:bg-white flex-1">
            Opportunities
          </TabsTrigger>
          <TabsTrigger value="events" className="data-[state=active]:bg-white flex-1">
            Events
          </TabsTrigger>
        </TabsList>

        {/* Featured Tab Content */}
        <TabsContent value="featured" className="space-y-12">
          {/* Featured Opportunities */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-secondary-800 flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-2" /> 
                Recommended for You
              </h2>
              <Button variant="link" size="sm" asChild>
                <Link to="/opportunities" className="flex items-center text-primary-600">
                  View all opportunities <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {featuredOpportunities.map((opportunity) => (
                <Card key={opportunity.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-100">
                          <img
                            src={opportunity.logo || "https://placehold.co/80"}
                            alt={opportunity.organization}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-secondary-800">{opportunity.title}</h3>
                          <p className="text-sm text-secondary-600">{opportunity.organization}</p>
                        </div>
                      </div>
                      <Badge className="bg-primary-50 text-primary-700 border-primary-100">
                        {opportunity.matched}% Match
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex items-center gap-4 text-xs text-secondary-500 mb-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{opportunity.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{opportunity.commitment || "Flexible"}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {opportunity.skills.slice(0, 2).map((skill) => (
                        <Badge 
                          key={skill}
                          variant="secondary" 
                          className="bg-gray-50 text-secondary-600 text-xs border-none"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 flex justify-between">
                    <span className="text-xs text-secondary-500">Posted {opportunity.postedDate}</span>
                    <Button size="sm" className="bg-primary-500 hover:bg-primary-600 text-white" asChild>
                      <Link to={`/opportunities/${opportunity.id}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          {/* Featured Events */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-secondary-800 flex items-center">
                <Calendar className="h-5 w-5 text-secondary-500 mr-2" /> 
                Upcoming Events
              </h2>
              <Button variant="link" size="sm" asChild>
                <Link to="/events" className="flex items-center text-primary-600">
                  View all events <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {featuredEvents.map((event) => (
                <Card key={event.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
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
                    <Button variant="outline" size="sm" className="text-secondary-700">
                      Details
                    </Button>
                    <Button size="sm" className="bg-primary-500 hover:bg-primary-600 text-white">
                      {event.isToday ? "Join now" : "Register"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          {/* For You Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-secondary-800 flex items-center">
                <Users className="h-5 w-5 text-secondary-500 mr-2" /> 
                Categories For You
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Environmental", icon: <Heart className="h-5 w-5" />, count: 47 },
                { name: "Education", icon: <Lightbulb className="h-5 w-5" />, count: 32 },
                { name: "Community", icon: <Users className="h-5 w-5" />, count: 29 },
                { name: "Technology", icon: <Briefcase className="h-5 w-5" />, count: 18 }
              ].map((category) => (
                <Card key={category.name} className="border border-gray-200 bg-gray-50/50 hover:bg-white hover:shadow-sm transition-all">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center mb-2">
                      {category.icon}
                    </div>
                    <h3 className="font-medium text-secondary-800">{category.name}</h3>
                    <p className="text-sm text-secondary-500">{category.count} opportunities</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </TabsContent>

        {/* Opportunities Tab Content */}
        <TabsContent value="opportunities">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-secondary-800">All Opportunities</h2>
              <p className="text-secondary-600">Find volunteer positions that match your interests</p>
            </div>
            <div className="w-64">
              <Input
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9"
              />
            </div>
          </div>
          
          <OpportunityList 
            opportunities={opportunities.filter(opp => 
              !searchTerm || 
              opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              opp.organization.toLowerCase().includes(searchTerm.toLowerCase())
            )}
            view="grid"
            page={1}
            pageSize={6}
            totalItems={opportunities.length}
            onPageChange={() => {}}
          />
        </TabsContent>

        {/* Events Tab Content */}
        <TabsContent value="events">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-secondary-800">All Events</h2>
              <p className="text-secondary-600">Find upcoming events and opportunities</p>
            </div>
            <div className="w-64">
              <Input
                placeholder="Search events..."
                value={eventSearchTerm}
                onChange={(e) => setEventSearchTerm(e.target.value)}
                className="h-9"
              />
            </div>
          </div>

          <div className="mb-6 flex items-center">
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Bookmark className="h-5 w-5 text-primary-500" />
                <span>Saved: {savedEvents.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-green-500" />
                <span>Registered: 0</span>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {filteredEvents.map(event => (
              <Card key={event.id} className="border border-gray-200/80 overflow-hidden">
                <div className="p-5">
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
                </div>
                
                <CardFooter className="bg-gray-50 p-4 flex justify-between">
                  <Button variant="outline" size="sm" className="text-secondary-700">
                    Details
                  </Button>
                  <Button size="sm" className="bg-primary-500 hover:bg-primary-600 text-white">
                    {event.isToday ? "Join now" : "Register"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
