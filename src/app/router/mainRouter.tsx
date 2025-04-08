import { createBrowserRouter } from 'react-router-dom'

import App from '../app'
import { Route } from './route'
import { Main } from '@/pages/main/main'
import { SignInLazy, SignUpLazy, ProfileLazy, ErrorLazy, AdminLazy, ProductDetailsLazy, OrderLazy } from '@/pages'

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
        path: Route.Admin,
        element: <AdminLazy />,
      },
      {
        path: '/product/:slug',
        element: <ProductDetailsLazy />,
      },
      {
        path: Route.Order,
        element: <OrderLazy />,
      },
    ],
  },
])
