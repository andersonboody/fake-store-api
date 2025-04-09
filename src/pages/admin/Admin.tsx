import classes from './Admin.module.scss'
import { AdminHeader } from '@/widgets/Admin/AdminHeader/AdminHeader'
import { AdminAside } from '@/widgets/Admin/AdminAside/AdminAside'
import { AdminWrapper } from '@/widgets/Admin/AdminWrapper/AdminWrapper'

const Admin = () => {
  return (
    <section className={classes.admin}>
      <AdminHeader />
      <main className={classes.adminMain}>
        <AdminAside />
        <AdminWrapper></AdminWrapper>
      </main>
    </section>
  )
}

export default Admin
