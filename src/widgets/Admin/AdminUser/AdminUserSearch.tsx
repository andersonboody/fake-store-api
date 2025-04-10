import { SearchOutlined } from '@ant-design/icons'
import { memo, useState } from 'react'
import { useForm } from 'react-hook-form'

import classes from './AdminUser.module.scss'
import { ModalCustom } from '@/widgets/ModalCustom/ModalCustom'
import { InputGeneral } from '@/shared/ui/formUser/Inputs'
import { useLazyGetUserIdQuery } from '@/shared/services/api/endpoints/users/users'
import { UserSingUpType } from '@/shared/services/api/endpoints/users/usersDTO'

export const AdminUserSearch = memo(() => {
  const [openSearchModal, setOpenSearchModal] = useState(false)
  const [searchUser] = useLazyGetUserIdQuery()
  const { register, handleSubmit, reset } = useForm<UserSingUpType>({ mode: 'onBlur' })

  const closeSearchUser = () => {
    setOpenSearchModal(false)
    reset()
  }

  const handleSearchUser = async (data: UserSingUpType) => {
    if (!data) return

    searchUser(Number(data.id))
    setOpenSearchModal(false)
  }

  return (
    <>
      <button className={classes.tableButton} onClick={() => setOpenSearchModal(true)}>
        <SearchOutlined />
      </button>

      <ModalCustom open={openSearchModal} onCancel={closeSearchUser}>
        <form className="form" onSubmit={handleSubmit(handleSearchUser)}>
          <InputGeneral register={register} name="id" placeholder="Укажите id пользователя" />
          <button className="buttonForm">Найти</button>
        </form>
      </ModalCustom>
    </>
  )
})
