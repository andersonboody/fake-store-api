import { useState } from 'react'
import { ProductType } from '../services/api/endpoints/products/productsDTO'

export type FavoriteProductType = Pick<ProductType, 'id' | 'title' | 'price'> & {
  image: string
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteProductType[]>(() => {
    const data = localStorage.getItem('favorite')
    return data ? JSON.parse(data) : []
  })

  const manageFavorite = (product: FavoriteProductType) => {
    const productAvailability = favorites.find((ware) => ware.id === product.id)

    if (productAvailability) {
      const newArray = favorites.filter((ware) => ware.id !== product.id)
      setFavorites(newArray)
    } else {
      setFavorites([...favorites, product])
    }
  }

  return { favorites, manageFavorite }
}
