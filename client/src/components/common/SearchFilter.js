import { useEffect, useState } from 'react'
import GetAllYears from '../../helpers/GetAllYears'

const SearchFilter = ({ apps, filteredApps, setFilteredApps }) => {
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

        {/* <select
          onChange={handleChange}
          name="version"
          id="filter"
          className="dropdown"
          value={input.version}
        >
          <GetAllYears />
        </select> */}
      </div>
    </>
  )
}

export default SearchFilter
