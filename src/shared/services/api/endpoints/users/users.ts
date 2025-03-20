import { api } from '../../api'
import { UserProfileType, UserSingInType, UserSingUpType } from './usersDTO'

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    authUser: build.mutation<{ access_token: string }, UserSingInType>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    postUser: build.mutation<UserSingUpType, UserSingUpType>({
      query: (userData) => ({
        url: 'users',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    getProfile: build.query<UserProfileType, string>({
      query: (jvt) => ({
        url: 'auth/profile',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jvt}`,
        },
      }),
      providesTags: ['User'],
    }),
  }),
})

export const { useAuthUserMutation, usePostUserMutation, useGetProfileQuery } = usersApi
