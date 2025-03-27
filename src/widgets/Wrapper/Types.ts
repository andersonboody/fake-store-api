import { ReactNode } from 'react'

export interface WrapperProps {
  title: string
  onClose: () => void
  children: ReactNode
}
