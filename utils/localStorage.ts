import { User } from '@/types/user'

const USER_STORAGE_KEY = 'user'

export const getStoredUser = (): User | null => {
  if (typeof window === 'undefined') return null
  const storedUser = localStorage.getItem(USER_STORAGE_KEY)
  return storedUser ? JSON.parse(storedUser) : null
}

export const setStoredUser = (user: User): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
}

export const removeStoredUser = (): void => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(USER_STORAGE_KEY)
}
