import { api } from '@services/api/api'
import { NewProductType, ProductType, QueryParams } from './productsDTO'

export const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProductsObserver: build.query<ProductType[], QueryParams>({
      query: (params) => ({
        url: 'products',
        params: { limit: params.limit, offset: params.offset },
      }),
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
      providesTags: ['Product'],
    }),
    getProducts: build.query<ProductType[], QueryParams>({
      query: (params) => ({
        url: 'products',
        params: { limit: params.limit, offset: params.offset },
      }),
      providesTags: ['Product'],
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
    getProductSlug: build.query<ProductType, QueryParams>({
      query: (params) => `products/slug/${params.slug}`,
      providesTags: ['Product'],
    }),
    postProduct: build.mutation<ProductType, NewProductType>({
      query: (product) => ({
        url: 'products',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Product'],
    }),
    putProduct: build.mutation<ProductType, NewProductType>({
      query: (product) => ({
        url: `products/${product.id}`,
        method: 'PUT',
        body: product,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: build.mutation<boolean, number>({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
})

export const {
  useGetProductsObserverQuery,
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useGetProductsToSlugQuery,
  useGetProductTitleQuery,
  useLazyGetProductTitleQuery,
  useGetProductSlugQuery,
  usePostProductMutation,
  usePutProductMutation,
  useDeleteProductMutation,
} = productsApi
