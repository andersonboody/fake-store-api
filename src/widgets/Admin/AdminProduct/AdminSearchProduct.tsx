import { SearchOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import classes from '../AdminTable.module.scss'
import { ModalCustom } from '@/widgets/ModalCustom/ModalCustom'
import { InputGeneral } from '@/shared/ui/formUser/Inputs'
import { AdminProductsType } from './Types'

type FromType = {
  title: string
}

export const AdminSearchProduct = ({ search, onSearch }: Partial<AdminProductsType>) => {
  const [openModal, setModalOpen] = useState(false)
  const { register, handleSubmit, reset } = useForm<FromType>()

  const handleSearch: SubmitHandler<FromType> = async (data) => {
    if (!data || !search || !onSearch) return
    await search(data)
    reset()
    onSearch(true)
    setModalOpen(false)
  }

  return (
    <>
      <button className={classes.tableButton} onClick={() => setModalOpen(true)}>
        <SearchOutlined />
      </button>

      <ModalCustom open={openModal} onCancel={() => setModalOpen(false)}>
        <form className="form" onSubmit={handleSubmit(handleSearch)}>
          <InputGeneral register={register} name="title" placeholder="Введите название товара" />
          <button className="buttonForm">Найти</button>
        </form>
      </ModalCustom>
    </>
  )
}
