import { lazy } from 'react'

export const SignUpLazy = lazy(() => import('./sign-up/SignUp'))
export const SignInLazy = lazy(() => import('./sign-in/SignIn'))
export const ProfileLazy = lazy(() => import('./profile/Profile'))
export const ErrorLazy = lazy(() => import('./error/Error'))
