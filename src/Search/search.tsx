import { useState } from 'react'
import SearchBar from '../SearchBar'
import SearchResult from '../SearchResult'
import { useDebounce } from '../Utilities/useDebounce'
import { useSearchQuery } from './search.service'

const Search: React.FunctionComponent = () => {
  const [query, setQuery] = useState('')
  const debouncedSearchTerm: string = useDebounce<string>(query, 200)

  const { data, isSuccess, isFetching } = useSearchQuery(debouncedSearchTerm, {
    skip: query === '',
  })

  return (
    <div>
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto mt-10">
          <h2 className="text-center mb-5 text-3xl font-bold">Search for movies and shows</h2>
          <SearchBar query={query} setQuery={setQuery} />
        </div>
        {query !== '' && isSuccess && (
          <SearchResult
            isSuccess={isSuccess}
            data={data}
            isLoading={isFetching}
          />
        )}
      </div>
    </div>
  )
}

export default Search
