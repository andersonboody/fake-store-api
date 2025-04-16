import { useEffect, useState } from 'react'
import { UserAddOutlined } from '@ant-design/icons'
import { useForm } from 'react-hook-form'

import classes from '../AdminTable.module.scss'
import { ModalCustom } from '@/widgets/ModalCustom/ModalCustom'
import { InputAvatar, InputEmail, InputPassword, InputRole, InputUserName } from '@/shared/ui/formUser/Inputs'
import { Notification } from '@/widgets/Notification/Notification'
import {
  INotification,
  NotificationType,
  REGISTER_ERROR_MESSAGE,
  REGISTER_LOADING_MESSAGE,
  REGISTER_SUCCESS_MESSAGE,
} from '@/widgets/Notification/NotificationType'
import { UserSingUpType } from '@/shared/services/api/endpoints/users/usersDTO'
import { usePostUserMutation } from '@/shared/services/api/endpoints/users/users'

export const AdminUserCreate = () => {
  const [notification, setNotification] = useState<INotification | null>(null)
  const [openAddModal, setOpenAddModal] = useState(false)

  const [createUser, { isSuccess, isError }] = usePostUserMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSingUpType>({ mode: 'onBlur' })

  useEffect(() => {
    if (isSuccess) {
      setNotification({
        types: NotificationType.SUCCESS,
        message: REGISTER_SUCCESS_MESSAGE,
      })
    }
    if (isError) setNotification({ types: NotificationType.ERROR, message: REGISTER_ERROR_MESSAGE })
  }, [isSuccess, isError])

  const handleCreateUser = async (data: UserSingUpType) => {
    if (!data) return

    const avatar =
      data.avatar || 'https://avatars.mds.yandex.net/i?id=9feb996bf910b500a2da7acbcb7bb4a3_l-8474988-images-thumbs&n=13'
    setOpenAddModal(false)
    setNotification({ types: NotificationType.INFO, message: REGISTER_LOADING_MESSAGE })

    await createUser({ ...data, avatar: avatar })
  }

  return (
    <>
      <button className={classes.tableButton} onClick={() => setOpenAddModal(true)}>
        <UserAddOutlined />
      </button>

      <ModalCustom open={openAddModal} onCancel={() => setOpenAddModal(false)}>
        <form className="form" onSubmit={handleSubmit(handleCreateUser)}>
          <InputUserName name="name" register={register} errors={errors} />
          <InputEmail name="email" register={register} errors={errors} />
          <InputAvatar name="avatar" register={register} errors={errors} />
          <InputRole name="role" register={register} />
          <InputPassword name="role" register={register} errors={errors} />
          <button className="buttonForm">Создать</button>
        </form>
      </ModalCustom>

      {notification && <Notification types={notification.types} message={notification.message} />}
    </>
  )
}
