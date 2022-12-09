import { useEffect, useState } from 'react'

const SearchFilter = ({ apps, setFilteredApps }) => {
  const [input, setInput] = useState({
    search: '',
    year: 'All'
  })

  useEffect(() => {
    const regex = new RegExp(input.search, 'i')
    const filteredArr = apps.filter((app) => {
      return (
        regex.test(app.name) &&
        (app.year === input.year || input.year === 'All')
      )
    })
    setFilteredApps(filteredArr)
  }, [input, apps, setFilteredApps])

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className="search-filter-input">
        <input
          onChange={handleChange}
          type="text"
          placeholder="Search app name"
          name="search"
          id="filter"
          value={input.search}
        />

        <select
          onChange={handleChange}
          name="countryCode"
          id="filter"
          className="dropdown"
          value={input.year}
        >
          <option value="All">Select app</option>
          <option value="1981">1981</option>
          <option value="2016">2016</option>
        </select>
      </div>
    </>
  )
}

export default SearchFilter
