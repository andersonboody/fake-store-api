import { EditOutlined } from '@ant-design/icons'

import classes from '../AdminTable.module.scss'
import { usePutProductMutation } from '@/shared/services/api/endpoints/products/products'
import { ModalCustom } from '@/widgets/ModalCustom/ModalCustom'
import { AdminProductType } from './Types'
import { InputGeneral } from '@/shared/ui/formUser/Inputs'
import { useState } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { NewProductType } from '@/shared/services/api/endpoints/products/productsDTO'
import { InputDescription } from '@/shared/ui/formUser/Inputs/InputDescription'

export const AdminEditProduct = ({ product }: AdminProductType) => {
  const [openModal, setOpenModal] = useState(false)
  const [updateProduct] = usePutProductMutation()
  const { register, handleSubmit, control } = useForm<NewProductType>({
    defaultValues: {
      title: product.title,
      price: product.price,
      description: product.description,
      categoryId: product.category.id,
      images: product.images.map((image, index) => ({ id: index, url: image })),
    },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'images',
  })

  const handleUpdateProduct: SubmitHandler<NewProductType> = (data) => {
    const imagesArray = data.images
      .map((image) => {
        if (typeof image !== 'string') return image.url
      })
      .filter(Boolean) as string[]
    const newData = {
      ...data,
      id: product.id,
      price: Number(data.price),
      categoryId: Number(data.categoryId),
      images: imagesArray,
    }
    updateProduct(newData)
    setOpenModal(false)
  }

  return (
    <>
      <button className={classes.tableButton} onClick={() => setOpenModal(true)}>
        <EditOutlined />
      </button>

      <ModalCustom open={openModal} onCancel={() => setOpenModal(false)}>
        <form onSubmit={handleSubmit(handleUpdateProduct)} className="form">
          <InputGeneral name="title" register={register} />
          <InputGeneral name="price" register={register} />
          <InputDescription name="description" register={register} />
          <InputGeneral name="categoryId" register={register} />
          {fields.map((image, index) => (
            <div key={image.id}>
              <input type="text" className={classes.inputImage} {...register(`images.${index}.url`)} />
              <button className={classes.buttonImage} onClick={() => append({ id: Date.now(), url: '' })} type="button">
                +
              </button>
              <button className={classes.buttonImage} onClick={() => remove(index)} type="button">
                -
              </button>
            </div>
          ))}
          <button className="buttonForm">Изменить</button>
        </form>
      </ModalCustom>
    </>
  )
}
