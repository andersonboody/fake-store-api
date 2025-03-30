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

export type QueryParams = {
  limit?: number
  offset?: number
  price_min?: number
  price_max?: number
  categorySlug?: string
  title?: string
  slug?: string
}
