import { DownOutlined, HeartOutlined, ShoppingOutlined } from '@ant-design/icons'
import { memo } from 'react'
import { Link } from 'react-router-dom'

import classes from './Header.module.scss'
import { Route } from '@/app/router/route'

export const MemoizedShoppingOutlined = memo(ShoppingOutlined)
export const MemoizedDownOutlined = memo(DownOutlined)
export const MemoizedHeartOutlined = memo(HeartOutlined)

export const MemoizedSignInLink = memo(() => (
  <Link to={Route.SignIn} className={`button ${classes.btnUser}`}>
    Sign-In
  </Link>
))

export const MemoizedSingUpLink = memo(() => (
  <Link to={Route.SignUp} className={`button ${classes.btnUser}`}>
    Sign-Up
  </Link>
))

export const MemoizedProfileLink = memo(() => <Link to={Route.Profile}>Profile</Link>)
