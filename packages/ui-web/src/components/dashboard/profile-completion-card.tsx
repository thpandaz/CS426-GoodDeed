// ProfileCompletionCard.tsx
import { Button } from "@ui/components/ui/button"
import { Link } from "react-router-dom"

interface ProfileCompletionCardProps {
  percentage: number
}

export default function ProfileCompletionCard({ percentage }: ProfileCompletionCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 relative overflow-hidden">
      {/* Green vertical line on the left */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-highlight"></div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-secondary-800">Nice work!</h3>
        <p className="text-secondary-600">
          Your profile has the highest chance of being seen by organizations. As you gain new skills and experiences,
          add them to your profile.
        </p>
        <Link to="/profile">
          <Button className="bg-accent-500 hover:bg-accent-600 text-white">
            View my profile
          </Button>
        </Link>
      </div>
    </div>
  )
}
