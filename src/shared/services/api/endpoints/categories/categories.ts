import { api } from '@services/api/api'
import { CategoriesType, CategoryType } from './categoriesDTO'

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
    postCategory: build.mutation<CategoriesType, CategoryType>({
      query: (params) => ({
        url: 'categories',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['Category'],
    }),
    putCategory: build.mutation<CategoriesType, CategoriesType>({
      query: (params) => ({
        url: `categories/${params.id}`,
        method: 'PUT',
        body: { name: params.name, image: params.image },
      }),
      invalidatesTags: ['Category'],
    }),
    deleteCategory: build.mutation<boolean, number>({
      query: (id) => ({
        url: `categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),
  }),
})

export const { useGetCategoryQuery, usePostCategoryMutation, usePutCategoryMutation, useDeleteCategoryMutation } =
  categoriesApi
