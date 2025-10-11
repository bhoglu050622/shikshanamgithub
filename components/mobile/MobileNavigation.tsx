'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import {
  Menu,
  X,
  Search,
  Bell,
  User,
  ChevronRight,
  ChevronDown,
} from 'lucide-react'
import { topLevelNavItems, navigationGroups } from '@/lib/navigation-data'
import type { NavigationGroup, NavigationLink } from '@/lib/navigation-data'

interface TopLevelNavItem {
  name: string
  href: string
  icon: React.ElementType
  hasDropdown: boolean
  groupId?: string
}

// ============================================================================
// MOBILE NAVIGATION COMPONENT
// ============================================================================

interface MobileNavigationProps {
  isOpen: boolean
  onClose: () => void
  className?: string
}

export function MobileNavigation({
  isOpen,
  onClose,
  className = '',
}: MobileNavigationProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const router = useRouter()
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)

  // Close navigation when route changes
  useEffect(() => {
    if (isOpen) {
      onClose()
    }
  }, [pathname, isOpen, onClose])

  const handleItemClick = (item: TopLevelNavItem | NavigationLink) => {
    // Check if it's a TopLevelNavItem with a dropdown
    if ('hasDropdown' in item && item.hasDropdown) {
      toggleExpanded(item.name)
    } else {
      router.push(item.href)
      onClose()
    }
  }

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  const isActiveItem = (item: TopLevelNavItem): boolean => {
    if (item.href === pathname) return true
    if (item.hasDropdown) {
      const group = navigationGroups.find((g) => g.id === item.groupId)
      if (group) {
        return group.columns.some((col) =>
          col.links.some((link) => link.href === pathname)
        )
      }
    }
    return false
  }

  return (
    <>
      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div
          className="mobile-nav-overlay"
          onClick={onClose}
        />
      )}

      {/* Mobile Navigation Drawer */}
      <nav
        ref={navRef}
        className={`mobile-nav-drawer ${isOpen ? 'open' : ''}`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="mobile-nav-header">
          <h2 className="mobile-nav-title">Menu</h2>
          <button
            onClick={onClose}
            className="mobile-nav-close"
            aria-label="Close navigation"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mobile-nav-content">
          {topLevelNavItems.map((item) => (
            <MobileNavigationItem
              key={item.name}
              item={item}
              isActive={isActiveItem(item)}
              isExpanded={expandedItems.has(item.name)}
              onItemClick={handleItemClick}
            />
          ))}
        </div>

        {/* Mobile Navigation Footer */}
        <div className="mobile-nav-footer">
          <button
            className="mobile-nav-action"
            onClick={() => {
              router.push('/search')
              onClose()
            }}
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          <button
            className="mobile-nav-action"
            onClick={() => {
              router.push('/notifications')
              onClose()
            }}
            aria-label="Notifications"
          >
            <Bell size={20} />
          </button>

          <button
            className="mobile-nav-action"
            onClick={() => {
              router.push('/account')
              onClose()
            }}
            aria-label="User menu"
          >
            <User size={20} />
          </button>
        </div>
      </nav>
    </>
  )
}

// ============================================================================
// MOBILE NAVIGATION ITEM COMPONENT
// ============================================================================

interface MobileNavigationItemProps {
  item: TopLevelNavItem
  isActive: boolean
  isExpanded: boolean
  onItemClick: (item: TopLevelNavItem | NavigationLink) => void
}

function MobileNavigationItem({
  item,
  isActive,
  isExpanded,
  onItemClick,
}: MobileNavigationItemProps) {
  const hasChildren = item.hasDropdown

  const handleClick = () => {
    onItemClick(item)
  }

  const group = item.hasDropdown
    ? navigationGroups.find((g) => g.id === item.groupId)
    : null

  return (
    <div className="mobile-nav-item">
      <button
        onClick={handleClick}
        className={`mobile-nav-item-button ${isActive ? 'active' : ''}`}
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-current={isActive ? 'page' : undefined}
      >
        <div className="mobile-nav-item-content">
          {item.icon && (
            <span className="mobile-nav-item-icon">
              <item.icon className="w-5 h-5" />
            </span>
          )}
          <span className="mobile-nav-item-label">{item.name}</span>
        </div>
        {hasChildren && (
          <span className="mobile-nav-item-arrow">
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
      </button>

      {hasChildren && isExpanded && group && (
        <div className="mobile-nav-submenu">
          {group.columns.map((col) =>
            col.links.map((link) => (
              <button
                key={link.href}
                onClick={() => onItemClick(link)}
                className="mobile-nav-submenu-item"
                aria-current={
                  typeof window !== 'undefined' &&
                  link.href === window.location.pathname
                    ? 'page'
                    : undefined
                }
              >
                {link.name}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
