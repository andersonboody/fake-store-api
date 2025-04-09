import { Outlet } from 'react-router-dom'

import classes from './AdminWrapper.module.scss'

export const AdminWrapper = () => {
  return (
    <section className={classes.wrapper}>
      <Outlet />
    </section>
  )
}
