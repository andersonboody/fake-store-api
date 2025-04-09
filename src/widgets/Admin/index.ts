import { lazy } from 'react'

import AdminHome from './AdminHome/AdminHome'

const AdminProductsLazy = lazy(() => import('./AdminProducts/AdminProducts'))
const AdminUsersLazy = lazy(() => import('./AdminUsers/AdminUsers'))
const AdminCategoriesLazy = lazy(() => import('./AdminCategories/AdminCategories'))

export { AdminHome, AdminProductsLazy, AdminUsersLazy, AdminCategoriesLazy }
