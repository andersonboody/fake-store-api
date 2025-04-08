export type UserSingUpType = {
  id?: number
  email: string
  name: string
  password: string
  role: string
  avatar: string
}
export type UserSingInType = {
  email: string
  password: string
}

export type EmailIsAvailable = {
  isAvailable?: boolean
  email?: string
}
