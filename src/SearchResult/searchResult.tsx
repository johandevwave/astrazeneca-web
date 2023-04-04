import { Link } from 'react-router-dom'
import Loading from '../Loading'
import { ShowResponse } from '../Search/search.type'

interface ISearchResult {
  data: ShowResponse[]
  isSuccess: boolean
  isLoading: boolean
}

const SearchResult: React.FunctionComponent<ISearchResult> = ({
  data,
  isSuccess,
  isLoading,
}) => {
  if (isLoading) {
    return <Loading />
  }
  if (!isLoading && isSuccess) {
    return (
      <div
        role={'list'}
        className="mt-10 grid md:grid-cols-3 lg:grid-cols-4 gap-5"
      >
        {isSuccess &&
          data.map((item, index) => (
            <div
              key={index}
              className="md:max-w-sm bg-white border relative border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <Link to={`/result/${item.show.id}`}>
                <img
                  className="rounded-t-lg w-full h-48 object-cover "
                  src={
                    item.show.image
                      ? item.show.image.medium
                      : '/no-image-icon-23485.png'
                  }
                  alt=""
                />
              </Link>

              <div className="p-5">
                <Link to={`/result/${item.show.id}`}>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {item.show.name}
                  </h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {item.show.summary ? (
                    item.show.summary
                      .replace(/(<([^>]+)>)/gi, '')
                      .substring(0, 100)
                  ) : (
                    <i>Could not find a summary.</i>
                  )}
                  ...
                </p>
                <Link
                  to={`/result/${item.show.id}`}
                  className=" block items-center py-3  font-medium text-center text-white bg-black hover:animate-pulse  focus:outline-none focus:ring-blue-300"
                >
                  Read more
                </Link>
              </div>
            </div>
          ))}
      </div>
    )
  }
  return null
}

export default SearchResult
