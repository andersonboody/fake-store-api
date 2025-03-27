import { FavoriteProductType } from '../../shared/hooks/useFavorites'
import { LocalProductType } from '../../shared/hooks/useLocalStorage'
import { ProductType } from '../../shared/services/api/endpoints/products/productsDTO'

export interface IProductListProps {
  productsLocal: LocalProductType[]
  addLocalStorage: (product: LocalProductType) => void
  favorites: FavoriteProductType[]
  manageFavorite: (favorites: FavoriteProductType) => void
}

export interface IProductSlugProps {
  product: ProductType[]
  productsLocal: LocalProductType[]
  addLocalStorage: (product: LocalProductType) => void
  favorites: FavoriteProductType[]
  manageFavorite: (favorites: FavoriteProductType) => void
}

export interface IProductProps {
  product: ProductType
  productsLocal?: LocalProductType[]
  addLocalStorage: () => void
  favorites: FavoriteProductType[]
  upFavorites: () => void
}
