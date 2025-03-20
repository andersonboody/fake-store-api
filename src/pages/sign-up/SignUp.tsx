import { useForm } from 'react-hook-form'

import { usePostUserMutation } from '../../shared/services/api/endpoints/users/users'
import { FormUser } from '../../shared/ui/formUser/formUser'
import { Route } from '../../app/router/route'
import { UserSingUpType } from '../../shared/services/api/endpoints/users/usersDTO'
import { InputValid } from '../../shared/ui/formUser/InputValid'

const SignUp = () => {
  const { register, handleSubmit } = useForm<UserSingUpType>({ mode: 'onBlur' })

  const [registerUser] = usePostUserMutation()

  const submitHandle = async (data: UserSingUpType) => {
    const avatar =
      data.avatar ||
      'https://vkplay.ru/pre_0x736_resize/hotbox/content_files/Stories/2023/06/06/a3c17a993fd846f98ee8e0a28c762073.jpg?quality=85'
    try {
      await registerUser({ ...data, role: 'customer', avatar: avatar })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <FormUser title="Регистрация" text="Already have an account?" slug={Route.SignIn} slugText="Sign In.">
      <form className="formUser" onSubmit={handleSubmit(submitHandle)}>
        <InputValid register={register} label="Имя" placeholder="Имя" name="name" />
        <InputValid register={register} label="Аватарка" placeholder="Ссылка на картинку" name="avatar" />
        <InputValid register={register} label="Почта" placeholder="Укажите емайл..." name="email" />
        <InputValid register={register} label="Пароль" placeholder="Введите пароль..." name="password" />
        <button className="button buttonUser">Зарегистрироваться</button>
      </form>
    </FormUser>
  )
}

export default SignUp
