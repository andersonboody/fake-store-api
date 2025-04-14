import { EditOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import classes from '../AdminTable.module.scss'
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

export const AdminUserEdit = ({ user }: AdminUserProps) => {
  const [openEditModal, setOpenEditModal] = useState(false)
  const [notification, setNotification] = useState<INotification | null>(null)
  const [updateUser] = usePutProfileMutation()
  const { register, handleSubmit } = useForm<UserSingUpType>({ mode: 'onBlur' })

  const handleEditUSer = async (data: { role: string }) => {
    if (!data || !user) return

    const newUser = { ...user, role: data.role }
    setOpenEditModal(false)
    setNotification({ types: NotificationType.INFO, message: EDIT_ROLE_LOADING_USER(newUser.name) })
    try {
      await updateUser(newUser).unwrap()
      setNotification({
        types: NotificationType.SUCCESS,
        message: EDIT_ROLE_SUCCESS_USER(newUser.name, data.role),
      })
    } catch (e) {
      console.error(e)
      setNotification({ types: NotificationType.ERROR, message: EDIT_ROLE_ERROR_USER(newUser.name) })
    }
  }
  return (
    <>
      <button className={classes.tableButton} onClick={() => setOpenEditModal(true)}>
        <EditOutlined />
      </button>

      <ModalCustom open={openEditModal} onCancel={() => setOpenEditModal(false)}>
        <form className="form" onSubmit={handleSubmit(handleEditUSer)}>
          <InputRole name="role" register={register} />
          <button className="buttonForm">Изменить</button>
        </form>
      </ModalCustom>

      {notification && <Notification types={notification.types} message={notification.message} />}
    </>
  )
}
