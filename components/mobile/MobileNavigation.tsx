/**
 * Mobile Navigation Component
 * Comprehensive mobile navigation with touch-friendly interactions
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  Home, 
  BookOpen, 
  Users, 
  Settings, 
  Search,
  Bell,
  User,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { 
  MobileNavigationConfig, 
  MobileNavigationItem,
  DeviceInfo 
} from '@/lib/mobile/types';
import { detectDevice, isMobileBreakpoint } from '@/lib/mobile/device-detection';
import { useTouchGestures, hapticFeedback, visualFeedback } from '@/lib/mobile/touch-gestures';

// ============================================================================
// MOBILE NAVIGATION COMPONENT
// ============================================================================

interface MobileNavigationProps {
  config?: Partial<MobileNavigationConfig>;
  className?: string;
}

export function MobileNavigation({ config, className = '' }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const router = useRouter();
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  const defaultConfig: MobileNavigationConfig = {
    items: [
      {
        id: 'home',
        label: 'Home',
        href: '/',
        icon: 'Home',
      },
      {
        id: 'courses',
        label: 'Courses',
        href: '/courses',
        icon: 'BookOpen',
        children: [
          { id: 'sanskrit', label: 'Sanskrit', href: '/schools/sanskrit' },
          { id: 'darshana', label: 'Darshana', href: '/schools/darshana' },
          { id: 'self-help', label: 'Self-Help', href: '/schools/self-help' },
        ],
      },
      {
        id: 'gurus',
        label: 'Gurus',
        href: '/gurus',
        icon: 'Users',
      },
      {
        id: 'tools',
        label: 'Tools',
        href: '/tools',
        icon: 'Settings',
      },
    ],
    showHomeButton: true,
    showSearchButton: true,
    showUserMenu: true,
    showNotifications: true,
    position: 'bottom',
    style: 'tabs',
  };

  const finalConfig = { ...defaultConfig, ...config };

  // Detect device on mount
  useEffect(() => {
    setDeviceInfo(detectDevice());
  }, []);

  // Close navigation when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle touch gestures
  useTouchGestures(navRef.current, {
    onSwipe: (direction) => {
      if (direction === 'left' && isOpen) {
        setIsOpen(false);
        hapticFeedback('light');
      }
    },
  });

  const toggleNavigation = () => {
    setIsOpen(!isOpen);
    hapticFeedback('medium');
  };

  const handleItemClick = (item: MobileNavigationItem) => {
    if (item.children && item.children.length > 0) {
      toggleExpanded(item.id);
    } else {
      router.push(item.href);
      setIsOpen(false);
      hapticFeedback('light');
    }
  };

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
    hapticFeedback('light');
  };

  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ComponentType<any>> = {
      Home,
      BookOpen,
      Users,
      Settings,
      Search,
      Bell,
      User,
    };
    const IconComponent = icons[iconName] || Home;
    return <IconComponent size={20} />;
  };

  const isActiveItem = (item: MobileNavigationItem): boolean => {
    if (item.href === pathname) return true;
    if (item.children) {
      return item.children.some(child => child.href === pathname);
    }
    return false;
  };

  if (!deviceInfo || !isMobileBreakpoint(deviceInfo.screenWidth)) {
    return null;
  }

  return (
    <>
      {/* Mobile Navigation Toggle */}
      <button
        onClick={toggleNavigation}
        className={`mobile-nav-toggle ${className}`}
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div 
          className="mobile-nav-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Navigation Drawer */}
      <nav
        ref={navRef}
        className={`mobile-nav-drawer ${isOpen ? 'open' : ''} ${finalConfig.style}`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="mobile-nav-header">
          <h2 className="mobile-nav-title">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="mobile-nav-close"
            aria-label="Close navigation"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mobile-nav-content">
          {finalConfig.items.map((item) => (
            <MobileNavigationItem
              key={item.id}
              item={item}
              isActive={isActiveItem(item)}
              isExpanded={expandedItems.has(item.id)}
              onItemClick={handleItemClick}
              onToggleExpanded={toggleExpanded}
              getIcon={getIcon}
            />
          ))}
        </div>

        {/* Mobile Navigation Footer */}
        <div className="mobile-nav-footer">
          {finalConfig.showSearchButton && (
            <button
              className="mobile-nav-action"
              onClick={() => {
                router.push('/search');
                setIsOpen(false);
              }}
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          )}
          
          {finalConfig.showNotifications && (
            <button
              className="mobile-nav-action"
              onClick={() => {
                router.push('/notifications');
                setIsOpen(false);
              }}
              aria-label="Notifications"
            >
              <Bell size={20} />
            </button>
          )}
          
          {finalConfig.showUserMenu && (
            <button
              className="mobile-nav-action"
              onClick={() => {
                router.push('/account');
                setIsOpen(false);
              }}
              aria-label="User menu"
            >
              <User size={20} />
            </button>
          )}
        </div>
      </nav>
    </>
  );
}

