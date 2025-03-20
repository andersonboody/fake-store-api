export type UserSingUpType = {
  email: string
  name: string
  password: string
  role?: string
  avatar: string
}
export type UserSingInType = {
  email: string
  password: string
}

export type UserProfileType = Required<UserSingUpType> & {
  id: number
}
