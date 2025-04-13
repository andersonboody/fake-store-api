import { Navigate } from 'react-router-dom'

import { Route } from './route'
import { IProvider } from './Types'

export const ProviderAuth = ({ children }: IProvider) => {
  const isAuth = localStorage.getItem('token')

  if (!isAuth) {
    return <Navigate to={Route.SignIn} replace />
  }

  return children
}
