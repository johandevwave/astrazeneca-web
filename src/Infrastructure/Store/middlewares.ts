import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware'

import { searchApi } from '../../Search/search.service'

export const getMiddlewares = (
  getDefaultMiddleware: CurriedGetDefaultMiddleware
) => getDefaultMiddleware().concat(searchApi.middleware)
