import {
  screen,
  renderWithProviders,
  fireEvent,
} from '../Infrastructure/Testing/test-utilities'
import SearchBar from '.'

describe('<SearchBar />', () => {
  it('should render correctly', () => {
    renderWithProviders(<SearchBar query="test" setQuery={() => {}} />)

    expect(
      screen.getByPlaceholderText('Search for titles of movies')
    ).toBeInTheDocument()
  })

  it('should update query state on user input', () => {
    const setQueryMock = jest.fn()
    renderWithProviders(<SearchBar query="" setQuery={setQueryMock} />)
    const searchInput = screen.getByPlaceholderText(
      'Search for titles of movies'
    )
    const userInput = 'test query'
    fireEvent.change(searchInput, { target: { value: userInput } })
    expect(setQueryMock).toHaveBeenCalledWith(userInput)
  })
})
