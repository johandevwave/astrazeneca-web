import { getRouteData, getRoutes } from './routes'

export const useRoutes = () => {
  const routes = getRoutes().filter((route) => route.public)

  return {
    routes,
    getRouteData,
  }
}
