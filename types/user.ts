export interface User {
  name?: string
  username?: string
  email?: string
  password?: string
  dob?: string
  presentAddress?: string
  permanentAddress?: string
  city?: string
  postalCode?: string
  country?: string
}

export type UserContextType = {
  user: User | null
  updateUser: (fields: Partial<User>) => void
  clearUser: () => void
}
