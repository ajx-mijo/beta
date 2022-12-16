import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import axios from 'axios'


const AddToolDropdown = ({ setFormFields }) => {

  const [tools, setTools] = useState({
    selectOptions: [],
    value: []
  })


  useEffect(() => {
    const getTools = async () => {
      const { data } = await axios.get('/api/tools/')
      const options = data.map(tool => ({
        "value": tool.id,
        "label": tool.name
      }))
      setTools(toolsCurrent => {
        return { ...toolsCurrent, selectOptions: options }
      })
    }
    getTools()
  }, [])

  const handleChange = (e) => {
    console.log('Data->', e)
    setFormFields(formFieldsCurrent => {
      return { ...formFieldsCurrent, tools: e }
    })
  }
  return (
    <div>
      <Select options={tools.selectOptions} onChange={handleChange} isMulti />
      {
        tools.value === null ? "" : tools.value.map(v => <h4>{v.label}</h4>)
      }
    </div>
  )
}


export default AddToolDropdown