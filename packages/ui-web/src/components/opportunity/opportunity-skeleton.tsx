import { Skeleton } from "@repo/ui-web/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@repo/ui-web/components/ui/card"

interface OpportunitySkeletonProps {
  view?: "grid" | "list"
  count?: number
}

export function OpportunityCardSkeleton({ view = "grid" }: { view?: "grid" | "list" }) {
  if (view === "list") {
    return (
      <Card className="overflow-hidden border-gray-200/60">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3.5">
                <Skeleton className="h-10 w-10 rounded-md flex-shrink-0" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <div className="mt-4 flex items-center gap-4">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-24" />
            </div>
            <div className="mt-4 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="mt-4 flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </div>
          <div className="bg-gray-50/70 p-5 md:p-6 flex md:flex-col justify-between items-center md:items-stretch gap-4 md:w-48 border-t md:border-t-0 md:border-l border-gray-200/50">
            <Skeleton className="h-4 w-24" />
            <div className="flex md:flex-col gap-3">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-9 rounded" />
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden border-gray-200/60">
      <CardHeader className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3.5">
            <Skeleton className="h-10 w-10 rounded-md flex-shrink-0" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </CardHeader>

      <CardContent className="p-5 pt-0">
        <div className="flex items-center gap-4 mb-3.5">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-24" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 flex justify-between items-center">
        <Skeleton className="h-3 w-24" />
        <div className="flex gap-2.5">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-16 rounded" />
        </div>
      </CardFooter>
    </Card>
  )
}

export function OpportunityListSkeleton({ 
  view = "grid", 
  count = 6 
}: OpportunitySkeletonProps) {
  return (
    <div
      className={
        view === "grid"
          ? "grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
          : "grid gap-5 grid-cols-1"
      }
    >
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <OpportunityCardSkeleton key={i} view={view} />
        ))}
    </div>
  )
} 