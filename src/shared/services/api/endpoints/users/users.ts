import { api } from '@services/api/api'
import { EmailIsAvailable, UserSingInType, UserSingUpType } from './usersDTO'

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    authUser: build.mutation<{ access_token: string; refresh_token: string }, UserSingInType>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    getUsers: build.query<UserSingUpType[], void>({
      query: () => ({
        url: 'users',
        params: {
          limit: 1000,
        },
      }),
      providesTags: ['User'],
    }),
    postUser: build.mutation<UserSingUpType, UserSingUpType>({
      query: (userData) => ({
        url: 'users',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    getProfile: build.query<UserSingUpType, string>({
      query: (jvt) => ({
        url: 'auth/profile',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jvt}`,
        },
      }),
      providesTags: ['User'],
    }),
    putProfile: build.mutation<UserSingUpType, UserSingUpType>({
      query: (userData) => ({
        url: `users/${userData.id}`,
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: build.mutation<boolean, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    postIsAvailable: build.mutation<EmailIsAvailable, EmailIsAvailable>({
      query: (email) => ({
        url: 'users/is-available',
        method: 'POST',
        body: email,
      }),
    }),
  }),
})

export const {
  useAuthUserMutation,
  usePostUserMutation,
  useGetProfileQuery,
  usePostIsAvailableMutation,
  usePutProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
} = usersApi
