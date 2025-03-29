import { CloseOutlined } from '@ant-design/icons'
import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import classes from './Wrapper.module.scss'
import { WrapperProps } from './Types'

const Wrapper = ({ title, onClose, children }: WrapperProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const modelRoot = document.getElementById('modal-root') as HTMLElement

  const checkIfClickedOutside = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [checkIfClickedOutside])

  useEffect(() => {
    document.body.classList.add(classes.overflowHidden)
    return () => document.body.classList.remove(classes.overflowHidden)
  }, [])

  return createPortal(
    <section className={classes.wrapper}>
      <div className={classes.content} ref={ref}>
        <div className={classes.contentHeader}>
          <button className={classes.contentClose} onClick={onClose}>
            <CloseOutlined />
          </button>
          <h3 className={classes.contentTitle}>{title}</h3>
        </div>
        {children}
      </div>
    </section>,
    modelRoot
  )
}

export default Wrapper
