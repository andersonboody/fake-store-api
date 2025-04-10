import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useAuthUserMutation, useGetProfileQuery } from '@services/api/endpoints/users/users'
import { UserSingInType } from '@services/api/endpoints/users/usersDTO'
import { FormUser } from '@/shared/ui/formUser/formUser'
import { Route } from '@/app/router/route'
import { InputGeneral } from '@/shared/ui/formUser/Inputs'
import { Notification } from '@/widgets/Notification/Notification'
import {
  AUTH_ERROR_MESSAGE,
  AUTH_LOADING_MESSAGE,
  AUTH_SUCCESS_MESSAGE,
  INotification,
  NotificationType,
} from '@/widgets/Notification/NotificationType'

const SingIn = () => {
  const { register, handleSubmit } = useForm<UserSingInType>({ mode: 'onBlur' })
  const [authUser, { isLoading: authLoading, isSuccess: authSuccess, data: authData, isError: authError }] =
    useAuthUserMutation()
  const { data: profileData, isSuccess: profileSuccess } = useGetProfileQuery(authData?.access_token || '', {
    skip: !authSuccess,
  })
  const [notification, setNotification] = useState<INotification | null>(null)
  const [disabled, setDisabled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (authError) {
      setNotification({ types: NotificationType.ERROR, message: AUTH_ERROR_MESSAGE })
      setDisabled(false)
    }
    if (authLoading)
      setNotification({
        types: NotificationType.INFO,
        message: AUTH_LOADING_MESSAGE,
      })
    if (profileData) {
      localStorage.setItem(
        'userData',
        JSON.stringify({ name: profileData.name, avatar: profileData.avatar, role: profileData.role })
      )
    }
    if (profileSuccess) {
      setNotification({ types: NotificationType.SUCCESS, message: AUTH_SUCCESS_MESSAGE })
      setDisabled(false)
      navigate('/')
    }
  }, [profileData, navigate, profileSuccess, authLoading, authError])

  const submitHandle = async (data: UserSingInType) => {
    setDisabled(true)
    const response = await authUser(data)
    if (response.data)
      await localStorage.setItem(
        'token',
        JSON.stringify({ access: response.data.access_token, refresh: response.data.refresh_token })
      )
  }

  return (
    <FormUser title="Авторизация" text="Don’t have an account?" slug={Route.SignUp} slugText="Sign Up.">
      <form className="formUser" onSubmit={handleSubmit(submitHandle)}>
        <InputGeneral register={register} label="Почта" placeholder="Укажите емайл..." name="email" />
        <InputGeneral register={register} label="Пароль" placeholder="Введите пароль..." name="password" />
        <button className="button buttonUser" disabled={disabled}>
          Sign-In
        </button>
      </form>
      {notification && <Notification types={notification.types} message={notification.message} />}
    </FormUser>
  )
}

export default SingIn
