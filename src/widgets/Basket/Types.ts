import { LocalProductType } from '../../shared/hooks/useLocalStorage'

export interface IBasket {
  onClose: () => void
  products: LocalProductType[]
  deleteProductLocalStorage: (id: number) => void
  addLocalStorage: (product: LocalProductType) => void
  clearLocalStorage: () => void
  totalPrice: number
}
