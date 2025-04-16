import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Route } from '@/app/router/route'
import { usePostUserMutation, useAuthUserMutation, useGetProfileQuery } from '@services/api/endpoints/users/users'
import { UserSingUpType } from '@services/api/endpoints/users/usersDTO'
import { FormUser } from '@/shared/ui/formUser/formUser'
import { InputEmail, InputPassword, InputUserName, InputRole, InputAvatar } from '@/shared/ui/formUser/Inputs'
import {
  AUTH_ERROR_MESSAGE,
  INotification,
  NotificationType,
  REGISTER_ERROR_MESSAGE,
  REGISTER_LOADING_MESSAGE,
  REGISTER_SUCCESS_MESSAGE,
} from '@/widgets/Notification/NotificationType'
import { Notification } from '@/widgets/Notification/Notification'

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSingUpType>({ mode: 'onBlur' })
  const [notification, setNotification] = useState<INotification | null>(null)
  const [disabled, setDisabled] = useState(true)

  const [registerUser, { isLoading: registerLoading, error: registerError }] = usePostUserMutation()
  const [authUser, { isSuccess: authSuccess, data: authData }] = useAuthUserMutation()
  const { isSuccess: profileSuccess, data: profileData } = useGetProfileQuery(authData?.access_token || '', {
    skip: !authSuccess,
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (registerLoading) {
      setNotification({ types: NotificationType.INFO, message: REGISTER_LOADING_MESSAGE })
    }

    if (registerError) {
      setNotification({ types: NotificationType.ERROR, message: REGISTER_ERROR_MESSAGE })
      setDisabled(false)
    }
    if (profileSuccess) {
      setNotification({ types: NotificationType.SUCCESS, message: REGISTER_SUCCESS_MESSAGE })
      setDisabled(false)
      localStorage.setItem(
        'userData',
        JSON.stringify({ name: profileData.name, avatar: profileData.avatar, role: profileData.role })
      )
      navigate('/')
    }
  }, [profileSuccess, navigate, registerLoading, profileData, registerError])

  const submitHandle = async (data: UserSingUpType) => {
    const avatar =
      data.avatar || 'https://avatars.mds.yandex.net/i?id=9feb996bf910b500a2da7acbcb7bb4a3_l-8474988-images-thumbs&n=13'
    try {
      setDisabled(true)
      const registerResult = await registerUser({ ...data, avatar: avatar })
      if (registerResult.data) {
        try {
          const authResult = await authUser({ email: data.email, password: data.password })
          if (authResult.data)
            localStorage.setItem(
              'token',
              JSON.stringify({ access: authResult.data.access_token, refresh: authResult.data.refresh_token })
            )
        } catch (authError) {
          console.log(authError)
          setNotification({ types: NotificationType.ERROR, message: AUTH_ERROR_MESSAGE })
          setDisabled(false)
        }
      }
    } catch (registerError) {
      console.log(registerError)
      setNotification({ types: NotificationType.ERROR, message: REGISTER_ERROR_MESSAGE })
      setDisabled(false)
    }
  }

  return (
    <FormUser title="Регистрация" text="Already have an account?" slug={Route.SignIn} slugText="Sign In.">
      <form className="formUser" onSubmit={handleSubmit(submitHandle)}>
        <InputUserName name="name" register={register} errors={errors} label="Имя" />
        <InputAvatar name="avatar" register={register} errors={errors} label="Фото" />
        <InputEmail name="email" register={register} errors={errors} label="Емаил" isValid={setDisabled} />
        <InputRole name="role" register={register} errors={errors} label="Роль" />
        <InputPassword name="password" register={register} errors={errors} label="Пароль" />

        <button className="button buttonUser" disabled={disabled}>
          Sign-Up
        </button>
      </form>

      {notification && <Notification types={notification.types} message={notification.message} />}
    </FormUser>
  )
}

export default SignUp
