import { useState } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { DeleteOutlined, EditOutlined, UserAddOutlined } from '@ant-design/icons'
import { useForm } from 'react-hook-form'

import classes from './AdminUsers.module.scss'
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  usePostUserMutation,
  usePutProfileMutation,
} from '@/shared/services/api/endpoints/users/users'
import Loading from '@/shared/ui/spin/Spin'
import {
  DELETE_ERRORS_USER,
  DELETE_LOADING_USER,
  DELETE_SUCCESS_USER,
  EDIT_ROLE_ERROR_USER,
  EDIT_ROLE_LOADING_USER,
  EDIT_ROLE_SUCCESS_USER,
  INotification,
  NotificationType,
  REGISTER_ERROR_MESSAGE,
  REGISTER_LOADING_MESSAGE,
  REGISTER_SUCCESS_MESSAGE,
} from '@/widgets/Notification/NotificationType'
import { Notification } from '@/widgets/Notification/Notification'
import { UserSingUpType } from '@/shared/services/api/endpoints/users/usersDTO'
import { ModalCustom } from '@/widgets/ModalCustom/ModalCustom'
import { InputAvatar, InputEmail, InputPassword, InputRole, InputUserName } from '@/shared/ui/formUser/Inputs'

const AdminUsers = () => {
  const [notification, setNotification] = useState<INotification | null>(null)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserSingUpType | null>(null)
  const [openAddModal, setOpenAddModal] = useState(false)
  const { data, isFetching } = useGetUsersQuery()
  const [deleteUser] = useDeleteUserMutation()
  const [updateUser] = usePutProfileMutation()
  const [createUser] = usePostUserMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserSingUpType>({ mode: 'onBlur' })

  const handleDeleteUser = async (user: UserSingUpType) => {
    setNotification({ types: NotificationType.INFO, message: DELETE_LOADING_USER(user.name) })
    try {
      await deleteUser(user.id!).unwrap()
      setNotification({ types: NotificationType.SUCCESS, message: DELETE_SUCCESS_USER(user.name) })
    } catch (e) {
      console.error(e)
      setNotification({ types: NotificationType.ERROR, message: DELETE_ERRORS_USER(user.name) })
    }
  }

  const openEditUser = (user: UserSingUpType) => {
    setOpenEditModal(true)
    setSelectedUser(user)
    console.log(user)
  }

  const closeEditUser = () => {
    setOpenEditModal(false)
    setSelectedUser(null)
    reset()
  }

  const closeCreateUser = () => {
    setOpenAddModal(false)
    reset()
  }

  const handleEditUSer = async (data: { role: string }) => {
    if (!selectedUser) return

    const newUser = { ...selectedUser, role: data.role }
    setOpenEditModal(false)
    setNotification({ types: NotificationType.INFO, message: EDIT_ROLE_LOADING_USER(selectedUser.name) })
    try {
      await updateUser(newUser).unwrap()
      setNotification({
        types: NotificationType.SUCCESS,
        message: EDIT_ROLE_SUCCESS_USER(selectedUser.name, data.role),
      })
    } catch (e) {
      console.error(e)
      setNotification({ types: NotificationType.ERROR, message: EDIT_ROLE_ERROR_USER(selectedUser.name) })
    }
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
      {isFetching && <Loading />}
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table size="small">
          <TableHead className={classes.tableRow}>
            <TableRow>
              <TableCell className={classes.tableCell}>Id</TableCell>
              <TableCell className={classes.tableCell}>Name</TableCell>
              <TableCell className={classes.tableCell}>Email</TableCell>
              <TableCell className={classes.tableCell}>Role</TableCell>
              <TableCell className={classes.tableCellBtn}>
                <button className={classes.tableButton} onClick={() => setOpenAddModal(true)}>
                  <UserAddOutlined />
                </button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((user) => (
                <TableRow key={user.id} className={classes.tableRow}>
                  <TableCell className={classes.tableCell}>{user.id}</TableCell>
                  <TableCell className={classes.tableCell}>{user.name}</TableCell>
                  <TableCell className={classes.tableCell}>{user.email}</TableCell>
                  <TableCell className={classes.tableCell}>{user.role}</TableCell>
                  <TableCell className={classes.tableCellBtn}>
                    <button className={classes.tableButton} onClick={() => openEditUser(user)}>
                      <EditOutlined />
                    </button>
                  </TableCell>
                  <TableCell className={classes.tableCellBtn}>
                    <button className={classes.tableButton} onClick={() => handleDeleteUser(user)}>
                      <DeleteOutlined />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {notification && <Notification types={notification.types} message={notification.message} />}

      <ModalCustom open={openEditModal} onCancel={closeEditUser}>
        <form className="form" onSubmit={handleSubmit(handleEditUSer)}>
          <InputRole register={register} />
          <button className="buttonForm">Изменить</button>
        </form>
      </ModalCustom>

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
    </>
  )
}

export default AdminUsers
