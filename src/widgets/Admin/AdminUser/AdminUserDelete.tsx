import { DeleteOutlined } from '@ant-design/icons'
import { memo, useState } from 'react'

import classes from './AdminUser.module.scss'
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

export const AdminUserDelete = memo(({ user }: AdminUserProps) => {
  const [notification, setNotification] = useState<INotification | null>(null)
  const [deleteUser] = useDeleteUserMutation()

  const handleDeleteUser = async (user: UserSingUpType) => {
    setNotification({ types: NotificationType.INFO, message: DELETE_LOADING_USER(user.name) })
    try {
      await deleteUser(user.id!).unwrap()
      setNotification({ types: NotificationType.SUCCESS, message: DELETE_SUCCESS_USER(user.name) })
    } catch (e) {
      console.error(e)
      setNotification({ types: NotificationType.ERROR, message: DELETE_ERRORS_USER(user.name) })
    }
  }

  return (
    <>
      <button className={classes.tableButton} onClick={() => handleDeleteUser(user!)}>
        <DeleteOutlined />
      </button>
      {notification && <Notification types={notification.types} message={notification.message} />}
    </>
  )
})
