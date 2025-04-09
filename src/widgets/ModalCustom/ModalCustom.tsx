import { ReactNode } from 'react'
import { Modal } from 'antd'

import classes from './ModalCustom.module.scss'

interface IModalCustom {
  children: ReactNode
  open: boolean
  onCancel: () => void
}

export const ModalCustom = ({ children, open, onCancel }: IModalCustom) => {
  return (
    <Modal open={open} onCancel={onCancel} closable={false} footer={null} className={classes.modalAvatar}>
      {children}
    </Modal>
  )
}
