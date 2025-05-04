// src/pages/UniversitiesPage.jsx
import { Link } from 'react-router-dom'
import { Button } from '@repo/ui-web/components/ui/button'
import { Badge } from '@repo/ui-web/components/ui/badge'
import {
  GraduationCap,
  Users,
  Award,
  BarChart,
  CheckCircle,
  ChevronRight,
  Building,
  Globe,
  Briefcase,
} from 'lucide-react'

const benefits = [
  {
    icon: <GraduationCap className="h-8 w-8 text-highlight" />,
    title: 'Service Learning Integration',
    description:
      'Track student service hours, manage course requirements, and integrate community engagement with academic learning.',
  },
  {
    icon: <Building className="h-8 w-8 text-highlight" />,
    title: 'Community Partnerships',
    description:
      'Develop and manage relationships with local nonprofits and community organizations for student placements.',
  },
  {
    icon: <BarChart className="h-8 w-8 text-highlight" />,
    title: 'Impact Measurement',
    description:
      'Track and report on institutional community engagement metrics for accreditation and recognition.',
  },
  {
    icon: <Users className="h-8 w-8 text-highlight" />,
    title: 'Student Engagement',
    description:
      'Increase student participation in service learning and volunteer opportunities with easy-to-use tools.',
  },
  {
    icon: <Award className="h-8 w-8 text-highlight" />,
    title: 'Recognition Programs',
    description:
      'Recognize and celebrate student service achievements with verified transcripts and digital badges.',
  },
  {
    icon: <Globe className="h-8 w-8 text-highlight" />,
    title: 'Institutional Visibility',
    description:
      "Showcase your university's commitment to community engagement and social impact through our partner directory.",
  },
]

const steps = [
  {
    step: '1',
    icon: <Building className="h-8 w-8 text-white" />,
    title: 'Create Your Profile',
    description: 'Set up your university profile and customize your service learning requirements.',
    color: 'bg-highlight',
  },
  {
    step: '2',
    icon: <Users className="h-8 w-8 text-white" />,
    title: 'Connect Students',
    description: 'Invite students to join and link their accounts to your university.',
    color: 'bg-accent-500',
  },
  {
    step: '3',
    icon: <Briefcase className="h-8 w-8 text-white" />,
    title: 'Manage Partnerships',
    description: 'Develop relationships with community organizations for student placements.',
    color: 'bg-primary-500',
  },
  {
    step: '4',
    icon: <BarChart className="h-8 w-8 text-white" />,
    title: 'Track & Report',
    description: 'Monitor student engagement and generate impact reports for stakeholders.',
    color: 'bg-secondary-500',
  },
]

const serviceFeatures = [
  'Course-specific service learning requirements and tracking',
  'Guided reflection tools for students to document their learning',
  'Faculty dashboards to monitor student participation',
  'Learning outcome measurement and assessment tools',
  'Automated hour verification and reporting',
  'Integration with learning management systems',
]

const impactMetrics = [
  {
    label: 'Total Student Service Hours',
    value: '24,567 hours',
    pct: 92,
    note: '92% of annual goal (27,000 hours)',
  },
  {
    label: 'Active Students',
    value: '1,245',
    delta: '↑ 15% from last semester',
  },
  {
    label: 'Community Partners',
    value: '78',
    delta: '↑ 8% from last semester',
  },
  {
    label: 'Service Courses',
    value: '42',
    delta: '↑ 12% from last semester',
  },
  {
    label: 'Economic Impact',
    value: '$612K',
    delta: '↑ 18% from last semester',
  },
]

const partnerUniversities = [
  'State University',
  'Coastal College',
  'Metropolitan University',
  'Tech Institute',
  'Liberal Arts College',
  'Community College',
  'Research University',
  'City University',
]

