import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  usePostUserMutation,
  useAuthUserMutation,
  useGetProfileQuery,
} from '../../shared/services/api/endpoints/users/users'
import { FormUser } from '../../shared/ui/formUser/formUser'
import { Route } from '../../app/router/route'
import { UserSingUpType } from '../../shared/services/api/endpoints/users/usersDTO'
import { InputValid } from '../../shared/ui/formUser/InputValid'
import {
  AUTH_ERROR_MESSAGE,
  INotification,
  NotificationType,
  REGISTER_ERROR_MESSAGE,
  REGISTER_LOADING_MESSAGE,
  REGISTER_SUCCESS_MESSAGE,
} from '../../widgets/Notification/NotificationType'
import { Notification } from '../../widgets/Notification/Notification'

const SignUp = () => {
  const { register, handleSubmit } = useForm<UserSingUpType>({ mode: 'onBlur' })
  const [notification, setNotification] = useState<INotification | null>(null)
  const [disabled, setDisabled] = useState(false)

  const [registerUser, { isLoading: registerLoading }] = usePostUserMutation()
  const [authUser, { isSuccess: authSuccess, data: authData }] = useAuthUserMutation()
  const { isSuccess: profileSuccess } = useGetProfileQuery(authData?.access_token || '', { skip: !authSuccess })

  const navigate = useNavigate()

  useEffect(() => {
    if (registerLoading) {
      setNotification({ types: NotificationType.INFO, message: REGISTER_LOADING_MESSAGE })
    }
    if (profileSuccess) {
      setNotification({ types: NotificationType.SUCCESS, message: REGISTER_SUCCESS_MESSAGE })
      setDisabled(false)
      navigate('/')
    }
  }, [profileSuccess, navigate, registerLoading])

  const submitHandle = async (data: UserSingUpType) => {
    const avatar =
      data.avatar ||
      'https://vkplay.ru/pre_0x736_resize/hotbox/content_files/Stories/2023/06/06/a3c17a993fd846f98ee8e0a28c762073.jpg?quality=85'
    try {
      setDisabled(true)
      const registerResult = await registerUser({ ...data, role: 'customer', avatar: avatar })
      if (registerResult.data) {
        try {
          const authResult = await authUser({ email: data.email, password: data.password })
          if (authResult.data) localStorage.setItem('token', authResult.data.access_token)
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
        <InputValid register={register} label="Имя" placeholder="Имя" name="name" />
        <InputValid register={register} label="Аватарка" placeholder="Ссылка на картинку" name="avatar" />
        <InputValid register={register} label="Почта" placeholder="Укажите емайл..." name="email" />
        <InputValid register={register} label="Пароль" placeholder="Введите пароль..." name="password" />
        <button className="button buttonUser" disabled={disabled}>
          Sign-Up
        </button>
      </form>
      {notification && <Notification types={notification.types} message={notification.message} />}
    </FormUser>
  )
}

export default SignUp
