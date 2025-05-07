import type { FC } from "react"
import { Button } from "@ui/components/ui/button"
import { Badge } from "@ui/components/ui/badge"
import { X } from "lucide-react"
import { cn } from "@ui/lib/utils"
import { Skeleton } from "@ui/components/ui/skeleton"

interface OpportunityFiltersProps {
  categories: string[]
  locations: string[]
  skills: string[]
  selectedCategory: string
  selectedLocation: string
  selectedSkills: string[]
  matchThreshold: number
  isLoading?: boolean
  onCategoryChange: (category: string) => void
  onLocationChange: (location: string) => void
  onSkillsChange: (skills: string[]) => void
  onMatchThresholdChange: (threshold: number) => void
  onClearFilters: () => void
}

export function OpportunityFiltersSkeleton() {
  return (
    <div className="space-y-0 rounded-lg border border-gray-200/40 shadow-sm overflow-hidden bg-white/95">
      <header className="flex items-center justify-between p-5 border-b border-gray-100/60">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-8 w-16" />
      </header>

      {/* Match Threshold */}
      <section className="p-5 border-b border-gray-100/60">
        <Skeleton className="h-5 w-24 mb-3" />
        <Skeleton className="h-2 w-full rounded-lg" />
        <div className="mt-2.5 flex justify-between">
          <Skeleton className="h-4 w-6" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-10" />
        </div>
      </section>

      {/* Category */}
      <section className="p-5 border-b border-gray-100/60">
        <Skeleton className="h-5 w-24 mb-3" />
        <div className="flex flex-col space-y-1.5">
          {Array(5).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-9 w-full rounded-md" />
          ))}
        </div>
      </section>

      {/* Location */}
      <section className="p-5 border-b border-gray-100/60">
        <Skeleton className="h-5 w-24 mb-3" />
        <div className="flex flex-col space-y-1.5">
          {Array(4).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-9 w-full rounded-md" />
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="p-5">
        <Skeleton className="h-5 w-24 mb-3" />
        <div className="flex flex-wrap gap-2.5">
          {Array(10).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-6 w-16 rounded-full" />
          ))}
        </div>
      </section>
    </div>
  )
}

const OpportunityFilters: FC<OpportunityFiltersProps> = ({
  categories,
  locations,
  skills,
  selectedCategory,
  selectedLocation,
  selectedSkills,
  matchThreshold,
  isLoading = false,
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

  if (isLoading) {
    return <OpportunityFiltersSkeleton />
  }

  return (
    <div className="space-y-0 rounded-lg border border-gray-200/40 shadow-sm overflow-hidden bg-white/95">
      <header className="flex items-center justify-between p-5 border-b border-gray-100/60">
        <h2 className="text-base font-semibold text-secondary-800">Filters</h2>
        {hasActive && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-8 text-xs text-primary-600 hover:text-primary-700 hover:bg-primary-50/60"
          >
            Clear All
          </Button>
        )}
      </header>

      {/* Match Threshold */}
      <section className="p-5 border-b border-gray-100/60">
        <h3 className="mb-3 font-medium text-sm text-secondary-800">Match %</h3>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={matchThreshold}
          onChange={(e) =>
            onMatchThresholdChange(Number(e.currentTarget.value))
          }
          className="w-full h-2 bg-gray-100 rounded-lg cursor-pointer accent-primary-500"
        />
        <div className="mt-2.5 flex justify-between text-xs text-gray-500">
          <span>0%</span>
          <span className="font-medium text-primary-600">{matchThreshold}%+</span>
          <span>100%</span>
        </div>
      </section>

      {/* Category */}
      <section className="p-5 border-b border-gray-100/60">
        <h3 className="mb-3 font-medium text-sm text-secondary-800">Category</h3>
        <div className="flex flex-col space-y-1.5">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant="ghost"
              size="sm"
              className={cn(
                "justify-start px-3 h-9 w-full rounded-md",
                selectedCategory === cat 
                  ? "bg-primary-50/80 text-primary-600 font-medium" 
                  : "text-secondary-700 hover:bg-gray-50/80"
              )}
              onClick={() => onCategoryChange(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </section>

      {/* Location */}
      <section className="p-5 border-b border-gray-100/60">
        <h3 className="mb-3 font-medium text-sm text-secondary-800">Location</h3>
        <div className="flex flex-col space-y-1.5">
          {locations.map((loc) => (
            <Button
              key={loc}
              variant="ghost"
              size="sm"
              className={cn(
                "justify-start px-3 h-9 w-full rounded-md", 
                selectedLocation === loc 
                  ? "bg-primary-50/80 text-primary-600 font-medium" 
                  : "text-secondary-700 hover:bg-gray-50/80"
              )}
              onClick={() => onLocationChange(loc)}
            >
              {loc}
            </Button>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="p-5">
        <h3 className="mb-3 font-medium text-sm text-secondary-800">Skills</h3>
        <div className="flex flex-wrap gap-2.5">
          {skills.map((skill) => {
            const active = selectedSkills.includes(skill)
            return (
              <Badge
                key={skill}
                variant={active ? "default" : "outline"}
                className={cn(
                  "cursor-pointer py-1 px-2.5 transition-colors",
                  active
                    ? "bg-primary-500 hover:bg-primary-600 text-white shadow-sm"
                    : "hover:bg-primary-50/70 border-gray-200/70 text-secondary-700"
                )}
                onClick={() => toggleSkill(skill)}
              >
                {skill}
                {active && <X className="ml-1.5 h-3 w-3" />}
              </Badge>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default OpportunityFilters