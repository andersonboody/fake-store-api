import { api } from '@services/api/api'
import { LocationType } from './locationsDTO'

export const locationsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getLocations: build.query<LocationType[], void>({
      query: () => 'locations',
    }),
  }),
})

export const { useGetLocationsQuery } = locationsApi
