import { Link } from 'react-router-dom'

import classes from './logo.module.scss'
import { memo } from 'react'

export const Logo = memo(() => {
  return (
    <Link to={'/'}>
      <p className={classes.logo}>STUFF</p>
    </Link>
  )
})
