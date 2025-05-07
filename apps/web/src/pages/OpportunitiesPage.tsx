import { useState, useEffect, useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import OpportunityList from "@repo/ui-web/components/opportunity/opportunity-list"
import OpportunityFilters from "@repo/ui-web/components/opportunity/opportunity-filters"
import OpportunitySearch from "@repo/ui-web/components/opportunity/opportunity-search"
import { Button } from "@repo/ui-web/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui-web/components/ui/tabs"
import { Grid3X3, List, SlidersHorizontal, ChevronDown } from "lucide-react"
import { cn } from "@repo/ui-web/lib/utils"
import { useMediaQuery } from "@repo/ui-web/hooks/use-media-query"
import { Drawer, DrawerContent, DrawerTrigger } from "@repo/ui-web/components/ui/drawer"
import { ScrollArea } from "@repo/ui-web/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui-web/components/ui/dropdown-menu"
import type { OpportunityType } from "./data.temp"
import { opportunities as opp, categories, locations, skills } from "./data.temp"

export default function OpportunitiesDashboard() {
    const [searchParams, setSearchParams] = useSearchParams()
    const isDesktop = useMediaQuery("(min-width: 1024px)")

  // Memoize our filter object
    const filters = useMemo(() => ({
        search:           searchParams.get("search")        || "",
        category:         searchParams.get("category")      || "all",
        location:         searchParams.get("location")      || "all",
        skills:           searchParams.get("skills")        || "",
        view:             searchParams.get("view")          || "list",
        sort:             searchParams.get("sort")          || "relevance",
        status:           searchParams.get("status")        || "all",
        matchThreshold:   searchParams.get("matchThreshold")|| "70",
        page:             searchParams.get("page")          || "1",    // ← new
    }), [searchParams])
    
    const sortOptions = {
        relevance: "Most Relevant",
        newest: "Newest First", 
        oldest: "Oldest First",
    }

    const [opportunities, setOpportunities] = useState<OpportunityType[]>([])
    const [loading, setLoading] = useState(true)

    const PAGE_SIZE = 5
    const page = Number(searchParams.get("page") || "1")
    const totalItems = opportunities.length
    const totalPages = Math.ceil(totalItems / PAGE_SIZE)

    // Compute the slice for the current page:
    const start = (page - 1) * PAGE_SIZE
    const pageItems = opportunities.slice(start, start + PAGE_SIZE)

    // Helper to bump the page in the URL:
    const goToPage = (p: number) => {
        updateQuery("page", String(p))
    }

  // Fetch fresh data whenever any filter changes
  useEffect(() => {
    const fetchOpportunities = async () => {
        setLoading(true)
        try {
            // const qs = new URLSearchParams(filters).toString()
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500))
            setOpportunities(opp)
        } catch (error) {
            console.error("Failed to fetch opportunities:", error)
        } finally {
            setLoading(false)
        }
    }

    fetchOpportunities()
  }, [filters])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [filters.page])

  // Helper to update a single query param
  const updateQuery = (key: keyof typeof filters, value: string) => {
    const next = new URLSearchParams(searchParams)
    if (key !== "page") next.set("page", "1")
    if (value && value !== "all") next.set(key, value)
    else next.delete(key)

    setSearchParams(next, { replace: false })

  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-secondary-800">Volunteer Opportunities</h1>
          <p className="text-secondary-600">Find and manage volunteer opportunities that match your interests</p>
        </header>

        {/* Search + View Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="flex-1">
            <OpportunitySearch
              defaultValue={filters.search}
              onSearch={(val) => updateQuery("search", val)}
            />
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  Sort by {sortOptions[filters.sort as keyof typeof sortOptions]}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {Object.entries(sortOptions).map(([value, label]) => (
                  <DropdownMenuItem
                    key={value}
                    onClick={() => updateQuery("sort", value)}
                  >
                    {label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {!isDesktop && (
              <Drawer onOpenChange={(open) => {/* track open state if you want */}}>
                <DrawerTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4" /> Filters
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="h-[80vh]">
                  <ScrollArea className="h-full p-6">
                    <OpportunityFilters
                      selectedCategory={filters.category}
                      selectedLocation={filters.location}
                      selectedSkills={filters.skills ? filters.skills.split(",").filter(Boolean) : []}
                      matchThreshold={Number(filters.matchThreshold)}
                      onMatchThresholdChange={(v) => updateQuery("matchThreshold", v.toString())}
                      categories={categories}
                      locations={locations}
                      skills={skills}
                      onCategoryChange={(v) => updateQuery("category", v)}
                      onLocationChange={(v) => updateQuery("location", v)}
                      onSkillsChange={(arr) => updateQuery("skills", arr.join(","))}
                      onClearFilters={() => {
                        updateQuery("category", "")
                        updateQuery("location", "")
                        updateQuery("skills", "")
                      }}
                    />
                  </ScrollArea>
                </DrawerContent>
              </Drawer>
            )}

            <div className="flex items-center border rounded-md overflow-hidden">
              <Button
                variant="ghost"
                size="sm"
                className={cn("rounded-none border-r h-9 px-3", filters.view === "list" && "bg-primary-50 text-primary-600")}
                onClick={() => updateQuery("view", "list")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn("rounded-none h-9 px-3", filters.view === "grid" && "bg-primary-50 text-primary-600")}
                onClick={() => updateQuery("view", "grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Status Tabs */}
        <Tabs defaultValue={filters.status} onValueChange={(v) => updateQuery("status", v)}>
        <TabsList className="bg-white border border-gray-200 rounded-lg p-1 shadow-sm mb-6">
            {["all","applied","saved","active"].map(st=>( 
            <TabsTrigger key={st} value={st} className="rounded-md data-[state=active]:bg-primary-50">
                {st[0].toUpperCase()+st.slice(1)}
            </TabsTrigger>
            ))}
        </TabsList>

        {/* grid: sidebar + main */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
            {/* desktop filters */}
            {isDesktop && (
            <aside className="h-fit bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden sticky top-4">
                <OpportunityFilters
                selectedCategory={filters.category}
                selectedLocation={filters.location}
                selectedSkills={filters.skills ? filters.skills.split(",").filter(Boolean) : []}
                matchThreshold={Number(filters.matchThreshold)}
                onMatchThresholdChange={(v) => updateQuery("matchThreshold", v.toString())}
                categories={categories}
                locations={locations}
                skills={skills}
                onCategoryChange={(v) => updateQuery("category", v)}
                onLocationChange={(v) => updateQuery("location", v)}
                onSkillsChange={(arr) => updateQuery("skills", arr.join(","))}
                onClearFilters={() => {
                    updateQuery("category","")
                    updateQuery("location","")
                    updateQuery("skills","")
                }}
                />
            </aside>
            )}

            {/* main results */}
            <main>
                {loading ? (
                    <div className="flex items-center justify-center h-[400px]">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
                    </div>
                ) : (
                    <TabsContent value={filters.status}>
                      <OpportunityList 
                        opportunities={pageItems} 
                        view={filters.view} 
                        onPageChange={goToPage}
                        pageSize={PAGE_SIZE}
                        totalItems={totalItems}
                        page={page}
                        />
                      {/* PAGINATION CONTROLS (must live inside the TabPanel) */}
                      {totalPages > 1 && (
                        <div className="flex justify-center items-center space-x-2 mt-6">
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={page === 1}
                            onClick={() => goToPage(page - 1)}
                          >
                            Previous
                          </Button>
  
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <Button
                              key={p}
                              size="sm"
                              variant={p === page ? "default" : "ghost"}
                              onClick={() => goToPage(p)}
                            >
                              {p}
                            </Button>
                          ))}
  
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={page === totalPages}
                            onClick={() => goToPage(page + 1)}
                          >
                            Next
                          </Button>
                        </div>
                      )}
                    </TabsContent>
                )}
                </main>
        </div>
        </Tabs>
      </div>
    </div>
  )
}
