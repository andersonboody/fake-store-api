import { api } from '../../api'
import { LocationType } from './locationsDTO'

export const locationsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getLocations: build.query<LocationType[], void>({
      query: () => 'locations',
    }),
  }),
})

export const { useGetLocationsQuery } = locationsApi
