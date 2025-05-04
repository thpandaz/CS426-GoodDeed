// src/pages/StudentsPage.jsx
import { Link } from 'react-router-dom'
import { Button } from '@repo/ui-web/components/ui/button'
import { Badge } from '@repo/ui-web/components/ui/badge'
import {
  Search,
  Calendar,
  Award,
  Clock,
  BookOpen,
  Users,
  Briefcase,
  CheckCircle,
  ChevronRight,
  Star,
  GraduationCap,
  FileText,
  Heart,
} from 'lucide-react'

const benefits = [
  {
    icon: <Award className="h-8 w-8 text-primary-500" />,
    title: 'Build Your Resume',
    description:
      'Gain valuable experience and skills that stand out to employers and college admissions officers.',
  },
  {
    icon: <Clock className="h-8 w-8 text-primary-500" />,
    title: 'Flexible Scheduling',
    description:
      'Find opportunities that fit around your class schedule, with options for one-time, short-term, or ongoing commitments.',
  },
  {
    icon: <BookOpen className="h-8 w-8 text-primary-500" />,
    title: 'Service Learning',
    description:
      'Connect classroom learning with community service and fulfill academic service requirements.',
  },
  {
    icon: <Users className="h-8 w-8 text-primary-500" />,
    title: 'Expand Your Network',
    description: 'Meet professionals in your field of interest and connect with like-minded peers.',
  },
  {
    icon: <Briefcase className="h-8 w-8 text-primary-500" />,
    title: 'Career Exploration',
    description: 'Test-drive potential career paths through hands-on experience in different fields.',
  },
  {
    icon: <Heart className="h-8 w-8 text-primary-500" />,
    title: 'Make an Impact',
    description:
      'Create meaningful change in your community while developing as a leader and change-maker.',
  },
]

const steps = [
  {
    step: '1',
    icon: <Search className="h-8 w-8 text-white" />,
    title: 'Find Opportunities',
    description:
      'Search for volunteer positions based on your interests, skills, location, and availability.',
    color: 'bg-primary-500',
  },
  {
    step: '2',
    icon: <FileText className="h-8 w-8 text-white" />,
    title: 'Apply',
    description: 'Submit your application with just a few clicks using your GoodDeed profile.',
    color: 'bg-accent-500',
  },
  {
    step: '3',
    icon: <Calendar className="h-8 w-8 text-white" />,
    title: 'Volunteer',
    description: 'Attend your volunteer session and make a difference in your community.',
    color: 'bg-highlight',
  },
  {
    step: '4',
    icon: <Star className="h-8 w-8 text-white" />,
    title: 'Track Impact',
    description: 'Log your hours and see the impact of your volunteer work over time.',
    color: 'bg-secondary-500',
  },
]

const skills = [
  'Leadership',
  'Communication',
  'Problem Solving',
  'Teamwork',
  'Project Management',
  'Cultural Competence',
  'Technical Skills',
  'Adaptability',
]

const serviceLearningCourses = [
  { name: 'Environmental Science 101', status: 'Completed', required: 20, completed: 24, pct: 100, badgeColor: 'bg-green-100', badgeText: 'Completed', textColor: 'text-green-700' },
  { name: 'Sociology 202', status: 'In Progress', required: 15, completed: 8, pct: 53, badgeColor: 'bg-yellow-100', badgeText: 'In Progress', textColor: 'text-yellow-700' },
  { name: 'Community Health 305', status: 'Upcoming', required: 30, completed: 0, pct: 0, badgeColor: 'bg-blue-100', badgeText: 'Upcoming', textColor: 'text-blue-700' },
]

const opportunities = [
  {
    title: 'Peer Tutor',
    org: 'Education for All',
    location: 'Remote',
    commitment: '2-5 hours/week',
    skills: ['Teaching', 'Communication', 'Subject Expertise'],
    matched: 95,
  },
  {
    title: 'Environmental Research Assistant',
    org: 'Green Earth Initiative',
    location: 'Multiple Locations',
    commitment: '5-10 hours/week',
    skills: ['Research', 'Data Analysis', 'Environmental Science'],
    matched: 88,
  },
  {
    title: 'Social Media Manager',
    org: 'Animal Rescue Foundation',
    location: 'Remote',
    commitment: '3-6 hours/week',
    skills: ['Digital Marketing', 'Content Creation', 'Social Media'],
    matched: 92,
  },
]

