import { Navigate } from 'react-router-dom'

import classes from './Admin.module.scss'
import { AdminHeader } from '@/widgets/Admin/AdminHeader/AdminHeader'
import { AdminAside } from '@/widgets/Admin/AdminAside/AdminAside'
import { AdminWrapper } from '@/widgets/Admin/AdminWrapper/AdminWrapper'
import { useGetProfileQuery } from '@/shared/services/api/endpoints/users/users'
import { getAccessToken } from '@/shared/lib/getAccessToken'
import Loading from '@/shared/ui/spin/Spin'
import { Route } from '@/app/router/route'

const Admin = () => {
  const { data: profile, isFetching } = useGetProfileQuery(getAccessToken())

  if (isFetching) return <Loading />
  if (!profile) return <Navigate to="/" replace />

  if (profile && profile.role !== 'admin') {
    return <Navigate to={Route.Profile} replace />
  }

  return (
    <section className={classes.admin}>
      <AdminHeader profile={profile} />
      {profile && (
        <main className={classes.adminMain}>
          <AdminAside />
          <AdminWrapper></AdminWrapper>
        </main>
      )}
    </section>
  )
}

export default Admin
