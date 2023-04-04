import {
  screen,
  renderWithProviders,
} from '../Infrastructure/Testing/test-utilities'
import SearchResult from '.'
import { ShowResponse } from '../Search/search.type'

export const mockData: ShowResponse[] = [
  {
    score: 1,
    show: {
      id: 1,
      url: 'http://www.example.com',
      name: 'Show 1',
      type: 'Scripted',
      language: 'English',
      genres: ['Comedy'],
      status: 'Running',
      runtime: 30,
      averageRuntime: 30,
      premiered: '2022-01-01',
      ended: '',
      officialSite: '',
      schedule: { time: '21:00', days: ['Wednesday'] },
      rating: { average: 8 },
      weight: 1,
      network: {
        id: 1,
        name: 'ABC',
        country: {
          name: 'United States',
          code: 'US',
          timezone: 'America/New_York',
        },
        officialSite: 'http://www.example.com',
      },
      webChannel: null,
      dvdCountry: null,
      externals: { tvrage: null, thetvdb: 1234, imdb: 'tt1234' },
      image: {
        medium: 'http://www.example.com/image.jpg',
        original: 'http://www.example.com/image.jpg',
      },
      summary: '<p>A summary of Show 1.</p>',
      updated: 1648826867,
      _links: {
        self: { href: 'http://www.example.com/show/1' },
        previousepisode: { href: 'http://www.example.com/episode/1' },
      },
    },
  },
]

describe('<SearchResult />', () => {
  it('should render correctly', () => {
    renderWithProviders(
      <SearchResult isLoading={false} data={mockData} isSuccess={true} />
    )
    expect(screen.getByText('Show 1')).toBeInTheDocument()
  })
  it('should have link that will go to result page', () => {
    renderWithProviders(
      <SearchResult isLoading={false} data={mockData} isSuccess={true} />
    )
    const readMoreLink = screen.getByText('Read more')
    expect(readMoreLink).toHaveAttribute('href', '/result/1')
  })

  it('should not render search results when isSuccess is false', () => {
    renderWithProviders(
      <SearchResult isLoading={false} data={mockData} isSuccess={false} />
    )
    const showName = screen.queryByText('Show 1')
    expect(showName).not.toBeInTheDocument()
  })

  it('should show Loading when isLoading is true', () => {
    renderWithProviders(
      <SearchResult isLoading={true} data={mockData} isSuccess={false} />
    )
    expect(screen.getByText('Laddar..')).toBeInTheDocument()
  })
})
