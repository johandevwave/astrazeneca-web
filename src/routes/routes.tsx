import { lazy } from 'react'

export type RouteMember = keyof typeof ROUTES

export interface RouteData {
  /**
   * Unique identifier for the route. Is auto-generated from the key of the ROUTES
   */
  id: RouteMember
  /**
   * Text to show in the navigation
   */
  displayName: string
  /**
   * Url path for the route. If not present, the key of the ROUTES will be used
   */
  path: string
  /**
   * Component to render for route
   */
  component: React.LazyExoticComponent<(props: any) => JSX.Element>
  /**
   * Props to pass to the component
   */
  componentProps?: any
  /**
   * Set to true if all users should access the route
   */
  public?: boolean
}

const ROUTES = {
  start: {
    displayName: 'Search',
    path: '/',
    component: lazy(() => import('../Search')),
    public: true,
  },
  detail: {
    displayName: 'SearchDetail',
    path: '/result/:id',
    component: lazy(() => import('../SearchDetail')),
    public: true,
  },
  error: {
    displayName: '',
    path: '*',
    component: lazy(() => import('../NotFound')),
    public: true,
  },
}

export const getRoutes = (): RouteData[] => {
  const routeEntries = Object.entries(ROUTES)

  return routeEntries.map(([key, routeData]: [string, Partial<any>]) => ({
    ...routeData,
    id: routeData.id || key,
  })) as RouteData[]
}

export const getRouteData = (id: RouteMember): RouteData =>
  getRoutes().find((route) => route.id === id) as RouteData
