import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import axios from 'axios'


const AddSectorDropdown = ({ setFormFields }) => {

  const [sectors, setSectors] = useState({
    selectOptions: [],
    value: []
  })


  useEffect(() => {
    const getSectors = async () => {
      const { data } = await axios.get('/api/sectors/')
      const options = data.map(sector => ({
        "value": sector.id,
        "label": sector.name
      }))
      setSectors(sectorsCurrent => {
        return { ...sectorsCurrent, selectOptions: options }
      })
    }
    getSectors()
  }, [])

  const handleChange = (e) => {
    console.log('Data->', e)
    setFormFields(formFieldsCurrent => {
      return { ...formFieldsCurrent, sectors: e }
    })
  }
  return (
    <div>
      <Select options={sectors.selectOptions} onChange={handleChange} isMulti />
      {
        sectors.value === null ? "" : sectors.value.map(v => <h4>{v.label}</h4>)
      }
    </div>
  )
}


export default AddSectorDropdown