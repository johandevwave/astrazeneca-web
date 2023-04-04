import {
  BaseQueryFn,
  fetchBaseQuery,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query'
import { FetchBaseQueryArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'

import configService from '../Config/config.service'

export const authBaseQuery = ({
  baseUrl,
  prepareHeaders,
  ...baseFetchOptions
}: FetchBaseQueryArgs = {}) => {
  return fetchBaseQuery({
    baseUrl: baseUrl ?? configService.config.REACT_APP_API_URL,
    prepareHeaders: (headers, api) => {
      const token = configService.config.access_token

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return prepareHeaders?.(headers, api) || headers
    },
    ...baseFetchOptions,
  })
}

export const dynamicBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, WebApi, extraOptions: { endpointBase?: string } = {}) => {
  const endpointBase = (extraOptions as any)?.endpointBase || ''
  const baseUrl = `${configService.config.REACT_APP_API_URL}/${endpointBase}`
  const rawBaseQuery = authBaseQuery({ baseUrl })
  return rawBaseQuery(args, WebApi, extraOptions)
}
