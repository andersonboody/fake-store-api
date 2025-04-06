import { api } from '../../api'
import { EmailIsAvailable, UserProfileType, UserSingInType, UserSingUpType } from './usersDTO'

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
    postIsAvailable: build.mutation<EmailIsAvailable, EmailIsAvailable>({
      query: (email) => ({
        url: 'users/is-available',
        method: 'POST',
        body: email,
      }),
    }),
    putProfile: build.mutation<UserProfileType, UserProfileType>({
      query: (userData) => ({
        url: `users/${userData.id}`,
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
  }),
})

export const {
  useAuthUserMutation,
  usePostUserMutation,
  useGetProfileQuery,
  usePostIsAvailableMutation,
  usePutProfileMutation,
} = usersApi
