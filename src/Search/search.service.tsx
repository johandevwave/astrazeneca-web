import { createApi } from '@reduxjs/toolkit/query/react'
import { dynamicBaseQuery } from '../Infrastructure/Network/api'
import { Show, ShowResponse } from './search.type'

export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: (args, WebApi, extraOptions) =>
    dynamicBaseQuery(args, WebApi, {
      ...extraOptions,
      endpointBase: '',
    }),
  tagTypes: ['Search'],
  endpoints: (builder) => ({
    search: builder.query<ShowResponse[], string>({
      query: (arg) => {
        return {
          url: 'search/shows',
          params: { q: arg },
        }
      },
      providesTags: ['Search'],
    }),
    singleSearch: builder.query<Show, string>({
      query: (arg) => {
        return {
          url: `shows/${arg}`,
        }
      },
      providesTags: ['Search'],
    }),
  }),
})

export const { useSearchQuery, useSingleSearchQuery } = searchApi
