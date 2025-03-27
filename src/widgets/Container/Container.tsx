import classes from './Container.module.scss'
import { IContainer } from './Types'

export const Container = ({ children }: IContainer) => {
  return <div className={classes.container}>{children}</div>
}
