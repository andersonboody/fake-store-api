import { Link, useLocation } from 'react-router-dom'

import classes from './AdminAside.module.scss'
import { Route } from '@/app/router/route'

export const AdminAside = () => {
  const slug = useLocation()

  return (
    <aside className={classes.menu}>
      <ul className={classes.menuList}>
        <li className={classes.menuItem}>
          <Link to={Route.Admin} className={slug.pathname === Route.Admin ? classes.menuLinkActive : classes.menuLink}>
            Главная
          </Link>
        </li>
        <li className={classes.menuItem}>
          <Link
            to={Route.AdminUsers}
            className={slug.pathname === Route.AdminUsers ? classes.menuLinkActive : classes.menuLink}
          >
            Пользователи
          </Link>
        </li>
        <li className={classes.menuItem}>
          <Link
            to={Route.AdminProducts}
            className={slug.pathname === Route.AdminProducts ? classes.menuLinkActive : classes.menuLink}
          >
            Товары
          </Link>
        </li>
        <li className={classes.menuItem}>
          <Link
            to={Route.AdminCategories}
            className={slug.pathname === Route.AdminCategories ? classes.menuLinkActive : classes.menuLink}
          >
            Категории
          </Link>
        </li>
      </ul>
    </aside>
  )
}
