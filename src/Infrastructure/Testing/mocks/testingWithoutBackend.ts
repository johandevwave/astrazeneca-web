import { setupWorker } from 'msw'
import { handlers } from './handlers'

const enableTestingWithoutBackend = () => {
  if (process.env.NODE_ENV === 'development') {
    const worker = setupWorker(...handlers)
    worker.start()
  }
}
export { enableTestingWithoutBackend }
