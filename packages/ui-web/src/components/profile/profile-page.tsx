"use client"

import { useState } from "react"
import { useUser } from "@clerk/clerk-react"
import { Button } from "@ui/components/ui/button"
import { Card, CardContent, CardHeader } from "@ui/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/ui/avatar"
import { Badge } from "@ui/components/ui/badge"
import { 
  Edit2, 
  MapPin, 
  Calendar,
  BookOpen,
  Award,
  Clock,
  Heart,
  Star
} from "lucide-react"
import { getIntials } from "@ui/lib/render"

export default function ProfilePage() {
  const { user } = useUser()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data - replace with real data from your backend
  const stats = {
    hoursLogged: 156,
    skillsEndorsed: 12,
    impactScore: 85,
    eventsAttended: 24
  }

  const skills = [
    { name: "Leadership", endorsements: 8 },
    { name: "Communication", endorsements: 15 },
    { name: "Project Management", endorsements: 6 },
    { name: "Teaching", endorsements: 12 },
    { name: "Event Planning", endorsements: 9 }
  ]

  const recentActivity = [
    {
      type: "volunteer",
      title: "Community Garden Project",
      organization: "Green Earth Initiative",
      date: "2024-03-15",
      hours: 4
    },
    {
      type: "event",
      title: "Youth Mentorship Workshop",
      organization: "Education First",
      date: "2024-03-10",
      hours: 3
    }
  ]

  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 ring-4 ring-primary-500/20">
              <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
              <AvatarFallback className="text-xl">
                {getIntials(user?.fullName || "User")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-secondary-800 mb-2">
                {user?.fullName}
              </h1>
              <div className="flex items-center gap-4 text-secondary-600">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined March 2024</span>
                </div>
              </div>
            </div>
          </div>
          <Button variant="outline" className="gap-2">
            <Edit2 className="h-4 w-4" /> Edit Profile
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary-50 rounded-lg">
                <Clock className="h-6 w-6 text-primary-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary-800">{stats.hoursLogged}</p>
                <p className="text-sm text-secondary-600">Hours Volunteered</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent-50 rounded-lg">
                <Award className="h-6 w-6 text-accent-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary-800">{stats.skillsEndorsed}</p>
                <p className="text-sm text-secondary-600">Skills Endorsed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-highlight-50 rounded-lg">
                <Heart className="h-6 w-6 text-highlight" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary-800">{stats.impactScore}</p>
                <p className="text-sm text-secondary-600">Impact Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-secondary-50 rounded-lg">
                <BookOpen className="h-6 w-6 text-secondary-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary-800">{stats.eventsAttended}</p>
                <p className="text-sm text-secondary-600">Events Attended</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skills & Endorsements</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="impact">Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <h3 className="text-lg font-semibold">About</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-secondary-600">
                    Passionate about making a difference in my community through volunteer work.
                    Interested in environmental conservation, education, and youth mentorship.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <h3 className="text-lg font-semibold">Recent Activity</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${
                        activity.type === "volunteer" ? "bg-primary-50" : "bg-accent-50"
                      }`}>
                        {activity.type === "volunteer" ? (
                          <Heart className="h-5 w-5 text-primary-500" />
                        ) : (
                          <Calendar className="h-5 w-5 text-accent-500" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-secondary-800">{activity.title}</h4>
                        <p className="text-sm text-secondary-600">{activity.organization}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-secondary-500">
                          <span>{new Date(activity.date).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{activity.hours} hours</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <h3 className="text-lg font-semibold">Top Skills</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {skills.slice(0, 5).map((skill, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="text-secondary-700">{skill.name}</span>
                        </div>
                        <Badge variant="secondary" className="bg-secondary-50">
                          {skill.endorsements} endorsements
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <h3 className="text-lg font-semibold">Interests</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Environment",
                      "Education",
                      "Youth Mentorship",
                      "Community Service",
                      "Animal Welfare"
                    ].map((interest, i) => (
                      <Badge key={i} variant="outline" className="bg-secondary-50">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Add other tab contents as needed */}
      </Tabs>
    </div>
  )
} 