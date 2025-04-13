import { memo, useState } from 'react'
import { FileAddOutlined } from '@ant-design/icons'
import { SubmitHandler, useForm } from 'react-hook-form'

import classes from '../AdminTable.module.scss'
import { usePostProductMutation } from '@/shared/services/api/endpoints/products/products'
import { ModalCustom } from '@/widgets/ModalCustom/ModalCustom'
import { InputGeneral } from '@/shared/ui/formUser/Inputs'
import { InputCategories } from '@/shared/ui/formUser/Inputs/InputCategories'
import { NewProductType } from '@/shared/services/api/endpoints/products/productsDTO'
import {
  CREATE_ERROR_PRODUCT,
  CREATE_SUCCESS_PRODUCT,
  INotification,
  NotificationType,
} from '@/widgets/Notification/NotificationType'
import { Notification } from '@/widgets/Notification/Notification'

export const AdminCreateProduct = memo(() => {
  const [openModal, setOpenModal] = useState(false)
  const [createProduct] = usePostProductMutation()
  const [notification, setNotification] = useState<INotification | null>(null)
  const { handleSubmit, register } = useForm<NewProductType>()

  const handleCreateProduct: SubmitHandler<NewProductType> = async (data) => {
    const newData = {
      ...data,
      price: Number(data.price),
      images: [data.images],
      categoryId: Number(data.categoryId),
    }
    setOpenModal(false)

    try {
      await createProduct(newData)
      setNotification({ types: NotificationType.SUCCESS, message: CREATE_SUCCESS_PRODUCT })
    } catch {
      setNotification({ types: NotificationType.SUCCESS, message: CREATE_ERROR_PRODUCT })
    }
  }
  return (
    <>
      <button className={classes.tableButton} onClick={() => setOpenModal(true)}>
        <FileAddOutlined />
      </button>

      {notification && <Notification types={notification.types} message={notification.message} />}

      <ModalCustom open={openModal} onCancel={() => setOpenModal(false)}>
        <form onSubmit={handleSubmit(handleCreateProduct)} className="form">
          <InputGeneral name="title" register={register} placeholder="Введите название" />
          <InputGeneral name="price" register={register} placeholder="Укажите цену" />
          <InputGeneral name="description" register={register} placeholder="Напишите описание товара" />
          <InputCategories name="categoryId" register={register} />
          <InputGeneral name="images" register={register} placeholder="Укажите ссылку на картинку" />
          <button className="buttonForm">Создать</button>
        </form>
      </ModalCustom>
    </>
  )
})
