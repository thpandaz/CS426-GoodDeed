// ExploreCard.tsx
import { Link } from "react-router-dom"
import { cn } from "@ui/lib/utils"

interface ExploreCardProps {
  title: string
  description: string
  icon: string
  href: string
  color: string
}

export default function ExploreCard({
  title,
  description,
  icon,
  href,
  color,
}: ExploreCardProps) {
  return (
    <Link
      to={href}
      className="block border border-gray-200 rounded-lg bg-white p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col items-start gap-4">
        <div className={cn("rounded-full p-2 w-20 h-20 flex items-center justify-center", color)}>
          <img src={icon || "/placeholder.svg"} alt={title} className="w-16 h-16 object-contain" />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-secondary-800">{title}</h3>
          <p className="text-sm text-secondary-600">{description}</p>
        </div>
      </div>
    </Link>
  )
}
