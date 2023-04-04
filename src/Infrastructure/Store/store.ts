import { configureStore } from '@reduxjs/toolkit'
import { getMiddlewares } from './middlewares'

import rootReducer from './rootReducer'

const store = configureStore({
  reducer: rootReducer(),
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getMiddlewares,
})

export type AppDispatch = typeof store.dispatch
export type ReduxStore = typeof store

export default store
