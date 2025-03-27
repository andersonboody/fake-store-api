import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { Header } from '../../widgets/Header/Header'
import Basket from '../../widgets/Basket/Basket'
import useLocalStorage from '../../shared/hooks/useLocalStorage'
import Favorites from '../../widgets/Favorites/Favorites'
import { useFavorites } from '../../shared/hooks/useFavorites'
import { DefaultMainContent } from './DefaultMainContent/DefaultMainContent'
import FilterMainContent from './FilterMainContent/FilterMainContent'

export const Main = () => {
  const [basketOpen, setBasketOpen] = useState(false)
  const [favoriteOpen, setFavoriteOpen] = useState(false)
  const { products, addLocalStorage, deleteProductLocalStorage, clearLocalStorage, totalPrice } = useLocalStorage()
  const { favorites, manageFavorite } = useFavorites()
  const { slug } = useParams()

  return (
    <>
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
      {favoriteOpen && (
        <Favorites onClose={() => setFavoriteOpen(false)} favorites={favorites} manageFavorite={manageFavorite} />
      )}

      <Header basket={() => setBasketOpen(true)} favorite={() => setFavoriteOpen(true)} />
      {slug ? (
        <FilterMainContent
          categorySlug={slug}
          productsLocal={products}
          addLocalStorage={addLocalStorage}
          favorites={favorites}
          manageFavorite={manageFavorite}
        />
      ) : (
        <DefaultMainContent
          productsLocal={products}
          addLocalStorage={addLocalStorage}
          favorites={favorites}
          manageFavorite={manageFavorite}
        />
      )}
    </>
  )
}
