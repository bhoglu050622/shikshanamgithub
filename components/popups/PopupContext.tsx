'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type PopupType = 'contribute' | 'teacher' | 'donate' | 'patron' | null

interface PopupContextType {
  activePopup: PopupType
  openPopup: (type: PopupType) => void
  closePopup: () => void
}

const PopupContext = createContext<PopupContextType | undefined>(undefined)

export function PopupProvider({ children }: { children: ReactNode }) {
  const [activePopup, setActivePopup] = useState<PopupType>(null)

  const openPopup = (type: PopupType) => {
    setActivePopup(type)
  }

  const closePopup = () => {
    setActivePopup(null)
  }

  return (
    <PopupContext.Provider value={{ activePopup, openPopup, closePopup }}>
      {children}
    </PopupContext.Provider>
  )
}

export function usePopup() {
  const context = useContext(PopupContext)
  if (context === undefined) {
    throw new Error('usePopup must be used within a PopupProvider')
  }
  return context
}
