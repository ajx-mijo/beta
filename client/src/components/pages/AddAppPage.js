import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Imports
import axios from 'axios'
import { getToken, getUserId } from '../common/Authentication'
import AppForm from '../common/AppForm'


const AddAppPage = () => {

  const navigate = useNavigate()

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

  // ! Execution
  // send off form data to API
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formattedToolFields = formFields.tools.map((tool) => tool.value)
    const formattedSectorFields = formFields.sectors.map((sector) => sector.value)
    const updatedFormFields = { ...formFields, sectors: formattedSectorFields, tools: formattedToolFields }
    try {
      const { data } = await axios.post('/api/apps/', updatedFormFields, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log('Post app data ->', data)
      navigate('/apps')
    } catch (err) {
      console.log('Add new app error->', err.response.data)
      setErrors(err.response.data)
      console.log(err)
    }
  }

  return (
    <div className="site-wrapper">
      <div className="hero-page text-center form-main">
        <h1 className="mt-5 form-header">Upload your New Project</h1>
        <AppForm
          handleSubmit={handleSubmit}
          formFields={formFields}
          setFormFields={setFormFields}
          errors={errors}
          setErrors={setErrors}
          formName="Upload your New Project"
        />
      </div>
    </div>
  )
}

export default AddAppPage