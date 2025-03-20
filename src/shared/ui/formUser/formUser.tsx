import { Link } from 'react-router-dom'

import classes from './formUser.module.scss'
import { Logo } from '../logo/logo'
import { IFormUser } from './Types'

export const FormUser = ({ title, children, text, slug, slugText }: IFormUser) => {
  return (
    <section className={classes.client}>
      <div className={classes.clientHeader}>
        <Logo />
      </div>
      <div className={classes.clientForm}>
        <h2 className={classes.clientFormTitle}>{title}</h2>
        {children}
        <p className={classes.clientFooter}>
          {text} <Link to={slug}>{slugText}</Link>
        </p>
      </div>
    </section>
  )
}
