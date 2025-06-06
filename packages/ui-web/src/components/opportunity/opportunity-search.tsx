"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@ui/components/ui/input"
import { Button } from "@ui/components/ui/button"
import { Search, X } from "lucide-react"
import { Skeleton } from "@ui/components/ui/skeleton"

interface OpportunitySearchProps {
  defaultValue: string
  isLoading?: boolean
  onSearch: (value: string) => void
}

export function OpportunitySearchSkeleton() {
  return (
    <div className="w-full lg:max-w-xl">
      <div className="relative">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  )
}

export default function OpportunitySearch({ 
  defaultValue, 
  isLoading = false, 
  onSearch 
}: OpportunitySearchProps) {
  const [searchTerm, setSearchTerm] = useState(defaultValue)

  // Update search term when defaultValue changes
  useEffect(() => {
    setSearchTerm(defaultValue)
  }, [defaultValue])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const clearSearch = () => {
    setSearchTerm("")
    onSearch("")
  }

  if (isLoading) {
    return <OpportunitySearchSkeleton />
  }

  return (
    <form onSubmit={handleSubmit} className="w-full lg:max-w-xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search opportunities, organizations, or skills..."
          className="pl-10 pr-10 py-2 h-10 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <Button
          type="submit"
          className="absolute right-0 top-0 h-full rounded-l-none bg-primary-500 hover:bg-primary-600"
          disabled={isLoading}
        >
          Search
        </Button>
      </div>
    </form>
  )
}
