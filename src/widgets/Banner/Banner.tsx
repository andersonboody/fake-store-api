import { Carousel } from 'antd'
import { FC } from 'react'

import classes from './Banner.module.scss'

export const Banner: FC = () => {
  return (
    <Carousel className={classes.carousel}>
      <div>
        <h3 className={classes.slide}>1</h3>
      </div>
      <div>
        <h3 className={classes.slide}>2</h3>
      </div>
      <div>
        <h3 className={classes.slide}>3</h3>
      </div>
    </Carousel>
  )
}
