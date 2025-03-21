import { createBrowserRouter } from 'react-router-dom'

import App from '../app'
import { Route } from './route'
import { Main } from '../../pages/main/main'
import SignUp from '../../pages/sign-up/SignUp'
import SingIn from '../../pages/sign-in/SignIn'
import Profile from '../../pages/profile/Profiel'
import Error from '../../pages/error/Error'

export const MainRouter = createBrowserRouter([
  {
    errorElement: <Error />,
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: Route.SignUp,
        element: <SignUp />,
      },
      {
        path: Route.SignIn,
        element: <SingIn />,
      },
      {
        path: Route.Profile,
        element: <Profile />,
      },
    ],
  },
])
