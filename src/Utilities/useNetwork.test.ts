import { renderHook, waitFor } from '@testing-library/react'
import { useNetwork } from './useNetwork'

describe('useNetwork', () => {
  it('should return an initial online status', () => {
    const { result } = renderHook(() => useNetwork())

    expect(typeof result.current.isOnline).toBe('boolean')
  })
  it('should update the online status when going online', async () => {
    const { result } = renderHook(() => useNetwork())

    const dispatchEvent = jest.spyOn(window, 'dispatchEvent')

    expect(result.current.isOnline).toBe(true)

    window.dispatchEvent(new Event('offline'))

    await waitFor(() => expect(dispatchEvent).toHaveBeenCalled())
  })

  it('should remove event listeners when the component unmounts', () => {
    const { unmount } = renderHook(() => useNetwork())

    jest.spyOn(window, 'removeEventListener')

    expect(window.removeEventListener).toHaveBeenCalledTimes(0)

    unmount()

    expect(window.removeEventListener).toHaveBeenCalledTimes(2)
    expect(window.removeEventListener).toHaveBeenCalledWith(
      'offline',
      expect.any(Function)
    )
    expect(window.removeEventListener).toHaveBeenCalledWith(
      'online',
      expect.any(Function)
    )
  })

  it('returns the slow internet connection status', async () => {
    const { result } = renderHook(() => useNetwork())
    expect(result.current.isSlow).toBe(false)

    jest
      .spyOn(window, 'Image')
      .mockImplementation((width?: number, height?: number) => {
        const img = new Image(width, height)

        setTimeout(() => {
          if (img.onload) {
            img.onload(new Event('load'))
          } else {
            console.error('Image onload function not defined')
          }
        }, 1000)

        return img
      })

    expect(result.current.isSlow).toBe(false)
    jest.advanceTimersByTime(2000)
    setTimeout(() => {
      expect(result.current.isSlow).toBe(false)
    }, 2000)
  })
})
