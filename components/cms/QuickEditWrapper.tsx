'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useQuickEdit } from '@/cms/lib/hooks/useQuickEdit'
import { QuickEditType } from '@/cms/lib/generated/prisma'
import { Edit, Save, X, RotateCcw } from 'lucide-react'

interface QuickEditWrapperProps {
  page: string
  component: string
  element: string
  type: QuickEditType
  defaultValue: string
  metadata?: any
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  autoSave?: boolean
  showEditButton?: boolean
  editButtonPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  onEdit?: () => void
  onSave?: (value: string) => void
  onCancel?: () => void
}

export function QuickEditWrapper({
  page,
  component,
  element,
  type,
  defaultValue,
  metadata,
  children,
  className = '',
  style = {},
  autoSave = true,
  showEditButton = true,
  editButtonPosition = 'top-right',
  onEdit,
  onSave,
  onCancel
}: QuickEditWrapperProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showEditControls, setShowEditControls] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const {
    value,
    setValue,
    isEditing,
    startEdit,
    saveEdit,
    cancelEdit,
    resetToDefault,
    isLoading,
    error
  } = useQuickEdit({
    page,
    component,
    element,
    type,
    defaultValue,
    metadata,
    autoSave
  })

  // Apply the value as CSS style for color/background types
  const getAppliedStyle = (): React.CSSProperties => {
    const appliedStyle = { ...style }

    switch (type) {
      case 'COLOR':
        appliedStyle.color = value
        break
      case 'BUTTON_COLOR':
        appliedStyle.backgroundColor = value
        break
      case 'BACKGROUND_COLOR':
        appliedStyle.backgroundColor = value
        break
      case 'FONT_SIZE':
        appliedStyle.fontSize = value
        break
      case 'FONT_WEIGHT':
        appliedStyle.fontWeight = value
        break
      case 'SPACING':
        appliedStyle.padding = value
        break
      case 'BORDER_RADIUS':
        appliedStyle.borderRadius = value
        break
      case 'SHADOW':
        appliedStyle.boxShadow = value
        break
    }

    return appliedStyle
  }

  // Handle edit button click
  const handleEditClick = () => {
    startEdit()
    setShowEditControls(true)
    onEdit?.()
  }

  // Handle save
  const handleSave = async () => {
    await saveEdit()
    setShowEditControls(false)
    onSave?.(value)
  }

  // Handle cancel
  const handleCancel = () => {
    cancelEdit()
    setShowEditControls(false)
    onCancel?.()
  }

  // Handle reset
  const handleReset = () => {
    resetToDefault()
    setShowEditControls(false)
  }

  // Get edit button position classes
  const getEditButtonClasses = () => {
    const baseClasses = 'absolute z-10 bg-white border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-shadow'
    
    switch (editButtonPosition) {
      case 'top-right':
        return `${baseClasses} top-2 right-2`
      case 'top-left':
        return `${baseClasses} top-2 left-2`
      case 'bottom-right':
        return `${baseClasses} bottom-2 right-2`
      case 'bottom-left':
        return `${baseClasses} bottom-2 left-2`
      default:
        return `${baseClasses} top-2 right-2`
    }
  }

  // Get edit controls position classes
  const getEditControlsClasses = () => {
    const baseClasses = 'absolute z-20 bg-white border border-gray-300 rounded-md shadow-lg p-2 flex items-center space-x-1'
    
    switch (editButtonPosition) {
      case 'top-right':
        return `${baseClasses} top-2 right-2`
      case 'top-left':
        return `${baseClasses} top-2 left-2`
      case 'bottom-right':
        return `${baseClasses} bottom-2 right-2`
      case 'bottom-left':
        return `${baseClasses} bottom-2 left-2`
      default:
        return `${baseClasses} top-2 right-2`
    }
  }

  return (
    <div
      ref={wrapperRef}
      className={`relative group ${className}`}
      style={getAppliedStyle()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Content */}
      {type === 'TEXT' || type === 'BUTTON_LABEL' ? (
        <span>{value}</span>
      ) : (
        children
      )}

      {/* Edit Button */}
      {showEditButton && isHovered && !showEditControls && (
        <button
          className={getEditButtonClasses()}
          onClick={handleEditClick}
          title="Edit this element"
        >
          <Edit className="w-4 h-4 text-gray-600" />
        </button>
      )}

      {/* Edit Controls */}
      {showEditControls && (
        <div className={getEditControlsClasses()}>
          {type === 'COLOR' || type === 'BUTTON_COLOR' || type === 'BACKGROUND_COLOR' ? (
            <input
              type="color"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
          ) : type === 'TEXT' || type === 'BUTTON_LABEL' ? (
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded text-sm"
              autoFocus
            />
          ) : (
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded text-sm"
              placeholder={type.toLowerCase().replace('_', ' ')}
              autoFocus
            />
          )}
          
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="p-1 text-green-600 hover:bg-green-50 rounded"
            title="Save changes"
          >
            <Save className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleReset}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
            title="Reset to default"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleCancel}
            className="p-1 text-red-600 hover:bg-red-50 rounded"
            title="Cancel editing"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Error Indicator */}
      {error && (
        <div className="absolute top-0 left-0 right-0 bg-red-100 border border-red-300 text-red-700 px-2 py-1 text-xs">
          {error}
        </div>
      )}
    </div>
  )
}

// Specialized components for common use cases
export function EditableText({
  page,
  component,
  element,
  defaultValue,
  className = '',
  style = {},
  ...props
}: Omit<QuickEditWrapperProps, 'type' | 'children'>) {
  return (
    <QuickEditWrapper
      page={page}
      component={component}
      element={element}
      type="TEXT"
      defaultValue={defaultValue}
      className={className}
      style={style}
      {...props}
    >
      <span>{defaultValue}</span>
    </QuickEditWrapper>
  )
}

export function EditableButton({
  page,
  component,
  element,
  defaultValue,
  className = '',
  style = {},
  onClick,
  ...props
}: Omit<QuickEditWrapperProps, 'type' | 'children'> & { onClick?: () => void }) {
  return (
    <QuickEditWrapper
      page={page}
      component={component}
      element={element}
      type="BUTTON_LABEL"
      defaultValue={defaultValue}
      className={className}
      style={style}
      {...props}
    >
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        onClick={onClick}
      >
        {defaultValue}
      </button>
    </QuickEditWrapper>
  )
}

export function EditableColor({
  page,
  component,
  element,
  defaultValue,
  className = '',
  style = {},
  children,
  ...props
}: Omit<QuickEditWrapperProps, 'type'>) {
  return (
    <QuickEditWrapper
      page={page}
      component={component}
      element={element}
      type="COLOR"
      defaultValue={defaultValue}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </QuickEditWrapper>
  )
}

export function EditableBackground({
  page,
  component,
  element,
  defaultValue,
  className = '',
  style = {},
  children,
  ...props
}: Omit<QuickEditWrapperProps, 'type'>) {
  return (
    <QuickEditWrapper
      page={page}
      component={component}
      element={element}
      type="BACKGROUND_COLOR"
      defaultValue={defaultValue}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </QuickEditWrapper>
  )
}
