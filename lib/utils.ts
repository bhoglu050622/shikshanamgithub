import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Date formatting utilities to prevent hydration mismatches
export function formatDateStable(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  // Use a consistent format that works the same on server and client
  return d.toISOString().split('T')[0] // YYYY-MM-DD format
}

export function formatDateLong(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  // Use a consistent format that works the same on server and client
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${month}/${day}/${year}` // MM/DD/YYYY format
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const dateStr = formatDateLong(d)
  const timeStr = d.toTimeString().split(' ')[0] // HH:MM:SS format
  return `${dateStr} ${timeStr}`
}

// Generate stable IDs for components
let idCounter = 0
export function generateStableId(prefix: string = 'id'): string {
  return `${prefix}-${++idCounter}`
}
