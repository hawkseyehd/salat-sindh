'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Filter } from 'lucide-react'

interface SearchFilterProps {
  placeholder?: string
  onSearch?: (query: string) => void
  onFilter?: () => void
  className?: string
}

export function SearchFilter({ 
  placeholder = "Search...", 
  onSearch, 
  onFilter,
  className = ""
}: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (onSearch) {
        onSearch(searchQuery)
      }
    }, 300) // Debounce search

    return () => clearTimeout(timeoutId)
  }, [searchQuery, onSearch])

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input 
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      {onFilter && (
        <Button variant="outline" className="rounded-lg shadow-sm" onClick={onFilter}>
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      )}
    </div>
  )
}
