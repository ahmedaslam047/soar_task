import { UserContext } from '@/contexts/context'
import { UserContextType } from '@/types/user'
import { useContext } from 'react'

export const useUser = (): UserContextType => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
