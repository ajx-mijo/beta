import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// Imports
import axios from 'axios'
import { getToken, getUserId } from '../common/Authentication'
import UpdateAppForm from '../common/UpdateAppForm'


const UpdateAppPage = () => {

  const [app, setApp] = useState([])

  const navigate = useNavigate()

  const { appId } = useParams()
  const owner = getUserId()

  // ! State
  const [formFields, setFormFields] = useState({
    name: '',
    year: undefined,
    site_images: [],
    description: '',
    version: '',
    new_features: '',
    logo: '',
    link: '',
    sectors: [],
    tools: [],
    owner: `${owner}`
  })

  const [errors, setErrors] = useState(null)
  // const [location, setLocation] = useState(null)

  useEffect(() => {
    const getApp = async () => {
      try {
        const { data } = await axios.get(`/api/apps/${appId}/`)
        console.log(data)
        const updatedSectors = data.sectors.map((sector) => {
          return { value: sector.id, label: sector.name }
        })
        data.sectors = updatedSectors
        const updatedTools = data.tools.map((tool) => {
          return { value: tool.id, label: tool.name }
        })
        data.tools = updatedTools
        setApp(data)
        setFormFields(data)
      } catch (err) {
        console.log(err)
      }
    }
    getApp()
  }, [appId])
  // ! Execution
  // send off form data to API
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formattedToolFields = formFields.tools.map((tool) => tool.value)
    const formattedSectorFields = formFields.sectors.map((sector) => sector.value)
    const updatedFormFields = { ...formFields, sectors: formattedSectorFields, tools: formattedToolFields }
    try {
      const { data } = await axios.put(`/api/apps/${appId}/`, updatedFormFields, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log('Put app data ->', data)
      navigate('/apps')
    } catch (err) {
      console.log('Update app error->', err.response.data)
      setErrors(err.response.data)
      console.log(err)
    }
  }


  return (
    <div className="site-wrapper">
      <div className="hero-page text-center form-main">
        <h1 className="mt-5 form-header">Edit Your Project</h1>
        <UpdateAppForm
          handleSubmit={handleSubmit}
          formFields={formFields}
          setFormFields={setFormFields}
          errors={errors}
          setErrors={setErrors}
          app={app}
          formName="Upload your New Project"
        />
      </div>
    </div>

  )
}

export default UpdateAppPage