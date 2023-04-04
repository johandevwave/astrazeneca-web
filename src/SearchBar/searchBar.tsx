interface ISearchBar {
  query: string
  setQuery: (query: string) => void
}

const SearchBar: React.FunctionComponent<ISearchBar> = ({
  query,
  setQuery,
}) => {
  return (
    <form>
      <input
        type="search"
        data-testid="default-search"
        id="default-search"
        className=" focus:outline-none outline-none block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
        placeholder="Search for titles of movies"
        required
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(e.currentTarget.value)
        }
      />
    </form>
  )
}

export default SearchBar
