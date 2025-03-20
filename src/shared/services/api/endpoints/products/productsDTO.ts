import { CategoriesType } from '../categories/categoriesDTO'

export type ProductType = {
  id: number
  title: string
  slug: string
  price: number
  description: string
  category: CategoriesType
  images: string[]
  creationAt: string
  updatedAt: string
}
