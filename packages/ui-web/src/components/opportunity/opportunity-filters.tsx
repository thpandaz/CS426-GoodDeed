import type { FC } from "react"
import { Button } from "@ui/components/ui/button"
import { Badge } from "@ui/components/ui/badge"
import { X } from "lucide-react"
import { cn } from "@ui/lib/utils"

interface OpportunityFiltersProps {
  categories: string[]
  locations: string[]
  skills: string[]
  selectedCategory: string
  selectedLocation: string
  selectedSkills: string[]
  matchThreshold: number
  onCategoryChange: (category: string) => void
  onLocationChange: (location: string) => void
  onSkillsChange: (skills: string[]) => void
  onMatchThresholdChange: (threshold: number) => void
  onClearFilters: () => void
}

const OpportunityFilters: FC<OpportunityFiltersProps> = ({
  categories,
  locations,
  skills,
  selectedCategory,
  selectedLocation,
  selectedSkills,
  matchThreshold,
  onCategoryChange,
  onLocationChange,
  onSkillsChange,
  onMatchThresholdChange,
  onClearFilters,
}) => {
  const hasActive =
    selectedCategory !== "all" ||
    selectedLocation !== "all" ||
    selectedSkills.length > 0 ||
    matchThreshold > 0

  const toggleSkill = (skill: string) =>
    onSkillsChange(
      selectedSkills.includes(skill)
        ? selectedSkills.filter((s) => s !== skill)
        : [...selectedSkills, skill]
    )

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Filters</h2>
        {hasActive && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-8 text-xs"
          >
            Clear All
          </Button>
        )}
      </header>

      {/* Match Threshold */}
      <section className="p-4 border-b">
        <h3 className="mb-2 font-medium">Match %</h3>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={matchThreshold}
          onChange={(e) =>
            onMatchThresholdChange(Number(e.currentTarget.value))
          }
          className="w-full h-2 bg-secondary-200 rounded-lg cursor-pointer"
        />
        <div className="mt-2 flex justify-between text-sm text-gray-500">
          <span>0%</span>
          <span>{matchThreshold}%+</span>
          <span>100%</span>
        </div>
      </section>

      {/* Category */}
      <section className="p-4 border-b">
        <h3 className="mb-2 font-medium">Category</h3>
        <div className="flex flex-col space-y-1">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant="ghost"
              size="sm"
              className={cn(
                "justify-start px-2 h-8 w-full",
                selectedCategory === cat && "bg-primary-50 text-primary-500"
              )}
              onClick={() => onCategoryChange(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </section>

      {/* Location */}
      <section className="p-4 border-b">
        <h3 className="mb-2 font-medium">Location</h3>
        <div className="flex flex-col space-y-1">
          {locations.map((loc) => (
            <Button
              key={loc}
              variant="ghost"
              size="sm"
              className={cn(
                "justify-start px-2 h-8 w-full",
                selectedLocation === loc && "bg-primary-50 text-primary-500"
              )}
              onClick={() => onLocationChange(loc)}
            >
              {loc}
            </Button>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="p-4">
        <h3 className="mb-2 font-medium">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => {
            const active = selectedSkills.includes(skill)
            return (
              <Badge
                key={skill}
                variant={active ? "default" : "outline"}
                className={cn(
                  "cursor-pointer",
                  active
                    ? "bg-primary-500 hover:bg-primary-600 text-white"
                    : "hover:bg-primary-50"
                )}
                onClick={() => toggleSkill(skill)}
              >
                {skill}
                {active && <X className="ml-1 h-3 w-3" />}
              </Badge>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default OpportunityFilters