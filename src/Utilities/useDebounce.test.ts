import { renderHook } from '@testing-library/react'
import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
  it('returns the value immediately', () => {
    const value = 'test'
    const delay = 500
    const { result } = renderHook(() => useDebounce(value, delay))

    expect(result.current).toBe(value)
  })
})
