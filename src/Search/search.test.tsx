import {
  screen,
  renderWithProviders,
  waitFor,
} from '../Infrastructure/Testing/test-utilities'

import { useDebounce } from '../Utilities/useDebounce'
import { useSearchQuery } from './search.service'
import Search from './'

jest.mock('./search.service')
jest.mock('../Utilities/useDebounce')

describe('<Search />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders search bar', async () => {
    ;(useDebounce as jest.Mock).mockReturnValue('some debounced query')

    const mockedData = {
      id: 123,
      name: 'Mocked Show',
      summary: 'This is a mocked show',
      image: {
        medium: 'https://example.com/medium.png',
        original: 'https://example.com/original.png',
      },
      genres: ['Comedy', 'Drama'],
    }
    const mockedUseSearchQuery = useSearchQuery as jest.MockedFunction<
      typeof useSearchQuery
    >

    ;(mockedUseSearchQuery as jest.Mock).mockReturnValue({
      data: [mockedData],
      isSuccess: true,
      isFetching: false,
    })
    renderWithProviders(<Search />)

    const searchInput = screen.getByTestId('default-search')
    expect(searchInput).toBeInTheDocument()
  })
  it('does not render search result when query is empty', () => {
    ;(useDebounce as jest.Mock).mockReturnValue('')

    const mockedUseSearchQuery = useSearchQuery as jest.MockedFunction<
      typeof useSearchQuery
    >
    ;(mockedUseSearchQuery as jest.Mock).mockReturnValue({
      data: [],
      isSuccess: true,
      isFetching: false,
    })
    renderWithProviders(<Search />)
  })
  expect(screen.queryByRole('list')).toBeNull()
})
