import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { DefaultMainContent } from './DefaultMainContent/DefaultMainContent'
import { FilterMainContentLazy } from './FilterMainContent'
import { useBaskets } from '@/shared/hooks/useBaskets'
import { useFavorites } from '@/shared/hooks/useFavorites'
import { Header } from '@/widgets/Header/Header'
import { BasketLazy } from '@/widgets/Basket'
import { FavoritesLazy } from '@/widgets/Favorites'

export const Main = () => {
  const [basketOpen, setBasketOpen] = useState(false)
  const [favoriteOpen, setFavoriteOpen] = useState(false)
  const { products, addBaskets, deleteProductBaskets, clearBaskets, totalPrice } = useBaskets()
  const { favorites, manageFavorite } = useFavorites()
  const { slug } = useParams()

  return (
    <>
      {basketOpen && (
        <BasketLazy
          onClose={() => setBasketOpen(false)}
          products={products}
          deleteProductBaskets={deleteProductBaskets}
          addBaskets={addBaskets}
          clearBaskets={clearBaskets}
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
          productsBasket={products}
          addBaskets={addBaskets}
          favorites={favorites}
          manageFavorite={manageFavorite}
        />
      ) : (
        <DefaultMainContent
          productsBasket={products}
          addBaskets={addBaskets}
          favorites={favorites}
          manageFavorite={manageFavorite}
        />
      )}
    </>
  )
}
