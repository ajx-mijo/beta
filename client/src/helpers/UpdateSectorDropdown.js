
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import axios from 'axios'


const UpdateSectorDropdown = ({ setFormFields, defaultSectors }) => {

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
      {console.log('DefaultValues ->', defaultSectors)}
      {defaultSectors.length > 0 && <Select options={sectors.selectOptions} onChange={handleChange} isMulti defaultValue={defaultSectors} />}
      {
        sectors.value === null ? "" : sectors.value.map(v => <h4>{v.label}</h4>)
      }
    </div>
  )
}


export default UpdateSectorDropdown