import { useParams } from 'react-router-dom'
import NotFound from '../NotFound'

import { useSingleSearchQuery } from '../Search/search.service'
import SearchDetailSection from '../SearchDetailSection'

const SearchDetail: React.FunctionComponent = () => {
  const { id } = useParams()

  const { data, isSuccess, isError } = useSingleSearchQuery(id as string)
  if (isSuccess) {
    return (
      <div>
        <a
          href="/"
          className="border hover:animate-pulse border-black fixed top-10 left-10 focus:ring-4 focus:outline-none  font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
            />
          </svg>

          <span className="sr-only">Icon description</span>
        </a>
        <div className="hero">
          <div className="container mx-auto py-10 grid gap-10 md:grid-cols-2 items-center">
            <div>
              <h1 className="md:text-5xl text-3xl font-black">{data.name} </h1>
              <p className="pt-5">
                {data.summary ? (
                  data.summary.replace(/(<([^>]+)>)/gi, '')
                ) : (
                  <i>Could not find a summary.</i>
                )}
              </p>
              <div className="mt-5 flex">
                {data.genres?.map((item, index) => (
                  <span
                    className="bg-black text-white font-bold flex mr-5 px-5 py-1"
                    key={index}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="lg:flex justify-center">
              <img
                className="lg:h-[30rem] max-w-lg md:w-96 w-full rounded-lg object-fill"
                src={
                  data.image ? data.image.original : '/no-image-icon-23485.png'
                }
                alt="for an tv show"
              />
            </div>
          </div>
        </div>
        <SearchDetailSection
          title="Overview information"
          sections={[
            {
              heading: 'Webiste',
              content: data.officialSite ? (
                <a className="border-b" href={`${data.officialSite}`}>
                  {data.officialSite}
                </a>
              ) : (
                ''
              ),
            },
            {
              heading: 'Language',
              content: data.language,
            },
            {
              heading: 'Rating',
              content: data.rating.average,
            },
            {
              heading: 'Premiered',
              content: data.premiered,
            },
            {
              heading: 'Average Runtime',
              content: data.averageRuntime,
            },
          ]}
        />
      </div>
    )
  }
  if (isError) {
    return <NotFound />
  }
  return null
}

export default SearchDetail
