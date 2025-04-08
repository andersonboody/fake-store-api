import { api } from '@services/api/api'
import { CategoriesType } from './categoriesDTO'

const categoriesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCategory: build.query<CategoriesType[], { limit: number }>({
      query: (params = { limit: 5 }) => ({
        url: 'categories',
        params: {
          limit: params.limit,
        },
      }),
      providesTags: ['Category'],
    }),
  }),
})

export const { useGetCategoryQuery } = categoriesApi
