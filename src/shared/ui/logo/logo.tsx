import { Link } from 'react-router-dom'

import classes from './logo.module.scss'

export const Logo = () => {
  return (
    <Link to={'/'}>
      <p className={classes.logo}>STUFF</p>
    </Link>
  )
}
