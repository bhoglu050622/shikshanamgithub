/**
 * Date Range Filter Component
 * Provides date range selection for analytics dashboard
 */

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar, ChevronDown } from 'lucide-react'

interface DateRange {
  start: string
  end: string
}

interface DateRangeFilterProps {
  dateRange: DateRange
  onChange: (range: DateRange) => void
}

export default function DateRangeFilter({ dateRange, onChange }: DateRangeFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [tempRange, setTempRange] = useState(dateRange)

  const presets = [
    {
      label: 'Last 7 days',
      getValue: () => ({
        start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0]
      })
    },
    {
      label: 'Last 30 days',
      getValue: () => ({
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0]
      })
    },
    {
      label: 'Last 90 days',
      getValue: () => ({
        start: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0]
      })
    },
    {
      label: 'This month',
      getValue: () => {
        const now = new Date()
        const start = new Date(now.getFullYear(), now.getMonth(), 1)
        return {
          start: start.toISOString().split('T')[0],
          end: now.toISOString().split('T')[0]
        }
      }
    },
    {
      label: 'Last month',
      getValue: () => {
        const now = new Date()
        const start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        const end = new Date(now.getFullYear(), now.getMonth(), 0)
        return {
          start: start.toISOString().split('T')[0],
          end: end.toISOString().split('T')[0]
        }
      }
    }
  ]

  const formatDateRange = (range: DateRange) => {
    const startDate = new Date(range.start)
    const endDate = new Date(range.end)
    
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
      })
    }
    
    return `${formatDate(startDate)} - ${formatDate(endDate)}`
  }

  const handlePresetClick = (preset: typeof presets[0]) => {
    const newRange = preset.getValue()
    setTempRange(newRange)
    onChange(newRange)
    setIsOpen(false)
  }

  const handleCustomApply = () => {
    onChange(tempRange)
    setIsOpen(false)
  }

  const handleCustomCancel = () => {
    setTempRange(dateRange)
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-between min-w-[200px]">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{formatDateRange(dateRange)}</span>
          </div>
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 space-y-4">
          {/* Presets */}
          <div>
            <Label className="text-sm font-medium">Quick ranges</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {presets.map((preset) => (
                <Button
                  key={preset.label}
                  variant="ghost"
                  size="sm"
                  className="justify-start text-left h-auto py-2"
                  onClick={() => handlePresetClick(preset)}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Custom Range */}
          <div className="border-t pt-4">
            <Label className="text-sm font-medium">Custom range</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div>
                <Label htmlFor="start-date" className="text-xs text-muted-foreground">
                  From
                </Label>
                <Input
                  id="start-date"
                  type="date"
                  value={tempRange.start}
                  onChange={(e) => setTempRange({ ...tempRange, start: e.target.value })}
                  max={tempRange.end}
                />
              </div>
              <div>
                <Label htmlFor="end-date" className="text-xs text-muted-foreground">
                  To
                </Label>
                <Input
                  id="end-date"
                  type="date"
                  value={tempRange.end}
                  onChange={(e) => setTempRange({ ...tempRange, end: e.target.value })}
                  min={tempRange.start}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
            
            <div className="flex gap-2 mt-3">
              <Button size="sm" onClick={handleCustomApply}>
                Apply
              </Button>
              <Button size="sm" variant="outline" onClick={handleCustomCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
