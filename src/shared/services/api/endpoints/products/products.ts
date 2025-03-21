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
      serializeQueryArgs: ({ endpointName }) => {
        return `${endpointName}`
      },
      merge: (existing, incoming) => {
        existing.push(...incoming)
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
    }),
  }),
})

export const { useGetProductsQuery } = productsApi
