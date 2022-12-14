import { useState, useEffect } from 'react'


// Imports
import axios from 'axios'

const GetAllSectors = () => {

  const [allSectors, setAllSectors] = useState([])
  const [errors, setErrors] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/sectors/')
        // console.log('Sector data ->', data)
        setAllSectors(data)
      } catch (error) {
        console.log(error.message)
        setErrors(true)
      }
    }
    getData()
  }, [])

  return (
    <>
      {allSectors ?
        allSectors.map((sector) => {
          // console.log(sector)
          return (
            <option key={sector.id} value={sector.id} multiple={true}>{sector.name}</option>
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

export default GetAllSectors