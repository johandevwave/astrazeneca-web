import {
  screen,
  renderWithProviders,
} from '../Infrastructure/Testing/test-utilities'
import NetworkCheck from '.'
import { useNetwork } from '../Utilities/useNetwork'

jest.mock('../Utilities/useNetwork')

describe('NetworkCheck', () => {
  it('should render when we don´t have internet', () => {
    ;(useNetwork as jest.Mock).mockReturnValue({ isOnline: true })
    const { container } = renderWithProviders(<NetworkCheck />)

    expect(container.firstChild).toBeNull()
  })
  it('should render an alert when offline', () => {
    ;(useNetwork as jest.Mock).mockReturnValue({ isOnline: false })

    renderWithProviders(<NetworkCheck />)

    expect(screen.getByText('Internet')).toBeInTheDocument()
  })
})
