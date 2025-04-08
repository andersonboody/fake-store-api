import { useForm } from 'react-hook-form'
import { useState } from 'react'

import classes from './Order.module.scss'
import { Logo } from '@/shared/ui/logo/logo'
import { useBaskets } from '@/shared/hooks/useBaskets'
import { useGetProfileQuery } from '@services/api/endpoints/users/users'
import Loading from '@/shared/ui/spin/Spin'
import { InputUserName, InputEmail, InputGeneral, InputPhone } from '@/shared/ui/formUser/Inputs'
import { getAccessToken } from '@/shared/lib/getAccessToken'
import { Maps } from '@/widgets/Maps/Maps'

interface IData {
  firstName: string
  lastName: string
  email: string
  phone: string
}

const Order = () => {
  const { products, totalPrice } = useBaskets()
  const { data, isFetching } = useGetProfileQuery(getAccessToken())
  const [shop, setShop] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IData>({ mode: 'onBlur' })

  const submitHandle = (data: IData) => {
    console.log(data)
  }

  const getShop = (name: string) => {
    setShop(name)
  }

  return (
    <section className={classes.order}>
      <header className={classes.orderHeader}>
        <Logo />
      </header>

      <main className={classes.orderMain}>
        <form onSubmit={handleSubmit(submitHandle)}>
          <div className={classes.orderDetails}>
            <p className={classes.orderTitle}>Ваши данные:</p>
            {isFetching && (
              <div className={classes.orderDetailsLOading}>
                <Loading />
              </div>
            )}
            {data && (
              <div className={classes.orderDetailsInputs}>
                <InputUserName register={register} errors={errors} defaultValue={data.name} label="Имя" />
                <InputGeneral label="Фамилия" register={register} name="lastName" placeholder="Напишите фамилию..." />
                <InputEmail register={register} errors={errors} defaultValue={data.email} label="Емайл" />
                <InputPhone register={register} />
              </div>
            )}
          </div>

          <div className={classes.orderDecoration}>
            <p className={classes.orderTitle}>Список товаров:</p>
            <ul className={classes.orderDecorationList}>
              {products &&
                products.map((product) => (
                  <li key={product.id} className={classes.orderDecorationItem}>
                    <span>{`${product.title} × ${product.quantity}`}</span>
                    <span>{`${product.price * product.quantity} $`}</span>
                  </li>
                ))}
              <p className={classes.orderDecorationPriceAll}>Итого: {totalPrice}$</p>
            </ul>

            <p className={classes.orderTitle}>
              {shop ? `Получить в ${shop}` : 'Выберите магазин для получения заказа'}
            </p>
            <button className="button">Заказать</button>
          </div>
        </form>
        <div className={classes.orderMaps}>
          <Maps getShop={getShop} />
        </div>
      </main>
    </section>
  )
}

export default Order
