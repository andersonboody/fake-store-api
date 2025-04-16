import { DeleteOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'

import classes from '../AdminTable.module.scss'
import { UserSingUpType } from '@/shared/services/api/endpoints/users/usersDTO'
import {
  DELETE_ERRORS_USER,
  DELETE_LOADING_USER,
  DELETE_SUCCESS_USER,
  INotification,
  NotificationType,
} from '@/widgets/Notification/NotificationType'
import { Notification } from '@/widgets/Notification/Notification'
import { useDeleteUserMutation } from '@services/api/endpoints/users/users'
import { AdminUserProps } from './TypesDTO'
import { ModalCustom } from '@/widgets/ModalCustom/ModalCustom'

export const AdminUserDelete = ({ user }: AdminUserProps) => {
  const [openModal, setModalOpen] = useState(false)
  const [notification, setNotification] = useState<INotification | null>(null)
  const [deleteUser, { isError, isSuccess }] = useDeleteUserMutation()

  useEffect(() => {
    if (isSuccess) setNotification({ types: NotificationType.SUCCESS, message: DELETE_SUCCESS_USER(user.name) })
    if (isError) setNotification({ types: NotificationType.ERROR, message: DELETE_ERRORS_USER(user.name) })
  }, [isError, isSuccess, user])

  const handleDeleteUser = async (user: UserSingUpType) => {
    setNotification({ types: NotificationType.INFO, message: DELETE_LOADING_USER(user.name) })
    setModalOpen(false)
    await deleteUser(user.id!).unwrap()
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
            Вы действительно хотите удалить товар <span className="formTextLight">{user.name}</span>?
          </p>
          <div className="buttonGroup">
            <button className="buttonForm" onClick={() => setModalOpen(false)}>
              Нет
            </button>
            <button className="buttonForm" onClick={() => handleDeleteUser(user!)}>
              Да
            </button>
          </div>
        </div>
      </ModalCustom>
    </>
  )
}
