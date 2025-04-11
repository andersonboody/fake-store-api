import { SearchOutlined } from '@ant-design/icons'
import { memo, useState } from 'react'
import { useForm } from 'react-hook-form'

import classes from '../AdminTable.module.scss'
import { ModalCustom } from '@/widgets/ModalCustom/ModalCustom'
import { InputGeneral } from '@/shared/ui/formUser/Inputs'
import { UserSingUpType } from '@/shared/services/api/endpoints/users/usersDTO'
import { IAdminUser } from './TypesDTO'

export const AdminUserSearch = memo(({ searchUser }: Partial<IAdminUser>) => {
  const [openSearchModal, setOpenSearchModal] = useState(false)

  const { register, handleSubmit } = useForm<UserSingUpType>({ mode: 'onBlur' })

  const handleSearchUser = async (data: UserSingUpType) => {
    if (!data || !searchUser) return
    searchUser(Number(data.id))
    setOpenSearchModal(false)
  }

  return (
    <>
      <button className={classes.tableButton} onClick={() => setOpenSearchModal(true)}>
        <SearchOutlined />
      </button>

      <ModalCustom open={openSearchModal} onCancel={() => setOpenSearchModal(false)}>
        <form className="form" onSubmit={handleSubmit(handleSearchUser)}>
          <InputGeneral register={register} name="id" placeholder="Укажите id пользователя" />
          <button className="buttonForm">Найти</button>
        </form>
      </ModalCustom>
    </>
  )
})
