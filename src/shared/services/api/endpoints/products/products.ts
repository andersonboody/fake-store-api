import { api } from '../../api'
import { ProductType } from './productsDTO'

export const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<ProductType[], { limit: number; offset: number }>({
      query: (params = { limit: 9, offset: 0 }) => ({
        url: 'products',
        params: {
          limit: params.limit,
          offset: params.offset,
        },
      }),
      providesTags: ['Product'],
    }),
  }),
})

export const { useGetProductsQuery } = productsApi
