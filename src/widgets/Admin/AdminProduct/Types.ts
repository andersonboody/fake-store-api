import { ProductType } from '@/shared/services/api/endpoints/products/productsDTO'

export type AdminProductsType = {
  products: ProductType[]
}

export type AdminProductType = {
  product: ProductType
}
