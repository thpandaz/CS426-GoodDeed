export interface OpportunityType {
    id: number
    title: string
    organization: string
    logo: string
    location: string
    remote: boolean
    description: string
    skills: string[]
    commitment: string
    category: string
    matched: number
    featured: boolean
    postedDate: string
    status?: "applied" | "saved" | "active"
  }
  
  export const opportunities: OpportunityType[] = [
    {
      id: 1,
      title: "Community Garden Volunteer",
      organization: "Green City Initiative",
      location: "San Francisco, CA",
      remote: false,
      logo: "/placeholder.svg?height=80&width=80&text=GCI",
      description:
        "Help maintain our community garden, plant new vegetables and flowers, and assist with educational programs for local schools. You'll work alongside experienced gardeners and help create a beautiful green space for the community.",
      skills: ["Gardening", "Education", "Sustainability", "Physical Labor"],
      commitment: "4-6 hours per week",
      category: "Environment",
      featured: true,
      matched: 92,
      postedDate: "2 days ago",
    },
    {
      id: 2,
      title: "Homeless Shelter Meal Provider",
      organization: "City Hope Center",
      location: "Chicago, IL",
      remote: false,
      logo: "/placeholder.svg?height=80&width=80&text=CHC",
      description:
        "Prepare and serve meals at our homeless shelter. Help provide nourishment and compassion to those in need. No cooking experience necessary, just a willingness to help and a positive attitude.",
      skills: ["Cooking", "Service", "Organization"],
      commitment: "3 hours per shift",
      category: "Community",
      featured: false,
      matched: 85,
      postedDate: "1 day ago",
      status: "applied",
    },
    {
      id: 3,
      title: "Virtual Tutor for Underserved Students",
      organization: "Education for All",
      location: "Remote",
      remote: true,
      logo: "/placeholder.svg?height=80&width=80&text=EFA",
      description:
        "Provide virtual tutoring sessions to K-12 students who lack access to educational resources. Make a difference in a child's academic journey by helping them with homework, explaining difficult concepts, and providing encouragement.",
      skills: ["Teaching", "Patience", "Subject Expertise"],
      commitment: "2-5 hours per week",
      category: "Education",
      featured: false,
      matched: 78,
      postedDate: "3 days ago",
    },
    {
      id: 4,
      title: "Animal Shelter Assistant",
      organization: "Paws & Hearts Rescue",
      location: "Austin, TX",
      remote: false,
      logo: "/placeholder.svg?height=80&width=80&text=P&H",
      description:
        "Help care for rescued animals, assist with adoption events, and maintain shelter facilities. Make a difference in animals' lives while gaining experience in animal care and welfare.",
      skills: ["Animal Care", "Cleaning", "Customer Service"],
      commitment: "4 hours per shift",
      category: "Animals",
      featured: false,
      matched: 90,
      postedDate: "5 days ago",
      status: "saved",
    },
    {
      id: 5,
      title: "Crisis Text Line Responder",
      organization: "Mental Health Alliance",
      location: "Remote",
      remote: true,
      logo: "/placeholder.svg?height=80&width=80&text=MHA",
      description:
        "Provide crisis intervention via text message to people in emotional distress. Training provided. Help those in need find hope and resources during difficult times.",
      skills: ["Empathy", "Communication", "Crisis Management"],
      commitment: "4 hours per week",
      category: "Health",
      featured: true,
      matched: 88,
      postedDate: "1 week ago",
    },
    {
      id: 6,
      title: "Food Bank Sorter & Packer",
      organization: "Community Food Network",
      location: "Seattle, WA",
      remote: false,
      logo: "/placeholder.svg?height=80&width=80&text=CFN",
      description:
        "Sort and pack donated food items for distribution to local food pantries and meal programs. Help ensure that nutritious food reaches those experiencing food insecurity in our community.",
      skills: ["Organization", "Teamwork", "Physical Activity"],
      commitment: "3-4 hours per shift",
      category: "Hunger",
      featured: false,
      matched: 82,
      postedDate: "1 week ago",
      status: "active",
    },
    {
      id: 7,
      title: "Website Developer for Nonprofit",
      organization: "Arts for All",
      location: "Remote",
      remote: true,
      logo: "/placeholder.svg?height=80&width=80&text=AFA",
      description:
        "Help design and develop a new website for our arts education nonprofit. Looking for volunteers with web development experience to create an engaging and accessible online presence.",
      skills: ["Web Development", "Design", "Technical"],
      commitment: "5-10 hours per week",
      category: "Arts & Culture",
      featured: false,
      matched: 95,
      postedDate: "2 weeks ago",
    },
    {
      id: 8,
      title: "Trail Maintenance Volunteer",
      organization: "National Parks Conservation",
      location: "Denver, CO",
      remote: false,
      logo: "/placeholder.svg?height=80&width=80&text=NPC",
      description:
        "Help maintain hiking trails, remove invasive species, and preserve natural habitats in our national parks. Enjoy the outdoors while making a tangible difference in preserving our natural resources.",
      skills: ["Outdoor Work", "Conservation", "Physical Activity"],
      commitment: "6 hours per day",
      category: "Environment",
      featured: false,
      matched: 87,
      postedDate: "2 weeks ago",
    },
    {
      id: 9,
      title: "Elderly Companion",
      organization: "Senior Care Alliance",
      location: "Multiple Locations",
      remote: false,
      logo: "/placeholder.svg?height=80&width=80&text=SCA",
      description:
        "Provide companionship to elderly individuals who may be experiencing isolation. Activities include conversation, reading, games, and accompanying them on walks or to appointments.",
      skills: ["Compassion", "Listening", "Patience"],
      commitment: "2-3 hours per week",
      category: "Community",
      featured: false,
      matched: 89,
      postedDate: "3 weeks ago",
    },
    {
      id: 10,
      title: "Social Media Manager",
      organization: "Youth Empowerment Project",
      location: "Remote",
      remote: true,
      logo: "/placeholder.svg?height=80&width=80&text=YEP",
      description:
        "Help manage our social media presence to raise awareness about youth empowerment programs. Create engaging content, schedule posts, and interact with our online community.",
      skills: ["Social Media", "Content Creation", "Communication"],
      commitment: "3-5 hours per week",
      category: "Education",
      featured: false,
      matched: 91,
      postedDate: "3 weeks ago",
    },
  ]
  
  export const categories = [
    "all",
    "Environment",
    "Community",
    "Education",
    "Animals",
    "Health",
    "Hunger",
    "Arts & Culture",
  ]
  
  export const locations = [
    "all",
    "San Francisco, CA",
    "Chicago, IL",
    "Remote",
    "Austin, TX",
    "Seattle, WA",
    "Denver, CO",
    "Multiple Locations",
  ]
  
  export const skills = [
    "Gardening",
    "Education",
    "Sustainability",
    "Cooking",
    "Service",
    "Teaching",
    "Animal Care",
    "Web Development",
    "Empathy",
    "Communication",
    "Organization",
    "Physical Activity",
    "Teamwork",
    "Design",
    "Technical",
    "Conservation",
    "Compassion",
    "Listening",
    "Social Media",
    "Content Creation",
  ]
  