// ============================================================================
// MOBILE NAVIGATION ITEM COMPONENT
// ============================================================================

interface MobileNavigationItemProps {
  item: MobileNavigationItem;
  isActive: boolean;
  isExpanded: boolean;
  onItemClick: (item: MobileNavigationItem) => void;
  onToggleExpanded: (itemId: string) => void;
  getIcon: (iconName: string) => React.ReactNode;
}

function MobileNavigationItem({
  item,
  isActive,
  isExpanded,
  onItemClick,
  onToggleExpanded,
  getIcon,
}: MobileNavigationItemProps) {
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      onToggleExpanded(item.id);
    } else {
      onItemClick(item);
    }
  };

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
              {getIcon(item.icon)}
            </span>
          )}
          <span className="mobile-nav-item-label">{item.label}</span>
          {item.badge && (
            <span className="mobile-nav-item-badge">
              {item.badge}
            </span>
          )}
        </div>
        {hasChildren && (
          <span className="mobile-nav-item-arrow">
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
      </button>

      {hasChildren && isExpanded && (
        <div className="mobile-nav-submenu">
          {item.children!.map((child) => (
            <button
              key={child.id}
              onClick={() => onItemClick(child)}
              className="mobile-nav-submenu-item"
              aria-current={child.href === window.location.pathname ? 'page' : undefined}
            >
              {child.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// BOTTOM TAB NAVIGATION
// ============================================================================

interface BottomTabNavigationProps {
  items: MobileNavigationItem[];
  className?: string;
}

export function BottomTabNavigation({ items, className = '' }: BottomTabNavigationProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleItemClick = (item: MobileNavigationItem) => {
    router.push(item.href);
    hapticFeedback('light');
  };

  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ComponentType<any>> = {
      Home,
      BookOpen,
      Users,
      Settings,
      Search,
      Bell,
      User,
    };
    const IconComponent = icons[iconName] || Home;
    return <IconComponent size={24} />;
  };

  const isActiveItem = (item: MobileNavigationItem): boolean => {
    if (item.href === pathname) return true;
    if (item.children) {
      return item.children.some(child => child.href === pathname);
    }
    return false;
  };

  return (
    <nav className={`bottom-tab-navigation ${className}`} role="navigation">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => handleItemClick(item)}
          className={`bottom-tab-item ${isActiveItem(item) ? 'active' : ''}`}
          aria-current={isActiveItem(item) ? 'page' : undefined}
          aria-label={item.label}
        >
          <span className="bottom-tab-icon">
            {getIcon(item.icon || 'Home')}
          </span>
          <span className="bottom-tab-label">{item.label}</span>
          {item.badge && (
            <span className="bottom-tab-badge">
              {item.badge}
            </span>
          )}
        </button>
      ))}
    </nav>
  );
}

// ============================================================================
// FLOATING ACTION BUTTON
// ============================================================================

interface FloatingActionButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  className?: string;
}

export function FloatingActionButton({
  onClick,
  icon,
  label,
  position = 'bottom-right',
  className = '',
}: FloatingActionButtonProps) {
  const handleClick = () => {
    onClick();
    hapticFeedback('medium');
  };

  return (
    <button
      onClick={handleClick}
      className={`floating-action-button ${position} ${className}`}
      aria-label={label}
    >
      {icon}
    </button>
  );
}
