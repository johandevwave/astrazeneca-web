import {
  screen,
  renderWithProviders,
  fireEvent,
} from '../Infrastructure/Testing/test-utilities'
import SearchDetailSection from '.'

describe('<SearchDetailSection />', () => {
  const sections = [
    {
      heading: 'Heading 1',
      content: 'Content 1',
    },
    {
      heading: 'Heading 2',
      content: 'Content 2',
    },
  ]

  it('should render correctly', () => {
    renderWithProviders(
      <SearchDetailSection title="Mock Title" sections={sections} />
    )
    expect(screen.getByText('Mock Title')).toBeInTheDocument()
  })

  it('should render the section headings and content', () => {
    renderWithProviders(
      <SearchDetailSection title="Mock Title" sections={sections} />
    )

    expect(screen.getByText('Heading 1')).toBeInTheDocument()
    expect(screen.getByText('Content 1')).toBeInTheDocument()
    expect(screen.getByText('Heading 2')).toBeInTheDocument()
    expect(screen.getByText('Content 2')).toBeInTheDocument()
  })

  it('shuld render a default message when there is no content', () => {
    const emptySections = [
      {
        heading: 'Empty Heading',
        content: '',
      },
    ]
    renderWithProviders(
      <SearchDetailSection title="Mock Title" sections={emptySections} />
    )

    expect(
      screen.getByText('Sorry, there is no value here..')
    ).toBeInTheDocument()
  })
})
