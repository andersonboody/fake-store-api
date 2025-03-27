import { FavoriteProductType } from '../../shared/hooks/useFavorites'

export interface IFavorites {
  onClose: () => void
  favorites: FavoriteProductType[]
  manageFavorite: (product: FavoriteProductType) => void
}
