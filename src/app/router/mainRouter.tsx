import { createBrowserRouter } from 'react-router-dom'

import App from '../app'
import { Route } from './route'
import { Main } from '@/pages/main/main'
import { SignInLazy, SignUpLazy, ProfileLazy, ErrorLazy, AdminLazy, ProductDetailsLazy, OrderLazy } from '@/pages'
import { AdminCategoriesLazy, AdminHome, AdminProductsLazy, AdminUsersLazy } from '@/pages/admin'
import { ProviderAuth } from './providerAuth'
import { ProviderProfile } from './providerProfile'

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
        element: (
          <ProviderProfile>
            <SignUpLazy />
          </ProviderProfile>
        ),
      },
      {
        path: Route.SignIn,
        element: (
          <ProviderProfile>
            <SignInLazy />
          </ProviderProfile>
        ),
      },
      {
        path: Route.Profile,
        element: (
          <ProviderAuth>
            <ProfileLazy />
          </ProviderAuth>
        ),
      },

      {
        path: '/product/:slug',
        element: <ProductDetailsLazy />,
      },
      {
        path: Route.Order,
        element: (
          <ProviderAuth>
            <OrderLazy />
          </ProviderAuth>
        ),
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
