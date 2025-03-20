import { ReactNode } from 'react'

import classes from './Container.module.scss'

interface IContainer {
  children: ReactNode
}

export const Container = ({ children }: IContainer) => {
  return <div className={classes.container}>{children}</div>
}
