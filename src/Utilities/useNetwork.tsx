import { useEffect, useState } from 'react'

const useNetwork = () => {
  const [isOnline, setNetwork] = useState(window.navigator.onLine)
  const [isSlow, setSlow] = useState(false)

  const updateNetwork = () => {
    setNetwork(window.navigator.onLine)
    
  }

  const measureConnectionSpeed = () => {
    const img = new Image()
    const startTime = new Date().getTime()

    img.onload = () => {
      const endTime = new Date().getTime()
      const duration = endTime - startTime
      const speed = 1 / (duration / 1000)
      
      setSlow(speed < 10)
      // clean up
      img.remove()
    }

    img.onerror = () => {
      setSlow(true)
      // clean up
      img.remove()
    }

    // create a unique URL for the image
    const url = `https://www.google.com/images/phd/px.gif?t=${new Date().getTime()}`
    img.src = url

    // append the image to the DOM
    document.body.appendChild(img)
  }

  useEffect(() => {
    window.addEventListener('offline', updateNetwork)

    window.addEventListener('online', updateNetwork)

    measureConnectionSpeed()

    return () => {
      window.removeEventListener('offline', updateNetwork)

      window.removeEventListener('online', updateNetwork)
    }
  })
  return { isOnline, isSlow }
}

export { useNetwork }
