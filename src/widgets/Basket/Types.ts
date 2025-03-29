import { LocalProductType } from '../../shared/hooks/useBaskets'

export interface IBasket {
  onClose: () => void
  products: LocalProductType[]
  deleteProductBaskets: (id: number) => void
  addBaskets: (product: LocalProductType) => void
  clearBaskets: () => void
  totalPrice: number
}
