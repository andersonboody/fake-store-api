import { Navigate } from 'react-router-dom'
import { IProvider } from './Types'
import { Route } from './route'

export const ProviderProfile = ({ children }: IProvider) => {
  const isAuth = localStorage.getItem('token')

  if (isAuth) {
    return <Navigate to={Route.Profile} replace />
  }
  return children
}
