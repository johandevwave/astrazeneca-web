import { Route, Routes } from 'react-router-dom'
import Layout from '../Layout'
import { useRoutes } from '../routes/useRoutes'
import { Suspense } from 'react'
import Loading from '../Loading'

function App() {
  const { routes } = useRoutes()
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          {routes.map(({ id, path, component: Component, componentProps }) => (
            <Route
              key={id}
              path={path}
              element={
                <Suspense fallback={<Loading />}>
                  {Component && <Component {...componentProps} />}
                </Suspense>
              }
            />
          ))}
        </Route>
      </Routes>
    </div>
  )
}

export default App
