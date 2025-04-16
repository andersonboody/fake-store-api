import { useEffect, useState } from 'react'
import { FileAddOutlined } from '@ant-design/icons'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

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
import { InputDescription } from '@/shared/ui/formUser/Inputs/InputDescription'

export const AdminCreateProduct = () => {
  const [openModal, setOpenModal] = useState(false)
  const [createProduct, { isSuccess, isError }] = usePostProductMutation()
  const [notification, setNotification] = useState<INotification | null>(null)
  const { handleSubmit, register, reset, control } = useForm<NewProductType>({
    defaultValues: { images: [{ id: Date.now(), url: '' }] },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'images',
  })

  useEffect(() => {
    if (isSuccess) setNotification({ types: NotificationType.SUCCESS, message: CREATE_SUCCESS_PRODUCT })
    if (isError) setNotification({ types: NotificationType.SUCCESS, message: CREATE_ERROR_PRODUCT })
  }, [isError, isSuccess])

  const handleCreateProduct: SubmitHandler<NewProductType> = async (data) => {
    const imagesArray = data.images
      .map((obj) => {
        if (typeof obj !== 'string') return obj.url
      })
      .filter(Boolean) as string[]
    const newData = {
      ...data,
      price: Number(data.price),
      images: imagesArray,
      categoryId: Number(data.categoryId),
    }
    setOpenModal(false)
    reset()

    await createProduct(newData)
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
          <InputDescription name="description" register={register} />
          <InputCategories name="categoryId" register={register} />
          {fields.map((image, index) => (
            <div key={image.id}>
              <input
                type="text"
                className={classes.inputImage}
                placeholder="Введите ссылку на картинку"
                {...register(`images.${index}.url`)}
              />
              <button className={classes.buttonImage} onClick={() => append({ id: Date.now(), url: '' })} type="button">
                +
              </button>
              <button className={classes.buttonImage} onClick={() => remove(index)} type="button">
                -
              </button>
            </div>
          ))}
          <button className="buttonForm" type="submit">
            Создать
          </button>
        </form>
      </ModalCustom>
    </>
  )
}

// https://proza.ru/pics/2017/11/21/1657.jpg
