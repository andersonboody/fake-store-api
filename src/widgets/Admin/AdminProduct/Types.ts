import { ProductType, QueryParams } from '@/shared/services/api/endpoints/products/productsDTO'

export type AdminProductsType = {
  products: ProductType[]
  search: ({ title }: QueryParams) => void
  onSearch: React.Dispatch<React.SetStateAction<boolean>>
}

export type AdminProductType = {
  product: ProductType
}
