import classes from './Admin.module.scss'
import { AdminHeader } from './AdminHeader/AdminHeader'

const Admin = () => {
  return (
    <section className={classes.admin}>
      <AdminHeader />
      <main className={classes.adminMain}>
        <aside></aside>
      </main>
    </section>
  )
}

export default Admin