const testimonials = [
  {
    quote:
      'GoodDeed helped me find a volunteer position that directly related to my major. The experience I gained was invaluable for my internship applications.',
    name: 'Jamie Chen',
    role: 'Biology Major, University of Washington',
    image: 'https://placehold.co/500?text=JC',
  },
  {
    quote:
      'I needed to complete service hours for my scholarship, and GoodDeed made it so easy to find opportunities that fit my schedule between classes.',
    name: 'Marcus Johnson',
    role: 'Business Administration, Howard University',
    image: 'https://placehold.co/500?text=MJ',
  },
  {
    quote:
      'The skills verification feature helped me showcase my volunteer experience on my resume in a way that really impressed employers.',
    name: 'Sophia Rodriguez',
    role: 'Psychology Major, UCLA',
    image: 'https://placehold.co/500?text=SR',
  },
]

const faqs = [
  {
    question: 'Can I get academic credit for volunteering?',
    answer:
      'Many colleges and universities offer academic credit for volunteer work through service learning programs. GoodDeed helps you track your hours and provides verification for your professors. Check with your academic advisor to see if your school offers this option.',
  },
  {
    question: 'How much time do I need to commit?',
    answer:
      'GoodDeed offers opportunities with varying time commitments, from one-time events to ongoing positions. You can filter opportunities based on your availability, whether you have a few hours a week or just want to volunteer occasionally.',
  },
  {
    question: 'Can I volunteer remotely?',
    answer:
      'Yes! We have many remote volunteer opportunities that you can do from your dorm room or home. These include virtual tutoring, social media management, research, and more.',
  },
  {
    question: 'How do I showcase my volunteer experience on my resume?',
    answer:
      'GoodDeed provides a verified record of your volunteer hours and skills developed. You can download a volunteer transcript to attach to your resume or applications, and we offer guidance on how to effectively highlight your volunteer experience.',
  },
  {
    question: 'Are there volunteer opportunities related to my major?',
    answer:
      'You can search for opportunities by field or skill set to find positions related to your area of study. Whether you\'re studying business, healthcare, education, or any other field, there are relevant volunteer opportunities available.',
  },
]

