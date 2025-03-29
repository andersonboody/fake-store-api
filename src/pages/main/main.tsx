import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { Header } from '../../widgets/Header/Header'
import useLocalStorage from '../../shared/hooks/useLocalStorage'
import { useFavorites } from '../../shared/hooks/useFavorites'
import { DefaultMainContent } from './DefaultMainContent/DefaultMainContent'
import { FilterMainContentLazy } from './FilterMainContent'
import { BasketLazy } from '../../widgets/Basket'
import { FavoritesLazy } from '../../widgets/Favorites'

export const Main = () => {
  const [basketOpen, setBasketOpen] = useState(false)
  const [favoriteOpen, setFavoriteOpen] = useState(false)
  const { products, addLocalStorage, deleteProductLocalStorage, clearLocalStorage, totalPrice } = useLocalStorage()
  const { favorites, manageFavorite } = useFavorites()
  const { slug } = useParams()

  return (
    <>
      {basketOpen && (
        <BasketLazy
          onClose={() => setBasketOpen(false)}
          products={products}
          deleteProductLocalStorage={deleteProductLocalStorage}
          addLocalStorage={addLocalStorage}
          clearLocalStorage={clearLocalStorage}
          totalPrice={totalPrice}
        />
      )}
      {favoriteOpen && (
        <FavoritesLazy onClose={() => setFavoriteOpen(false)} favorites={favorites} manageFavorite={manageFavorite} />
      )}

      <Header basket={() => setBasketOpen(true)} favorite={() => setFavoriteOpen(true)} />
      {slug ? (
        <FilterMainContentLazy
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
