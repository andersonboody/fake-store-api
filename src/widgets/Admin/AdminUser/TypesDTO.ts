import { UserSingUpType } from '@/shared/services/api/endpoints/users/usersDTO'

export type AdminUserProps = {
  user: UserSingUpType
}

export interface IAdminUser {
  users: UserSingUpType[]
  searchUser: (id: number) => void
}
