import { FileAddOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import classes from '../AdminTable.module.scss'
import { usePostCategoryMutation } from '@/shared/services/api/endpoints/categories/categories'
import { CategoryType } from '@/shared/services/api/endpoints/categories/categoriesDTO'
import {
  CREATE_ERROR_CATEGORY,
  CREATE_SUCCESS_CATEGORY,
  INotification,
  NotificationType,
} from '@/widgets/Notification/NotificationType'
import { Notification } from '@/widgets/Notification/Notification'
import { ModalCustom } from '@/widgets/ModalCustom/ModalCustom'
import { InputGeneral } from '@/shared/ui/formUser/Inputs'

export const AdminCreateCategory = () => {
  const [openModal, setModalOpen] = useState(false)
  const [notification, setNotification] = useState<INotification | null>(null)
  const [createCategory, { isSuccess, isError }] = usePostCategoryMutation()
  const { register, handleSubmit } = useForm<CategoryType>()

  useEffect(() => {
    if (isSuccess) setNotification({ types: NotificationType.SUCCESS, message: CREATE_SUCCESS_CATEGORY })
    if (isError) setNotification({ types: NotificationType.ERROR, message: CREATE_ERROR_CATEGORY })
  }, [isSuccess, isError])

  const handleCreateCategory: SubmitHandler<CategoryType> = async (data) => {
    setModalOpen(false)
    await createCategory(data)
  }

  return (
    <>
      <button className={classes.tableButton} onClick={() => setModalOpen(true)}>
        <FileAddOutlined />
      </button>

      <ModalCustom open={openModal} onCancel={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit(handleCreateCategory)} className="form">
          <InputGeneral name="name" register={register} placeholder="Укажите имя" />
          <InputGeneral name="image" register={register} placeholder="Укажите ссылку на картинку" />
          <button className="buttonForm">Создать</button>
        </form>
      </ModalCustom>

      {notification && <Notification types={notification.types} message={notification.message} />}
    </>
  )
}

//https://avatars.mds.yandex.net/i?id=9feb996bf910b500a2da7acbcb7bb4a3_l-8474988-images-thumbs&n=13
