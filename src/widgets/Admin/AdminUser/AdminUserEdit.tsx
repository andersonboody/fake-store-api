import { EditOutlined } from '@ant-design/icons'
import { memo, useState } from 'react'
import { useForm } from 'react-hook-form'

import classes from './AdminUser.module.scss'
import { AdminUserProps } from './TypesDTO'
import { UserSingUpType } from '@/shared/services/api/endpoints/users/usersDTO'
import { ModalCustom } from '@/widgets/ModalCustom/ModalCustom'
import { InputRole } from '@/shared/ui/formUser/Inputs'
import {
  EDIT_ROLE_ERROR_USER,
  EDIT_ROLE_LOADING_USER,
  EDIT_ROLE_SUCCESS_USER,
  INotification,
  NotificationType,
} from '@/widgets/Notification/NotificationType'
import { Notification } from '@/widgets/Notification/Notification'
import { usePutProfileMutation } from '@/shared/services/api/endpoints/users/users'

export const AdminUserEdit = memo(({ user }: AdminUserProps) => {
  const [openEditModal, setOpenEditModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserSingUpType | null>(null)
  const [notification, setNotification] = useState<INotification | null>(null)

  const [updateUser] = usePutProfileMutation()

  const { register, handleSubmit, reset } = useForm<UserSingUpType>({ mode: 'onBlur' })

  const openEditUser = (user: UserSingUpType) => {
    setOpenEditModal(true)
    setSelectedUser(user)
  }

  const closeEditUser = () => {
    setOpenEditModal(false)
    setSelectedUser(null)
    reset()
  }

  const handleEditUSer = async (data: { role: string }) => {
    if (!selectedUser) return

    const newUser = { ...selectedUser, role: data.role }
    setOpenEditModal(false)
    setNotification({ types: NotificationType.INFO, message: EDIT_ROLE_LOADING_USER(selectedUser.name) })
    try {
      await updateUser(newUser).unwrap()
      setNotification({
        types: NotificationType.SUCCESS,
        message: EDIT_ROLE_SUCCESS_USER(selectedUser.name, data.role),
      })
    } catch (e) {
      console.error(e)
      setNotification({ types: NotificationType.ERROR, message: EDIT_ROLE_ERROR_USER(selectedUser.name) })
    }
  }
  return (
    <>
      <button className={classes.tableButton} onClick={() => openEditUser(user)}>
        <EditOutlined />
      </button>

      <ModalCustom open={openEditModal} onCancel={closeEditUser}>
        <form className="form" onSubmit={handleSubmit(handleEditUSer)}>
          <InputRole register={register} />
          <button className="buttonForm">Изменить</button>
        </form>
      </ModalCustom>

      {notification && <Notification types={notification.types} message={notification.message} />}
    </>
  )
})
