import { getRouteData, getRoutes } from './routes'
describe('getRoutes', () => {
  it('should return all routes', () => {
    const routes = getRoutes()

    expect(routes.length).toBeGreaterThan(0)
  })

  it('should have id property', () => {
    const routes = getRoutes()

    expect(routes.every((route) => route.id)).toBeTruthy()
  })

  it('should have path property', () => {
    const routes = getRoutes()

    expect(routes.every((route) => route.path)).toBeTruthy()
  })
})

describe('getRouteData', () => {
  it('should return specified route', () => {
    const mockId = 'start'
    const routeData = getRouteData(mockId)

    expect(routeData.id).toBe(mockId)
  })
})
