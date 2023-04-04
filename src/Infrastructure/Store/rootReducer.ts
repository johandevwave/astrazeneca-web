import { combineReducers } from '@reduxjs/toolkit'
import store from './store'
import { searchApi } from '../../Search/search.service'

const rootReducer = () =>
  combineReducers({
    [searchApi.reducerPath]: searchApi.reducer,
  })

export type RootState = ReturnType<typeof store.getState>

export default rootReducer
