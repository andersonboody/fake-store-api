import { memo } from 'react'
import { Carousel } from 'antd'

import classes from './Banner.module.scss'

export const Banner = memo(() => {
  return (
    <Carousel className={classes.carousel}>
      <div>
        <h3 className={classes.slide}>Сдесь может быть ваша реклама!</h3>
      </div>
      <div>
        <h3 className={classes.slide}>И сдесь!</h3>
      </div>
      <div>
        <h3 className={classes.slide}>И да же тут!</h3>
      </div>
    </Carousel>
  )
})
