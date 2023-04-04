import {
  screen,
  renderWithProviders,
  waitFor,
} from '../Infrastructure/Testing/test-utilities'
import SearchDetail from '.'
import { useParams } from 'react-router-dom'
import { useSingleSearchQuery } from '../Search/search.service'

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}))

jest.mock('../Search/search.service', () => ({
  useSingleSearchQuery: jest.fn(),
}))

describe('<SearchDetail />', () => {
  const mockedParams = { id: '123' }

  beforeEach(() => {
    ;(useParams as jest.Mock).mockReturnValue(mockedParams)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render 404 page', () => {
    ;(useSingleSearchQuery as jest.Mock).mockReturnValue({
      isSuccess: false,
      isError: true,
    })

    renderWithProviders(<SearchDetail />)

    expect(screen.getByText('404')).toBeInTheDocument()
  })

  it('should render show details when data is loaded', async () => {
    const mockData = {
      name: 'Test Show',
      summary: '<p>A summary</p>',
      genres: ['Action', 'Adventure'],
      language: 'English',
      rating: { average: 7.5 },
      premiered: '2022-01-01',
      averageRuntime: 60,
      image: { original: 'http://example.com/image.jpg' },
      officialSite: 'http://example.com',
    }

    ;(useSingleSearchQuery as jest.Mock).mockReturnValue({
      isSuccess: true,
      isError: false,
      data: mockData,
    })

    renderWithProviders(<SearchDetail />)

    await waitFor(() => {
      expect(screen.getByText('Test Show')).toBeInTheDocument()
    })
    expect(screen.getByText('A summary')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()
    expect(screen.getByText('Adventure')).toBeInTheDocument()
    expect(screen.getByText('English')).toBeInTheDocument()
    expect(screen.getByText('7.5')).toBeInTheDocument()
    expect(screen.getByText('2022-01-01')).toBeInTheDocument()
    expect(screen.getByText('60')).toBeInTheDocument()
    expect(screen.getByAltText('for an tv show')).toHaveAttribute(
      'src',
      'http://example.com/image.jpg'
    )
  })
})
