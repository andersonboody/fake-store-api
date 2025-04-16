import { EditOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
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
  const [updateUser, { data, isSuccess, isError }] = usePutProfileMutation()
  const { register, handleSubmit } = useForm<UserSingUpType>({ mode: 'onBlur' })

  useEffect(() => {
    if (isSuccess) {
      setNotification({
        types: NotificationType.SUCCESS,
        message: EDIT_ROLE_SUCCESS_USER(user.name, data.role),
      })
    }
    if (isError) setNotification({ types: NotificationType.ERROR, message: EDIT_ROLE_ERROR_USER(user.name) })
  }, [isSuccess, isError, user, data])

  const handleEditUSer = async (data: { role: string }) => {
    if (!data || !user) return

    const newUser = { ...user, role: data.role }
    setOpenEditModal(false)
    setNotification({ types: NotificationType.INFO, message: EDIT_ROLE_LOADING_USER(newUser.name) })
    await updateUser(newUser).unwrap()
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
