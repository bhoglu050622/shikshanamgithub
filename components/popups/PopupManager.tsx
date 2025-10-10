'use client'

import { usePopup } from './PopupContext'
import ContributeContentPopup from './ContributeContentPopup'
import BecomeTeacherPopup from './BecomeTeacherPopup'
import DonatePopup from './DonatePopup'
import PatronPopup from './PatronPopup'

export default function PopupManager() {
  const { activePopup } = usePopup()

  switch (activePopup) {
    case 'contribute':
      return <ContributeContentPopup />
    case 'teacher':
      return <BecomeTeacherPopup />
    case 'donate':
      return <DonatePopup />
    case 'patron':
      return <PatronPopup />
    default:
      return null
  }
}
