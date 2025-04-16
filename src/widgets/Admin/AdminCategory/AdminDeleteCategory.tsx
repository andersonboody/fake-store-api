import { useEffect, useState } from 'react'
import { DeleteOutlined } from '@ant-design/icons'

import classes from '../AdminTable.module.scss'
import {
  DELETE_ERROR_CATEGORY,
  DELETE_SUCCESS_CATEGORY,
  INotification,
  NotificationType,
} from '@/widgets/Notification/NotificationType'
import { useDeleteCategoryMutation } from '@/shared/services/api/endpoints/categories/categories'
import { Notification } from '@/widgets/Notification/Notification'
import { ModalCustom } from '@/widgets/ModalCustom/ModalCustom'
import { IAdminCategory } from './Types'

export const AdminDeleteCategory = ({ category }: IAdminCategory) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [notification, setNotification] = useState<INotification | null>(null)
  const [deleteCategory, { isSuccess, isError }] = useDeleteCategoryMutation()

  useEffect(() => {
    if (isSuccess) setNotification({ types: NotificationType.SUCCESS, message: DELETE_SUCCESS_CATEGORY })
    if (isError) setNotification({ types: NotificationType.ERROR, message: DELETE_ERROR_CATEGORY })
  }, [isSuccess, isError])

  const handleDeleteCategory = async (id: number) => {
    setModalOpen(false)
    await deleteCategory(id)
  }

  return (
    <>
      <button className={classes.tableButton} onClick={() => setModalOpen(true)}>
        <DeleteOutlined />
      </button>

      <ModalCustom open={modalOpen} onCancel={() => setModalOpen(false)}>
        <div className="form">
          <p className="formText">
            Вы действительно хотите удалить товар <span className="formTextLight">{category.name}</span>?
          </p>
          <div className="buttonGroup">
            <button className="buttonForm" onClick={() => setModalOpen(false)}>
              Нет
            </button>
            <button className="buttonForm" onClick={() => handleDeleteCategory(category.id)}>
              Да
            </button>
          </div>
        </div>
      </ModalCustom>

      {notification && <Notification types={notification.types} message={notification.message} />}
    </>
  )
}
