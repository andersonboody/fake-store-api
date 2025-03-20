import { FC, useState } from 'react'

import classes from './main.module.scss'
import { CategoryMenu } from '../../widgets/CategoryMenu/CategoryMenu'
import { Header } from '../../widgets/Header/Header'
import { Banner } from '../../widgets/Banner/Banner'
import { ProductList } from '../../widgets/Products/ProductList/ProductList'
import Basket from '../../widgets/Basket/Basket'
import useLocalStorage from '../../shared/hooks/useLocalStorage'

export const Main: FC = () => {
  const [basketOpen, setBasketOpen] = useState(false)
  const { products, addLocalStorage, deleteProductLocalStorage, clearLocalStorage, totalPrice } = useLocalStorage()

  return (
    <>
      <Header basket={() => setBasketOpen(true)} />
      {basketOpen && (
        <Basket
          onClose={() => setBasketOpen(false)}
          products={products}
          deleteProductLocalStorage={deleteProductLocalStorage}
          addLocalStorage={addLocalStorage}
          clearLocalStorage={clearLocalStorage}
          totalPrice={totalPrice}
        />
      )}
      <div className={classes.categoryMenuAndBanner}>
        <CategoryMenu />
        <Banner />
      </div>
      <ProductList products={products} addLocalStorage={addLocalStorage} />{' '}
    </>
  )
}
