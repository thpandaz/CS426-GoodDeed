// src/pages/AboutPage.jsx
import { Link } from 'react-router-dom'
import { Phong, Cameron, Grabiel, Logo } from '@repo/assets'
import { Button } from '@repo/ui-web/components/ui/button'
import { getIntials } from '@repo/ui-web/lib/render'

const team = [
  { name: 'Jacob Beaumont', role: 'Co-Founder', image: '' },
  { name: 'Cameron Proulx ', role: 'Co-Founder', image: Cameron },
  { name: 'Gabriel Laboy', role: 'Co-Founder', image: Grabiel },
  { name: 'Phong Trinh Ha', role: 'Co-Founder', image: Phong },
]

export default function AboutPage() {
  return (
    <div className="mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex justify-center mb-8">
                
                <img src={Logo} alt="GoodDeed Logo" className="h-24 rounded-full" />
            </div>
            <div className='font-family-serif'>
                <h2 className="text-2xl font-semibold text-secondary-700 mb-4 text-center ">Our Mission</h2>
                <p className="text-secondary-600 mb-8 text-center max-w-2xl mx-auto text-base">
                    GoodDeed connects passionate volunteers with meaningful opportunities to create positive change. We believe
                    that everyone has something valuable to contribute, and we're here to help you find the perfect way to make
                    a difference.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div>
                    <h3 className="text-xl font-medium text-secondary-700 mb-3">Our Story</h3>
                    <p className="text-secondary-600 mb-4 text-sm">
                        GoodDeed was founded in early s2025 by a group of student who saw a need for a better way to
                        connect volunteers with organizations. After experiencing firsthand the challenges of finding and
                        managing volunteer opportunities, they set out to create a platform that would make the process seamless
                        for both volunteers and organizations.
                    </p>
                    <p className="text-secondary-600 text-sm">
                        Today, GoodDeed has grown into a thriving community of over volunteers and organizations,
                        all working together to create positive change in communities around the world.
                    </p>
                    </div>

                    <div>
                    <h3 className="text-xl font-medium text-secondary-700 mb-3">Our Values</h3>
                    <ul className="space-y-3 text-secondary-600">
                        <li className="flex items-start gap-2">
                        <span className="font-semibold">Community Impact:</span>
                        <span className='text-sm'>We believe in the power of collective action to create meaningful change.</span>
                        </li>
                        <li className="flex items-start gap-2">
                        <span className="font-semibold">Accessibility:</span>
                        <span className='text-sm'>
                            We strive to make volunteering accessible to everyone, regardless of background or experience.
                        </span>
                        </li>
                        <li className="flex items-start gap-2">
                        <span className="font-semibold">Transparency:</span>
                        <span className='text-sm'>We believe in open communication and accountability in all that we do.</span>
                        </li>
                        <li className="flex items-start gap-2">
                        <span className="font-semibold">Growth:</span>
                        <span className='text-sm'>
                            We support the personal and professional development of volunteers and organizations alike.
                        </span>
                        </li>
                    </ul>
                    </div>
                </div>
          </div>

          <h3 className="text-xl font-medium text-secondary-700 mb-4 text-center">Our Team</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {team.map((member, i) => {
              const initials = getIntials(member.name)
              const src = `https://placehold.co/80?text=${initials}`

              return (
                <div key={i} className="text-center">
                  <div className="mx-auto mb-3 bg-gray-100 rounded-full h-20 w-20 flex items-center justify-center">
                    <img
                      src={team[i].image || src}
                      alt={member.name}
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                  </div>
                  <h4 className="font-medium text-secondary-700">{member.name}</h4>
                  <p className="text-sm text-secondary-500">{member.role}</p>
                </div>
              )
            })}
          </div>

          <div className="flex justify-center mt-8">
            <Link to="/contact">
              <Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-white px-8">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
