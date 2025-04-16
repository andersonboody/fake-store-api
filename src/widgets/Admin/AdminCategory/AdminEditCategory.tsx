import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { EditOutlined } from '@ant-design/icons'

import classes from '../AdminTable.module.scss'
import { IAdminCategory } from './Types'
import {
  EDIT_ERROR_CATEGORY,
  EDIT_SUCCESS_CATEGORY,
  INotification,
  NotificationType,
} from '@/widgets/Notification/NotificationType'
import { CategoriesType } from '@/shared/services/api/endpoints/categories/categoriesDTO'
import { usePutCategoryMutation } from '@/shared/services/api/endpoints/categories/categories'
import { ModalCustom } from '@/widgets/ModalCustom/ModalCustom'
import { InputGeneral } from '@/shared/ui/formUser/Inputs'
import { Notification } from '@/widgets/Notification/Notification'

export const AdminEditCategory = ({ category }: IAdminCategory) => {
  const [openModal, setModalOpen] = useState(false)
  const [notification, setNotification] = useState<INotification | null>(null)
  const [editCategory, { isSuccess, isError }] = usePutCategoryMutation()
  const { register, handleSubmit } = useForm<CategoriesType>()

  useEffect(() => {
    if (isSuccess) setNotification({ types: NotificationType.SUCCESS, message: EDIT_SUCCESS_CATEGORY })
    if (isError) setNotification({ types: NotificationType.ERROR, message: EDIT_ERROR_CATEGORY })
  }, [isSuccess, isError])

  const handleEditCategory: SubmitHandler<CategoriesType> = async (data) => {
    const newCategory = {
      ...category,
      name: data.name,
      image: data.image,
    }
    setModalOpen(false)
    await editCategory(newCategory)
  }

  return (
    <>
      <button className={classes.tableButton} onClick={() => setModalOpen(true)}>
        <EditOutlined />
      </button>

      <ModalCustom open={openModal} onCancel={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit(handleEditCategory)} className="form">
          <InputGeneral name="name" register={register} defaultValue={category.name} placeholder="название" />
          <InputGeneral name="image" register={register} defaultValue={category.image} placeholder="картинка" />
          <button className="buttonForm">Изменить</button>
        </form>
      </ModalCustom>

      {notification && <Notification types={notification.types} message={notification.message} />}
    </>
  )
}
