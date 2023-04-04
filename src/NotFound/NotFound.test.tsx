import {
  screen,
  renderWithProviders,
} from '../Infrastructure/Testing/test-utilities'
import NotFound from '.'

describe('<NotFound />', () => {
  it('should render correctly', () => {
    renderWithProviders(<NotFound />)
    expect(screen.getByText('404')).toBeInTheDocument()
  })
})
