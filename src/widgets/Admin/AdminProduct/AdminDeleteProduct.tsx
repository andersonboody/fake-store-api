import { useEffect, useState } from 'react'
import { DeleteOutlined } from '@ant-design/icons'

import classes from '../AdminTable.module.scss'
import { useDeleteProductMutation } from '@/shared/services/api/endpoints/products/products'
import { AdminProductType } from './Types'
import {
  DELETE_ERROR_PRODUCT,
  DELETE_SUCCESS_PRODUCT,
  INotification,
  NotificationType,
} from '@/widgets/Notification/NotificationType'
import { Notification } from '@/widgets/Notification/Notification'
import { ModalCustom } from '@/widgets/ModalCustom/ModalCustom'

export const AdminDeleteProduct = ({ product }: AdminProductType) => {
  const [openModal, setModalOpen] = useState(false)
  const [notification, setNotification] = useState<INotification | null>(null)
  const [deleteProduct, { isSuccess, isError }] = useDeleteProductMutation()

  useEffect(() => {
    if (isSuccess) setNotification({ types: NotificationType.SUCCESS, message: DELETE_SUCCESS_PRODUCT(product.title) })
    if (isError) setNotification({ types: NotificationType.ERROR, message: DELETE_ERROR_PRODUCT(product.title) })
  }, [isSuccess, isError, product])

  const handleDeleteProduct = async (id: number) => {
    setModalOpen(false)
    await deleteProduct(id)
  }

  return (
    <>
      <button className={classes.tableButton} onClick={() => setModalOpen(true)}>
        <DeleteOutlined />
      </button>

      {notification && <Notification types={notification.types} message={notification.message} />}

      <ModalCustom open={openModal} onCancel={() => setModalOpen(false)}>
        <div className="form">
          <p className="formText">
            Вы действительно хотите удалить товар <span className="formTextLight">{product.title}</span>?
          </p>
          <div className="buttonGroup">
            <button className="buttonForm" onClick={() => setModalOpen(false)}>
              Нет
            </button>
            <button className="buttonForm" onClick={() => handleDeleteProduct(product.id)}>
              Да
            </button>
          </div>
        </div>
      </ModalCustom>
    </>
  )
}