const testimonials = [
  {
    quote:
      'GoodDeed has transformed how we track and report on our service learning programs. We’ve seen a 35% increase in student participation and can now easily demonstrate our impact for accreditation.',
    name: 'Dr. Emily Chen',
    role: 'Director of Community Engagement, State University',
    image: 'https://placehold.co/80?text=EC',
  },
  {
    quote:
      'The service learning tools have been invaluable for our faculty. They can now easily track student hours, review reflections, and assess learning outcomes all in one place.',
    name: 'Professor James Wilson',
    role: 'Service Learning Coordinator, Metropolitan University',
    image: 'https://placehold.co/80?text=JW',
  },
  {
    quote:
      "As a community college with limited resources, GoodDeed has allowed us to build a robust service learning program without adding additional staff. The platform has been a game-changer for us.",
    name: 'Maria Rodriguez',
    role: 'Dean of Student Affairs, Community College',
    image: 'https://placehold.co/80?text=MR',
  },
]

const faqs = [
  {
    question: 'How does GoodDeed integrate with our existing systems?',
    answer:
      'GoodDeed offers API access and direct integrations with popular learning management systems like Canvas, Blackboard, and Moodle. We also integrate with student information systems and can support single sign-on (SSO) for seamless student access.',
  },
  {
    question: 'Can we customize service learning requirements for different courses?',
    answer:
      'Yes! GoodDeed allows you to create custom service learning requirements for each course, including hour requirements, reflection prompts, and learning outcome assessments. Faculty can manage their own courses while administrators maintain oversight of the entire program.',
  },
  {
    question: 'How does GoodDeed help with Carnegie Classification for Community Engagement?',
    answer:
      'GoodDeed provides comprehensive tracking and reporting tools that align with Carnegie Classification requirements. Our platform helps you collect and organize the data needed for your application, including student participation rates, community partnerships, and institutional commitment to community engagement.',
  },
  {
    question: 'Can students use GoodDeed after graduation?',
    answer:
      'Yes! Students can continue to use their GoodDeed accounts after graduation to find volunteer opportunities and track their community service. This helps maintain alumni engagement and demonstrates your institution’s commitment to lifelong civic engagement.',
  },
  {
    question: 'What kind of support do you provide during implementation?',
    answer:
      'We provide comprehensive implementation support, including dedicated account management, technical integration assistance, faculty and staff training, and student onboarding resources. Our team will work closely with you to ensure a smooth transition and successful adoption across your campus.',
  },
]

