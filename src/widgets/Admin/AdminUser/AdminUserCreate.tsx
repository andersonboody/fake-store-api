import { memo, useState } from 'react'
import { UserAddOutlined } from '@ant-design/icons'
import { useForm } from 'react-hook-form'

import classes from './AdminUser.module.scss'
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

export const AdminUserCreate = memo(() => {
  const [notification, setNotification] = useState<INotification | null>(null)
  const [openAddModal, setOpenAddModal] = useState(false)

  const [createUser] = usePostUserMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserSingUpType>({ mode: 'onBlur' })

  const closeCreateUser = () => {
    setOpenAddModal(false)
    reset()
  }

  const handleCreateUser = async (data: UserSingUpType) => {
    if (!data) return

    const avatar =
      data.avatar || 'https://avatars.mds.yandex.net/i?id=9feb996bf910b500a2da7acbcb7bb4a3_l-8474988-images-thumbs&n=13'
    setOpenAddModal(false)
    setNotification({ types: NotificationType.INFO, message: REGISTER_LOADING_MESSAGE })

    try {
      await createUser({ ...data, avatar: avatar })
      setNotification({
        types: NotificationType.SUCCESS,
        message: REGISTER_SUCCESS_MESSAGE,
      })
    } catch (e) {
      console.error(e)
      setNotification({ types: NotificationType.ERROR, message: REGISTER_ERROR_MESSAGE })
    }
  }

  return (
    <>
      <button className={classes.tableButton} onClick={() => setOpenAddModal(true)}>
        <UserAddOutlined />
      </button>

      <ModalCustom open={openAddModal} onCancel={closeCreateUser}>
        <form className="form" onSubmit={handleSubmit(handleCreateUser)}>
          <InputUserName register={register} errors={errors} />
          <InputEmail register={register} errors={errors} />
          <InputAvatar register={register} errors={errors} />
          <InputRole register={register} />
          <InputPassword register={register} errors={errors} />
          <button className="buttonForm">Создать</button>
        </form>
      </ModalCustom>

      {notification && <Notification types={notification.types} message={notification.message} />}
    </>
  )
})
