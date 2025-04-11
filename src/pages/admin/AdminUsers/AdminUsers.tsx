import Loading from '@/shared/ui/spin/Spin'
import { AdminUserList } from '@/widgets/Admin/AdminUser/AdminUserList'
import { useGetUsersQuery } from '@/shared/services/api/endpoints/users/users'
import { useLazyGetUserIdQuery } from '@/shared/services/api/endpoints/users/users'

const AdminUsers = () => {
  const { data: allUsers, isFetching: fetchUserAll } = useGetUsersQuery()
  const [searchUser, { data: userId, isFetching: fetchUserId }] = useLazyGetUserIdQuery()

  return (
    <>
      {(fetchUserAll || fetchUserId) && <Loading />}
      {userId && <AdminUserList users={[userId]} searchUser={searchUser} />}
      {!userId && allUsers && <AdminUserList users={allUsers} searchUser={searchUser} />}
    </>
  )
}

export default AdminUsers
