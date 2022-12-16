import { useState, useEffect } from 'react'

// Imports
import axios from 'axios'

const GetAllYears = () => {

  const [allTools, setAllTools] = useState([])
  const [errors, setErrors] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/tools/')
        console.log('All tools->', data)
        setAllTools(data)
      } catch (error) {
        console.log(error.message)
        setErrors(true)
      }
    }
    getData()
  }, [])

  return (
    <>
      {allTools ?
        allTools.map((tool) => {
          return (
            <option key={tool.id} value={tool.id} multiple={true} >{tool.name}</option>
          )
        })
        :
        <>
          <h4>Something went wrong</h4>
        </>
      }
    </>
  )
}

export default GetAllYears