export default function UniversitiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-highlight-50 to-accent-50 py-16 md:py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Badge className="bg-highlight-100 text-highlight border-none mb-4">For Universities</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-secondary-800 mb-6 leading-tight">
              Empower Student Service Learning & Community Engagement
            </h1>
            <p className="text-lg text-secondary-600 mb-8">
              GoodDeed helps universities track student service hours, manage community partnerships, and demonstrate
              institutional impact—all while providing students with valuable real-world experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/universities/partner">
                <Button size="lg" className="bg-highlight hover:bg-highlight-600 text-white px-8">
                  Become a Partner
                </Button>
              </Link>
              <Link to="/universities/demo">
                <Button size="lg" variant="outline" className="border-highlight text-highlight px-8">
                  Request a Demo
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="https://placehold.co/500x400?text=University+Dashboard"
              alt="University dashboard"
              width={500}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-secondary-800 mb-2">Why Universities Partner with GoodDeed</h2>
          <p className="text-secondary-600 mb-12 max-w-3xl mx-auto">
            Join leading institutions that use GoodDeed to enhance service learning, track community engagement, and
            demonstrate institutional impact.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((b, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="bg-highlight-50 p-3 rounded-full inline-block mb-4">{b.icon}</div>
                <h3 className="text-xl font-semibold text-secondary-700 mb-2">{b.title}</h3>
                <p className="text-secondary-600">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-secondary-800 mb-2">How It Works</h2>
          <p className="text-secondary-600 mb-12 max-w-3xl mx-auto">
            Partnering with GoodDeed is easy. Follow these simple steps to enhance your university’s service learning
            and community engagement programs.
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
          <div className="mt-12 text-center">
            <Link to="/universities/partner">
              <Button size="lg" className="bg-highlight hover:bg-highlight-600 text-white px-8">
                Become a Partner
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Service Learning Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="bg-accent-100 text-accent-600 border-none mb-4">Service Learning</Badge>
            <h2 className="text-3xl font-bold text-secondary-800 mb-4">Enhance Academic Service Learning</h2>
            <p className="text-lg text-secondary-600 mb-6">
              GoodDeed provides comprehensive tools to integrate service learning into your curriculum, track student
              hours, and measure learning outcomes.
            </p>
            <div className="grid grid-cols-1 gap-4 mb-8">
              {serviceFeatures.map((feat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-accent-500 flex-shrink-0" />
                  <span className="text-secondary-700">{feat}</span>
                </div>
              ))}
            </div>
            <Link to="/universities/service-learning">
              <Button className="bg-accent-500 hover:bg-accent-600 text-white">
                Learn About Service Learning Tools
              </Button>
            </Link>
          </div>
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-secondary-700 mb-4">Service Learning Dashboard</h3>
            <img
              src="https://placehold.co/500x300?text=Service+Learning+Dashboard"
              alt="Service learning dashboard"
              width={500}
              height={300}
              className="rounded-lg shadow-md mb-6"
            />
            <p className="text-secondary-600 mb-4">
              Our intuitive dashboard gives faculty and administrators a complete overview of student service learning
              activities. Track hours, monitor reflections, and assess learning outcomes all in one place.
            </p>
            <Link to="/universities/demo" className="text-accent-500 font-medium hover:underline inline-flex items-center justify-center">
              Schedule a live demo <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Measurement Section */}
      <section className="py-16 bg-highlight-50">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-secondary-700 mb-4 flex items-center gap-2">
                <BarChart className="h-6 w-6 text-highlight" />
                Institutional Impact Dashboard
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-secondary-700 font-medium">Total Student Service Hours</span>
                    <span className="text-secondary-500 font-bold">24,567 hours</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-highlight h-2 rounded-full" style={{ width: '92%' }} />
                  </div>
                  <p className="text-xs text-secondary-500 mt-1">92% of annual goal (27,000 hours)</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {impactMetrics.slice(1).map((m, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-secondary-500">{m.label}</p>
                      <p className="text-2xl font-bold text-secondary-700">{m.value}</p>
                      <p className="text-xs text-green-500">{m.delta}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <Badge className="bg-highlight-100 text-highlight border-none mb-4">Impact Measurement</Badge>
            <h2 className="text-3xl font-bold text-secondary-800 mb-4">Demonstrate Institutional Impact</h2>
            <p className="text-lg text-secondary-600 mb-6">
              Track, measure, and report on your university’s community engagement and service learning impact with
              comprehensive analytics and reporting tools.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                'Track total student service hours and participation rates',
                'Measure economic and social impact in the community',
                'Generate reports for accreditation and Carnegie Classification',
                'Showcase impact for institutional advancement and fundraising',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-highlight flex-shrink-0 mt-0.5" />
                  <span className="text-secondary-700">{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/universities/impact">
              <Button className="bg-highlight hover:bg-highlight-600 text-white">
                Learn About Impact Measurement
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Partner Universities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-secondary-800 mb-2">Partner Universities</h2>
          <p className="text-secondary-600 mb-12 max-w-3xl mx-auto">
            Join these leading institutions that use GoodDeed to enhance their service learning and community engagement
            programs.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {partnerUniversities.map((u, i) => (
              <div key={i} className="flex items-center justify-center">
                <img
                  src={`https://placehold.co/180x100?text=${encodeURIComponent(u)}`}
                  alt={u}
                  width={180}
                  height={100}
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-secondary-800 mb-2">University Success Stories</h2>
          <p className="text-secondary-600 mb-12 max-w-3xl mx-auto">
            Hear from universities that have enhanced their service learning and community engagement programs with
            GoodDeed.
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
                  <div className="text-left">
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

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl space-y-6">
          <h2 className="text-3xl font-bold text-secondary-800 mb-2 text-center">Frequently Asked Questions</h2>
          <p className="text-secondary-600 mb-12 text-center">
            Get answers to common questions about partnering with GoodDeed for your university.
          </p>
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-secondary-800 mb-2">{faq.question}</h3>
              <p className="text-secondary-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-highlight text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Enhance Your Service Learning Program?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join leading institutions that use GoodDeed to track student service hours, manage community partnerships,
            and demonstrate institutional impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/universities/partner">
              <Button size="lg" className="bg-white text-highlight hover:bg-gray-100 px-8">
                Become a Partner
              </Button>
            </Link>
            <Link to="/universities/demo">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-highlight-600 px-8">
                Request a Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
