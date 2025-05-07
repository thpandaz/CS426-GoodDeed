// src/pages/OrganizationPage.jsx
import { Link } from 'react-router-dom'
import { Button } from '@repo/ui-web/components/ui/button'
import { Badge } from '@repo/ui-web/components/ui/badge'
import {
  Users,
  Calendar,
  BarChart,
  CheckCircle,
  ChevronRight,
  Award,
  MessageSquare,
  Building,
  UserPlus,
  Briefcase,
} from 'lucide-react'

export default function OrganizationPage() {
  const benefits = [
    {
      icon: <UserPlus className="h-8 w-8 text-secondary-500" />,
      title: 'Find Qualified Volunteers',
      description:
        'Connect with volunteers who have the specific skills, interests, and availability your organization needs.',
    },
    {
      icon: <Calendar className="h-8 w-8 text-secondary-500" />,
      title: 'Streamlined Management',
      description:
        'Easily schedule, communicate with, and track volunteers with our intuitive management tools.',
    },
    {
      icon: <BarChart className="h-8 w-8 text-secondary-500" />,
      title: 'Impact Measurement',
      description:
        'Track volunteer hours, measure program outcomes, and generate reports for stakeholders and funders.',
    },
    {
      icon: <Building className="h-8 w-8 text-secondary-500" />,
      title: 'Organizational Tools',
      description:
        'Create teams, manage projects, and coordinate multiple volunteer programs from one dashboard.',
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-secondary-500" />,
      title: 'Volunteer Communication',
      description:
        'Send announcements, updates, and thank-you messages to individuals or groups with built-in messaging.',
    },
    {
      icon: <Award className="h-8 w-8 text-secondary-500" />,
      title: 'Recognition Programs',
      description:
        'Recognize and retain volunteers with automated milestone celebrations and skill endorsements.',
    },
  ]

  const steps = [
    {
      step: '1',
      icon: <Building className="h-8 w-8 text-white" />,
      title: 'Create Your Profile',
      description:
        'Set up your organization profile with mission, needs, and volunteer opportunities.',
      color: 'bg-secondary-500',
    },
    {
      step: '2',
      icon: <Briefcase className="h-8 w-8 text-white" />,
      title: 'Post Opportunities',
      description: 'Create detailed listings for your volunteer needs and requirements.',
      color: 'bg-primary-500',
    },
    {
      step: '3',
      icon: <Users className="h-8 w-8 text-white" />,
      title: 'Connect with Volunteers',
      description: 'Review applications and communicate with potential volunteers.',
      color: 'bg-accent-500',
    },
    {
      step: '4',
      icon: <BarChart className="h-8 w-8 text-white" />,
      title: 'Manage & Measure',
      description:
        'Track hours, manage schedules, and measure the impact of your volunteer program.',
      color: 'bg-highlight',
    },
  ]

  const features = [
    'Customizable application forms and screening questions',
    'Automated volunteer hour tracking and verification',
    'Shift scheduling and calendar management',
    'Team and project organization tools',
    'Volunteer skill tracking and endorsements',
    'Communication and messaging system',
  ]

  const impactMetrics = [
    { label: 'Volunteer Hours', value: '1,245 hours', pct: 85, note: '85% of quarterly goal (1,500 hours)' },
    { label: 'Active Volunteers', value: '128', delta: '↑ 12% from last month' },
    { label: 'Retention Rate', value: '76%', delta: '↑ 5% from last month' },
    { label: 'New Applications', value: '42', delta: '↑ 8% from last month' },
    { label: 'Avg. Hours/Volunteer', value: '9.7', delta: '↑ 2% from last month' },
  ]

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$0',
      period: 'Forever',
      description:
        'Perfect for small organizations just getting started with volunteer management.',
      features: [
        'Up to 25 active volunteers',
        'Basic volunteer profiles',
        '3 volunteer opportunities',
        'Hour tracking',
        'Email support',
      ],
      cta: 'Get Started Free',
      popular: false,
    },
    {
      name: 'Growth',
      price: '$49',
      period: 'per month',
      description:
        'Ideal for growing organizations with regular volunteer programs.',
      features: [
        'Up to 100 active volunteers',
        'Advanced volunteer profiles',
        'Unlimited opportunities',
        'Shift scheduling',
        'Team management',
        'Basic reporting',
        'Priority support',
      ],
      cta: 'Start 14-Day Trial',
      popular: true,
    },
    {
      name: 'Professional',
      price: '$99',
      period: 'per month',
      description:
        'For established organizations with comprehensive volunteer programs.',
      features: [
        'Unlimited volunteers',
        'Background checks',
        'Custom application forms',
        'Advanced reporting',
        'API access',
        'Dedicated account manager',
      ],
      cta: 'Start 14-Day Trial',
      popular: false,
    },
  ]

  const faqs = [
    {
      question: 'How does GoodDeed help us find volunteers?',
      answer:
        'GoodDeed uses a sophisticated matching algorithm to connect your opportunities with volunteers who have the skills, interests, and availability you need. Volunteers can search for opportunities based on cause area, skills required, location, and time commitment. You can also create a custom application form to screen volunteers for specific requirements.',
    },
    {
      question: 'Can we manage multiple programs or locations?',
      answer:
        'Yes! GoodDeed allows you to create multiple teams, projects, and locations within your organization account. You can assign different administrators to manage specific programs, track hours separately, and generate reports for each program or location.',
    },
    {
      question: 'How does hour tracking and verification work?',
      answer:
        'Volunteers can log their hours through the GoodDeed mobile app or website. You can then review and verify these hours. For on-site volunteering, we also offer a check-in/check-out system with QR codes. All hours are automatically calculated and can be exported for reporting.',
    },
    {
      question: 'Can we integrate GoodDeed with our existing systems?',
      answer:
        'GoodDeed offers API access on Professional and Enterprise plans, allowing you to integrate with your CRM, donor management system, or other tools. We also offer direct integrations with popular platforms like Salesforce, Microsoft Dynamics, and more.',
    },
    {
      question: 'Is GoodDeed suitable for small organizations?',
      answer:
        'Our Starter plan is free forever for small organizations managing up to 25 volunteers. As your volunteer program grows, you can easily upgrade to access more features and capacity.',
    },
  ]

  const testimonials = [
    {
      quote:
        "GoodDeed has completely transformed how we recruit and manage volunteers. We've seen a 40% increase in volunteer applications and significantly improved retention.",
      name: 'Sarah Chen',
      role: 'Volunteer Coordinator, City Food Bank',
      image: 'https://placehold.co/80?text=SC',
    },
    {
      quote:
        'The reporting features have been invaluable for our grant applications. We can now easily demonstrate our impact to funders with just a few clicks.',
      name: 'Michael Rodriguez',
      role: 'Executive Director, Community Housing Alliance',
      image: 'https://placehold.co/80?text=MR',
    },
    {
      quote:
        "As a small nonprofit, we couldn't afford a dedicated volunteer manager. GoodDeed's platform has allowed us to efficiently manage our growing volunteer program without adding staff.",
      name: 'Aisha Johnson',
      role: 'Program Director, Youth Mentoring Initiative',
      image: 'https://placehold.co/80?text=AJ',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary-50 to-primary-50 py-16 md:py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Badge className="bg-secondary-100 text-secondary-700 border-none mb-4">
              For Organizations
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-secondary-800 mb-6 leading-tight">
              Find Dedicated Volunteers & Amplify Your Impact
            </h1>
            <p className="text-lg text-secondary-600 mb-8">
              GoodDeed helps nonprofits, community organizations, and social enterprises connect with passionate
              volunteers, streamline management, and measure their impact—all in one powerful platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/organization/signup">
                <Button size="lg" className="bg-secondary-500 hover:bg-secondary-600 text-white px-8">
                  Register Your Organization
                </Button>
              </Link>
              <Link to="/organization/demo">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-secondary-500 text-secondary-500 px-8"
                >
                  Request a Demo
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="https://placehold.co/500x400?text=Organization+Dashboard"
              alt="Organization dashboard"
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
          <h2 className="text-3xl font-bold text-secondary-800 mb-2">
            Why Organizations Choose GoodDeed
          </h2>
          <p className="text-secondary-600 mb-12 max-w-3xl mx-auto">
            Join thousands of organizations that use GoodDeed to find volunteers, manage programs, and increase their
            community impact.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="bg-secondary-50 p-3 rounded-full inline-block mb-4">
                  {b.icon}
                </div>
                <h3 className="text-xl font-semibold text-secondary-700 mb-2">
                  {b.title}
                </h3>
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
            Getting started with GoodDeed is easy. Follow these simple steps to find and manage volunteers for your
            organization.
          </p>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div
                  className={`${s.color} h-16 w-16 rounded-full flex items-center justify-center mb-4 relative`}
                >
                  {s.icon}
                  <span className="absolute -top-2 -right-2 bg-white h-6 w-6 rounded-full text-xs font-bold flex items-center justify-center border-2 border-gray-200">
                    {s.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-secondary-700 mb-2">
                  {s.title}
                </h3>
                <p className="text-secondary-600">{s.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link to="/organization/signup">
              <Button size="lg" className="bg-secondary-500 hover:bg-secondary-600 text-white px-8">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Volunteer Management Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="bg-primary-100 text-primary-700 border-none mb-4">
              Volunteer Management
            </Badge>
            <h2 className="text-3xl font-bold text-secondary-800 mb-4">
              Powerful Tools for Every Organization
            </h2>
            <p className="text-lg text-secondary-600 mb-6">
              GoodDeed provides comprehensive volunteer management tools designed to save you time, increase
              efficiency, and improve volunteer retention.
            </p>
            <div className="grid grid-cols-1 gap-4 mb-8">
              {features.map((feat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-secondary-500 flex-shrink-0" />
                  <span className="text-secondary-700">{feat}</span>
                </div>
              ))}
            </div>
            <Link to="/organization/features">
              <Button className="bg-secondary-500 hover:bg-secondary-600 text-white">
                Explore All Features
              </Button>
            </Link>
          </div>
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-secondary-700 mb-4">Volunteer Dashboard</h3>
            <img
              src="https://placehold.co/500x300?text=Volunteer+Management+Dashboard"
              alt="Volunteer management dashboard"
              width={500}
              height={300}
              className="rounded-lg shadow-md mb-6"
            />
            <p className="text-secondary-600 mb-4">
              Our intuitive dashboard gives you a complete overview of your volunteer program at a glance. Track
              active volunteers, upcoming shifts, and program metrics all in one place.
            </p>
            <Link to="/organization/demo" className="text-secondary-500 font-medium hover:underline inline-flex items-center justify-center">
              Schedule a live demo <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Measurement Section */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-secondary-700 mb-4 flex items-center gap-2">
                <BarChart className="h-6 w-6 text-secondary-500" />
                Impact Dashboard
              </h3>
              <div className="space-y-6">
                {/* Volunteer Hours */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-secondary-700 font-medium">Volunteer Hours</span>
                    <span className="text-secondary-500 font-bold">1,245 hours</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-secondary-500 h-2 rounded-full" style={{ width: '85%' }} />
                  </div>
                  <p className="text-xs text-secondary-500 mt-1">
                    85% of quarterly goal (1,500 hours)
                  </p>
                </div>
                {/* Other Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  {impactMetrics.slice(1).map((m, i) => (
                    <div key={i} className="bg-gray-50 p-4 rounded-lg text-center">
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
            <Badge className="bg-highlight-100 text-highlight border-none mb-4">
              Impact Measurement
            </Badge>
            <h2 className="text-3xl font-bold text-secondary-800 mb-4">
              Measure What Matters
            </h2>
            <p className="text-lg text-secondary-600 mb-6">
              Track volunteer hours, program outcomes, and community impact with powerful analytics and reporting
              tools. Generate custom reports for board meetings, grant applications, and stakeholder updates.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                'Track volunteer hours, attendance, and retention',
                'Measure program outcomes and community impact',
                'Generate custom reports for stakeholders and funders',
                'Export data for grant applications and annual reports',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-highlight flex-shrink-0 mt-0.5" />
                  <span className="text-secondary-700">{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/organization/impact">
              <Button className="bg-highlight hover:bg-highlight-600 text-white">
                Learn About Impact Measurement
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-secondary-800 mb-2">
            Simple, Transparent Pricing
          </h2>
          <p className="text-secondary-600 mb-12 max-w-3xl mx-auto">
            Choose the plan that's right for your organization's size and needs.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <div
                key={i}
                className={`border rounded-lg overflow-hidden hover:shadow-md transition-shadow relative ${
                  plan.popular ? 'border-secondary-500' : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="bg-secondary-500 text-white text-center py-1 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div className="p-6 text-left">
                  <h3 className="text-xl font-bold text-secondary-800 mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-secondary-800">
                      {plan.price}
                    </span>
                    <span className="text-secondary-600">/{plan.period}</span>
                  </div>
                  <p className="text-secondary-600 mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-secondary-500 flex-shrink-0 mt-0.5" />
                        <span className="text-secondary-700">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? 'bg-secondary-500 hover:bg-secondary-600 text-white'
                        : 'bg-white border-secondary-500 text-secondary-500 hover:bg-secondary-50'
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <p className="text-secondary-600 mb-2">
              Need a custom plan for your large organization?
            </p>
            <Link
              to="/organization/enterprise"
              className="inline-flex items-center text-secondary-500 hover:text-secondary-600 font-medium"
            >
              Learn about Enterprise plans
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-secondary-800 mb-2">
            Organization Success Stories
          </h2>
          <p className="text-secondary-600 mb-12 max-w-3xl mx-auto">
            Hear from organizations that have transformed their volunteer programs with GoodDeed.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div className="text-left">
                    <h3 className="font-semibold text-secondary-800">
                      {t.name}
                    </h3>
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
          <h2 className="text-3xl font-bold text-secondary-800 mb-2 text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-secondary-600 mb-12 text-center">
            Get answers to common questions about using GoodDeed for your organization.
          </p>
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-secondary-800 mb-2">
                {faq.question}
              </h3>
              <p className="text-secondary-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Volunteer Program?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of organizations that use GoodDeed to find volunteers,
            streamline management, and increase their impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/organization/signup">
              <Button
                size="lg"
                className="bg-white text-secondary-500 hover:bg-gray-100 px-8"
              >
                Register Your Organization
              </Button>
            </Link>
            <Link to="/organization/demo">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-secondary-600 px-8"
              >
                Request a Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
