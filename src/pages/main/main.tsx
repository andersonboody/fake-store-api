import { FC, useState } from 'react'

import classes from './main.module.scss'
import { CategoryMenu } from '../../widgets/CategoryMenu/CategoryMenu'
import { Header } from '../../widgets/Header/Header'
import { Banner } from '../../widgets/Banner/Banner'
import { ProductList } from '../../widgets/Products/ProductList/ProductList'
import Basket from '../../widgets/Basket/Basket'
import useLocalStorage from '../../shared/hooks/useLocalStorage'
import Favorites from '../../widgets/Favorites/Favorites'
import { useFavorites } from '../../shared/hooks/useFavorites'

export const Main: FC = () => {
  const [basketOpen, setBasketOpen] = useState(false)
  const [favoriteOpen, setFavoriteOpen] = useState(false)
  const { products, addLocalStorage, deleteProductLocalStorage, clearLocalStorage, totalPrice } = useLocalStorage()
  const { favorites, manageFavorite } = useFavorites()

  return (
    <>
      <Header basket={() => setBasketOpen(true)} favorite={() => setFavoriteOpen(true)} />
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
      {favoriteOpen && <Favorites onClose={() => setFavoriteOpen(false)} favorites={favorites} />}
      <div className={classes.categoryMenuAndBanner}>
        <CategoryMenu />
        <Banner />
      </div>
      <ProductList
        products={products}
        addLocalStorage={addLocalStorage}
        favorites={favorites}
        manageFavorite={manageFavorite}
      />
    </>
  )
}
