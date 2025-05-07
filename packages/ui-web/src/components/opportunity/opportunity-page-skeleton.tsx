import { OpportunityFiltersSkeleton } from "./opportunity-filters"
import { OpportunityListSkeleton } from "./opportunity-skeleton"
import { OpportunitySearchSkeleton } from "./opportunity-search"

export function OpportunityPageSkeleton() {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="mb-8 flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <div className="mb-2">
            <Skeleton className="h-8 w-48" />
          </div>
          <Skeleton className="h-5 w-72" />
        </div>
        <div className="flex items-center gap-4">
          <OpportunitySearchSkeleton />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-md" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        <aside>
          <OpportunityFiltersSkeleton />
        </aside>
        <div>
          <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Skeleton className="h-5 w-40" />
            <div className="flex gap-2">
              <Skeleton className="h-9 w-28 rounded-md" />
              <Skeleton className="h-9 w-28 rounded-md" />
            </div>
          </div>
          <OpportunityListSkeleton view="grid" />
        </div>
      </div>
    </div>
  )
}

import { Skeleton } from "@repo/ui-web/components/ui/skeleton" 