export default function StudentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-accent-50 py-16 md:py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Badge className="bg-primary-100 text-primary-700 border-none mb-4">For Students</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-secondary-800 mb-6">
              Make a Difference While Building Your Future
            </h1>
            <p className="text-lg text-secondary-600 mb-8">
              GoodDeed connects students with meaningful volunteer opportunities that align with your academic goals,
              career aspirations, and personal interests. Build skills, gain experience, and create positive change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-white px-8">
                  Sign Up Free
                </Button>
              </Link>
              <Link to="/explore">
                <Button size="lg" variant="outline" className="border-primary-500 text-primary-500 px-8">
                  Browse Opportunities
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="https://placehold.co/500x400?text=Student+Volunteering"
              alt="Students volunteering"
              width={500}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-secondary-800 mb-2">Why Students Choose GoodDeed</h2>
          <p className="text-secondary-600 mb-12 max-w-3xl mx-auto">
            Join thousands of students who are building skills, enhancing their resumes, and making a difference in
            their communities.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((b, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="bg-primary-50 p-3 rounded-full inline-block mb-4">{b.icon}</div>
                <h3 className="text-xl font-semibold text-secondary-700 mb-2">{b.title}</h3>
                <p className="text-secondary-600">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-secondary-800 mb-2">How It Works</h2>
          <p className="text-secondary-600 mb-12 max-w-3xl mx-auto">
            Getting started with GoodDeed is easy. Follow these simple steps to find the perfect volunteer opportunity.
          </p>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className={`${s.color} h-16 w-16 rounded-full flex items-center justify-center mb-4 relative`}>
                  {s.icon}
                  <span className="absolute -top-2 -right-2 bg-white h-6 w-6 rounded-full text-xs font-bold flex items-center justify-center border-2 border-gray-200">
                    {s.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-secondary-700 mb-2">{s.title}</h3>
                <p className="text-secondary-600">{s.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link to="/explore">
              <Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-white px-8">
                Find Opportunities
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Development */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="bg-highlight-100 text-highlight border-none mb-4">Skills Development</Badge>
            <h2 className="text-3xl font-bold text-secondary-800 mb-4">Build Skills That Matter</h2>
            <p className="text-lg text-secondary-600 mb-6">
              Volunteering is one of the best ways to develop both hard and soft skills that employers and colleges
              value. GoodDeed helps you track and showcase the skills you gain through your volunteer experiences.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-highlight" />
                  <span className="text-secondary-700">{skill}</span>
                </div>
              ))}
            </div>
            <Link to="/skills">
              <Button className="bg-highlight hover:bg-highlight-600 text-white">
                Learn More About Skills Development
              </Button>
            </Link>
          </div>
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-secondary-700 mb-4">Skills Verification</h3>
            <p className="text-secondary-600 mb-6">
              GoodDeed provides verified skills badges that you can add to your resume, LinkedIn profile, and college
              applications. Organizations can endorse the skills you've demonstrated during your volunteer work.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {serviceLearningCourses.map((c, i) => (
                <div key={i} className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                  <div className="bg-accent-100 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-accent-500 font-bold">{c.completed}</span>
                  </div>
                  <h4 className="font-medium text-secondary-700 text-sm">{c.name}</h4>
                  <Badge className={`${c.badgeColor} ${c.textColor} border-none`}>{c.badgeText}</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Academic Credit */}
      <section className="py-16 bg-accent-50">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-secondary-700 mb-4 flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-primary-500" />
                Service Learning Tracker
              </h3>
              {serviceLearningCourses.map((c, i) => (
                <div key={i} className="border-b border-gray-200 pb-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-secondary-700 font-medium">{c.name}</span>
                    <Badge className={`${c.badgeColor} ${c.textColor} border-none`}>{c.badgeText}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary-600">Required Hours: {c.required}</span>
                    <span className="text-primary-500 font-medium">Completed: {c.completed}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2">
            <Badge className="bg-primary-100 text-primary-700 border-none mb-4">Academic Credit</Badge>
            <h2 className="text-3xl font-bold text-secondary-800 mb-4">Earn Credit While Volunteering</h2>
            <p className="text-lg text-secondary-600 mb-6">
              Many colleges and universities offer academic credit for volunteer work and service learning. GoodDeed
              helps you track your service hours and provides verification for your professors.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                'Track service hours for specific courses',
                'Get verification from nonprofit partners',
                'Generate service learning reports for your professors',
                'Reflect on your experiences with guided prompts',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-secondary-700">{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/service-learning">
              <Button className="bg-primary-500 hover:bg-primary-600 text-white">
                Learn About Service Learning
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Opportunities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-secondary-800 mb-2">Popular Student Opportunities</h2>
          <p className="text-secondary-600 mb-12 max-w-3xl mx-auto">
            Discover volunteer positions that are perfect for students and help you build valuable skills.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {opportunities.map((opp, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-secondary-800 mb-1">{opp.title}</h3>
                      <p className="text-secondary-600">{opp.org}</p>  
                    </div>
                    <Badge className="bg-primary-50 text-primary-700 border-primary-200">
                      {opp.matched}% Match
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-secondary-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Search className="h-4 w-4" />
                      <span>{opp.location}</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{opp.commitment}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {opp.skills.map((skill, j) => (
                      <Badge key={j} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <Link to={`/opportunities/${i + 1}`}>
                    <Button className="w-full bg-primary-500 hover:bg-primary-600 text-white">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link to="/explore" className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium">
              View All Opportunities
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-secondary-800 mb-2">Student Success Stories</h2>
          <p className="text-secondary-600 mb-12 max-w-3xl mx-auto">
            Hear from students who have found meaningful volunteer opportunities through GoodDeed.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-secondary-800">{t.name}</h3>
                    <p className="text-sm text-secondary-500">{t.role}</p>
                  </div>
                </div>
                <p className="text-secondary-600 italic">"{t.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl space-y-6">
          <h2 className="text-3xl font-bold text-secondary-800 mb-2 text-center">Frequently Asked Questions</h2>
          <p className="text-secondary-600 mb-12 text-center">
            Get answers to common questions about volunteering as a student.
          </p>
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-secondary-800 mb-2">{faq.question}</h3>
              <p className="text-secondary-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are building skills, enhancing their resumes, and creating positive change in
            their communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-primary-500 hover:bg-gray-100 px-8">
                Sign Up Free
              </Button>
            </Link>
            <Link to="/explore">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-primary-600 px-8">
                Browse Opportunities
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
