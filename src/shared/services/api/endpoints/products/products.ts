import { api } from '../../api'
import { ProductType, QueryParams } from './productsDTO'

export const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<ProductType[], QueryParams>({
      query: (params) => ({
        url: 'products',
        params: { limit: params.limit, offset: params.offset },
      }),
      providesTags: ['Product'],
      serializeQueryArgs: ({ endpointName }) => {
        return `${endpointName}`
      },
      merge: (existing, incoming) => {
        const existingSet = new Set(existing.map((product) => product.id))
        const newIncoming = incoming.filter((product) => !existingSet.has(product.id))
        return [...existing, ...newIncoming]
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
    }),
    getProductsToSlug: build.query<ProductType[], QueryParams>({
      query: (params) => {
        const queryParams: QueryParams = {
          categorySlug: params.categorySlug,
        }
        if (params.price_min || (params.price_max && params.price_max !== 0)) {
          queryParams.price_min = params.price_min
          queryParams.price_max = params.price_max
        }

        return {
          url: 'products',
          params: queryParams,
        }
      },
      providesTags: ['Product'],
    }),
    getProductTitle: build.query<ProductType[], QueryParams>({
      query: (params) => ({
        url: 'products',
        method: 'GET',
        params: { title: params.title },
      }),
      providesTags: ['Product'],
    }),
  }),
})

export const { useGetProductsQuery, useGetProductsToSlugQuery, useGetProductTitleQuery } = productsApi
