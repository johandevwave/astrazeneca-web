import { renderHook, waitFor } from '@testing-library/react'
import { errorHandlers } from '../Infrastructure/Testing/mocks/handlers'
import { renderApiServiceHook } from '../Infrastructure/Testing/test-utilities'
import { server } from '../setupTests'

import { searchApi } from './search.service'

const { useSearchQuery, useSingleSearchQuery } = searchApi

describe('searchApi', () => {
  it('should have status isLoading when searching', async () => {
    const { result } = renderHook(() => useSearchQuery('test'), {
      wrapper: ({ children }) => renderApiServiceHook(children),
    })
    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy()
    })
    expect(result.current.data?.length).toBe(1)
  })
  it('should fail get searched data', async () => {
    server.use(errorHandlers.getSearch)
    const { result } = renderHook(() => useSearchQuery('test'), {
      wrapper: ({ children }) => renderApiServiceHook(children),
    })
    await waitFor(() => {
      expect(result.current.isError).toBeTruthy()
    })
  })
  it('should have status isLoading when get single show', async () => {
    const { result } = renderHook(() => useSingleSearchQuery('23'), {
      wrapper: ({ children }) => renderApiServiceHook(children),
    })
    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy()
    })
    expect(result.current.data!.name).toBe('Show 1')
  })

  it('should fail get single show', async () => {
    server.use(errorHandlers.getSingleSearch)
    const { result } = renderHook(() => useSingleSearchQuery('23'), {
      wrapper: ({ children }) => renderApiServiceHook(children),
    })

    await waitFor(() => {
      expect(result.current.isError).toBeTruthy()
    })
  })
})
