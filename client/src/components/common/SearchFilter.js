import { useEffect, useState } from 'react'
import GetAllSectors from '../../helpers/GetAllSectors'

const SearchFilter = ({ apps, filteredApps, setFilteredApps }) => {
  const [input, setInput] = useState({
    search: '',
    sectors: 'All'
  })

  useEffect(() => {
    const regex = new RegExp(input.search, 'i')
    const filteredArr = apps.filter((app) => {
      console.log('App sectors->', app.sectors.name)
      const { sectors } = app
      console.log('Sectors->', sectors)
      return (
        regex.test(app.name) &&
        (app.sectors.name === input.sectors || input.sectors === 'All')
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
          name="version"
          id="filter"
          className="dropdown"
          value={input.version}
        >
          <GetAllSectors />
          {/* <option value="All">Select version</option>
          <option value="v1.0">v1.0</option>
          <option value="v1.5">v1.5</option> */}
        </select>
      </div>
    </>
  )
}

export default SearchFilter
