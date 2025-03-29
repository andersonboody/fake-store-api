import { FavoriteProductType } from '../../shared/hooks/useFavorites'
import { LocalProductType } from '../../shared/hooks/useBaskets'
import { ProductType } from '../../shared/services/api/endpoints/products/productsDTO'

export interface IProductListProps {
  productsBasket: LocalProductType[]
  addBaskets: (product: LocalProductType) => void
  favorites: FavoriteProductType[]
  manageFavorite: (favorites: FavoriteProductType) => void
}

export interface IProductSlugProps {
  product: ProductType[]
  productsBasket: LocalProductType[]
  addBaskets: (product: LocalProductType) => void
  favorites: FavoriteProductType[]
  manageFavorite: (favorites: FavoriteProductType) => void
}

export interface IProductProps {
  product: ProductType
  productsBasket?: LocalProductType[]
  addBaskets: () => void
  favorites: FavoriteProductType[]
  upFavorites: () => void
}
