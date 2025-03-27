import { CloseOutlined } from '@ant-design/icons'
import { useEffect } from 'react'

import classes from './Wrapper.module.scss'
import { WrapperProps } from './Types'

const Wrapper = ({ title, onClose, children }: WrapperProps) => {
  useEffect(() => {
    document.body.classList.add(classes.overflowHidden)
    return () => document.body.classList.remove(classes.overflowHidden)
  }, [])

  return (
    <section className={classes.wrapper}>
      <div className={classes.content}>
        <div className={classes.contentHeader}>
          <button className={classes.contentClose} onClick={onClose}>
            <CloseOutlined />
          </button>
          <h3 className={classes.contentTitle}>{title}</h3>
        </div>
        {children}
      </div>
    </section>
  )
}

export default Wrapper
