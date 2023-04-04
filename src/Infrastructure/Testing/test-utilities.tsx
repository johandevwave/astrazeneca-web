import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'

import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../Store/rootReducer'
import { Provider } from 'react-redux'
import { PropsWithChildren } from 'react'
import { getMiddlewares } from '../Store/middlewares'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: any
  store?: any
  history?: any
}

const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: rootReducer(),
    middleware: getMiddlewares,
    preloadedState,
  })
}

const renderApiServiceHook = (children: React.ReactNode) => (
  <Provider store={createTestStore({})}>{children}</Provider>
)

const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    history = createMemoryHistory(),
    // Automatically create a store instance if no store was passed in
    store = createTestStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          {children}
        </Router>
      </Provider>
    )
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export * from '@testing-library/react'
export * from '@testing-library/user-event'

export { renderWithProviders, createTestStore, renderApiServiceHook }
