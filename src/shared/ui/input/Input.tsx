import { FC } from 'react'

import classes from './Input.module.scss'
import { SearchOutlined } from '@ant-design/icons'

export const Input: FC = () => {
  return (
    <div className={classes.blockInput}>
      <input type="text" className={classes.input} />
      <button className={classes.button}>
        <SearchOutlined />
      </button>
    </div>
  )
}
