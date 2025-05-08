import { useState, useEffect } from "react"
import { Button } from "@repo/ui-web/components/ui/button"
import { Input } from "@repo/ui-web/components/ui/input"
import { Card, CardContent, CardFooter } from "@repo/ui-web/components/ui/card"
import { Badge } from "@repo/ui-web/components/ui/badge"
import {
  Bookmark,
  BookmarkCheck,
  Calendar,
  CheckSquare,
  ChevronRight,
  Filter,
  Search,
  Users,
  Bell
} from "lucide-react"
import { cn } from "@repo/ui-web/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui-web/components/ui/dropdown-menu"

// Mock data for events
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
    isRegistered: false,
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
    isRegistered: true,
    checkedIn: true
  },
  {
    id: "e3",
    title: "VIRTUAL JOB FAIR - NATIONWIDE OPPORTUNITIES",
    organizer: "National Volunteer Network",
    logo: "https://placehold.co/400?text=NVC",
    dateRange: "Wed, Mar 26-Wed, Jun 25",
    isVirtual: true,
    tags: ["HIRING", "GUIDANCE"],
    attendees: 101,
    isSaved: false,
    isRegistered: true,
    checkedIn: true
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
    isRegistered: true,
    checkedIn: true
  },
]

// Filter options
const filterOptions = {
  collections: ["All collections", "Local initiatives", "National programs"],
  categories: ["All categories", "Job fair", "Workshop", "Training", "Networking"],
  medium: ["All mediums", "In person", "Virtual", "Hybrid"],
  date: ["All dates", "Today", "This week", "This month", "Next month"],
  employer: ["All employers", "Corporate", "Non-profit", "Government", "Education"],
}

export default function EventsPage() {
  // State declarations
  const [searchTerm, setSearchTerm] = useState("")
  const [savedEvents, setSavedEvents] = useState(events.filter(event => event.isSaved))
  const [registeredEvents] = useState(events.filter(event => event.isRegistered))
  const [checkedInEvents] = useState(events.filter(event => event.checkedIn))
  const [filteredEvents, setFilteredEvents] = useState(events)
  
  // Event quick links
  const eventLinks = [
    {
      icon: "🌟",
      title: "Community events",
      subtitle: "at your location",
      path: "/events/community",
    },
    {
      icon: "💼",
      title: "Volunteer events",
      subtitle: "opportunities nearby",
      path: "/events/volunteer",
    },
    {
      icon: "🧭",
      title: "Career guidance",
      subtitle: "workshops & training",
      path: "/events/guidance",
    },
    {
      icon: "👥",
      title: "Events hosted",
      subtitle: "by organizations",
      path: "/events/organizations",
    },
  ]
  
  // Handle search
  useEffect(() => {
    if (searchTerm) {
      const results = events.filter(
        event => 
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.organizer.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredEvents(results)
    } else {
      setFilteredEvents(events)
    }
  }, [searchTerm])
  
  // Toggle saved event
  const toggleSaveEvent = (eventId: string) => {
    const updatedEvents = events.map(event => {
      if (event.id === eventId) {
        return { ...event, isSaved: !event.isSaved }
      }
      return event
    })
    
    const updatedFilteredEvents = filteredEvents.map(event => {
      if (event.id === eventId) {
        return { ...event, isSaved: !event.isSaved }
      }
      return event
    })
    
    setFilteredEvents(updatedFilteredEvents)
    setSavedEvents(updatedEvents.filter(event => event.isSaved))
  }

  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-secondary-800">Events</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="border-gray-200" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            My Calendar
          </Button>
          <div className="relative">
            <div className="h-9 w-9 bg-gray-100 rounded-full flex items-center justify-center">
              <Bell className="h-5 w-5 text-secondary-600" />
            </div>
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">5</span>
          </div>
        </div>
      </div>
      
      {/* Search and filters */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-5/24 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search events" 
              className="pl-10 bg-white border-gray-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setSearchTerm("")}
              >
                ✕
              </button>
            )}
          </div>
          
          <Card className="flex items-center border-primary-100 bg-white px-4 py-2 gap-2">
            <BookmarkCheck className="h-5 w-5 text-primary-500" />
            <div>
              <div className="text-sm font-medium">Saved</div>
              <div className="text-xs text-gray-500">{savedEvents.length}</div>
            </div>
          </Card>
          
          <Card className="flex items-center border-primary-100 bg-white px-4 py-2 gap-2">
            <Calendar className="h-5 w-5 text-primary-500" />
            <div>
              <div className="text-sm font-medium">Registered</div>
              <div className="text-xs text-gray-500">{registeredEvents.length}</div>
            </div>
          </Card>
          
          <Card className="flex items-center border-primary-100 bg-white px-4 py-2 gap-2">
            <CheckSquare className="h-5 w-5 text-primary-500" />
            <div>
              <div className="text-sm font-medium">Check-ins</div>
              <div className="text-xs text-gray-500">{checkedInEvents.length}</div>
            </div>
          </Card>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-2">
          {Object.entries(filterOptions).map(([key, options]) => (
            <DropdownMenu key={key}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-gray-200 bg-white">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  <ChevronRight className="h-4 w-4 ml-1 transform rotate-90" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {options.map(option => (
                  <DropdownMenuItem key={option}>{option}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
          
          <Button variant="outline" className="border-gray-200 bg-white whitespace-nowrap">
            More filters
            <Filter className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
      
      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {eventLinks.map((link, i) => (
          <Card 
            key={i} 
            className="bg-white border border-gray-200/80 hover:shadow-md transition-shadow group"
          >
            <CardContent className="p-4">
              <div className="flex gap-3 items-start">
                <div className="text-xl">{link.icon}</div>
                <div>
                  <h3 className="font-medium text-secondary-800 group-hover:text-primary-600 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-secondary-500">{link.subtitle}</p>
                </div>
                <ChevronRight className="ml-auto h-4 w-4 text-secondary-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* All events */}
      <div>
        <h2 className="text-2xl font-semibold text-secondary-800 mb-6">All events</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredEvents.map(event => (
            <Card key={event.id} className="border border-gray-200/80 overflow-hidden flex flex-col">
              <CardContent className="p-5 flex-1">
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
                    aria-label={event.isSaved ? "Unsave event" : "Save event"}
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
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {event.tags.map(tag => (
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
      </div>
    </div>
  )
}
