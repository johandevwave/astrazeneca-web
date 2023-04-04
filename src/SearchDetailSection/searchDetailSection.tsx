interface ISearchDetailSection {
  title: string
  sections: { heading: string; content: string | React.ReactNode }[]
}

const SearchDetailSection: React.FunctionComponent<ISearchDetailSection> = ({
  title,
  sections,
}) => (
  <section className="md:mt-20">
    <div className="container mx-auto">
      <h2 className="text-3xl font-black md:text-center">{title}</h2>
      <div className="md:mt-10 mt-5 grid md:grid-cols-3 md:gap-10 gap-3">
        {sections.map((item, index) => (
          <div key={index} className="mt-2">
            <h3 className="text-2xl font-bold md:text-center">
              {item.heading}
            </h3>
            <p className="md:text-center text-lg break-words">
              {item.content ? item.content : 'Sorry, there is no value here..'}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default SearchDetailSection
