import {
  screen,
  renderWithProviders,
} from '../Infrastructure/Testing/test-utilities'
import Loading from '.'

describe('<Loading />', () => {
  it('should render correctly', () => {
    renderWithProviders(<Loading />)
    expect(screen.getByText('Laddar..')).toBeInTheDocument()
  })
})
