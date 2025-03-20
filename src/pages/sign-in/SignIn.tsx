import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useAuthUserMutation, useGetProfileQuery } from '../../shared/services/api/endpoints/users/users'
import { UserSingInType } from '../../shared/services/api/endpoints/users/usersDTO'
import { FormUser } from '../../shared/ui/formUser/formUser'
import { Route } from '../../app/router/route'
import { InputValid } from '../../shared/ui/formUser/InputValid'

const SingIn = () => {
  const { register, handleSubmit } = useForm<UserSingInType>({ mode: 'onBlur' })
  const [authUser, { isSuccess: authSuccess, data: authData }] = useAuthUserMutation()
  const { data: profileData, isSuccess: profileSuccess } = useGetProfileQuery(authData?.access_token || '', {
    skip: !authSuccess,
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (profileData) {
      localStorage.setItem('role', profileData.role)
      localStorage.setItem('name', profileData.name)
    }
    if (profileSuccess) navigate('/')
  }, [profileData, navigate, profileSuccess])

  const submitHandle = async (data: UserSingInType) => {
    try {
      const response = await authUser(data)
      if (response.data) await localStorage.setItem('token', response.data.access_token)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <FormUser title="Авторизация" text="Don’t have an account?" slug={Route.SignUp} slugText="Sign Up.">
      <form className="formUser" onSubmit={handleSubmit(submitHandle)}>
        <InputValid register={register} label="Почта" placeholder="Укажите емайл..." name="email" />
        <InputValid register={register} label="Пароль" placeholder="Введите пароль..." name="password" />
        <button className="button buttonUser">Войти</button>
      </form>
    </FormUser>
  )
}

export default SingIn
