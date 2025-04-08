import { Link } from 'react-router-dom'
import { memo } from 'react'

import classes from './logo.module.scss'

export const Logo = memo(() => {
  return (
    <Link to={'/'}>
      <p className={classes.logo}>STUFF</p>
    </Link>
  )
})
