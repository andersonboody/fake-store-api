import { createBrowserRouter } from 'react-router-dom'

import App from '../app'
import { Route } from './route'
import { Main } from '@/pages/main/main'
import { SignInLazy, SignUpLazy, ProfileLazy, ErrorLazy, AdminLazy, ProductDetailsLazy, OrderLazy } from '@/pages'
import { AdminCategoriesLazy, AdminHome, AdminProductsLazy, AdminUsersLazy } from '@/widgets/Admin'

export const MainRouter = createBrowserRouter([
  {
    errorElement: <ErrorLazy />,
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: '/:slug',
        element: <Main />,
      },
      {
        path: Route.SignUp,
        element: <SignUpLazy />,
      },
      {
        path: Route.SignIn,
        element: <SignInLazy />,
      },
      {
        path: Route.Profile,
        element: <ProfileLazy />,
      },

      {
        path: '/product/:slug',
        element: <ProductDetailsLazy />,
      },
      {
        path: Route.Order,
        element: <OrderLazy />,
      },
      {
        path: Route.Admin,
        element: <AdminLazy />,
        children: [
          {
            index: true,
            element: <AdminHome />,
          },
          {
            path: Route.AdminUsers,
            element: <AdminUsersLazy />,
          },
          {
            path: Route.AdminProducts,
            element: <AdminProductsLazy />,
          },
          {
            path: Route.AdminCategories,
            element: <AdminCategoriesLazy />,
          },
        ],
      },
    ],
  },
])
