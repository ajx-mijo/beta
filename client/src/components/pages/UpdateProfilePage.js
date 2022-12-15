import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// Imports
import axios from 'axios'
import { getToken, getUserId } from '../common/Authentication'
import UpdateProfileForm from '../common/UpdateProfileForm'


const UpdateProfilePage = () => {

  const [profile, setProfile] = useState([])

  const navigate = useNavigate()


  const owner = getUserId()

  // ! State
  const [formFields, setFormFields] = useState({
    first_name: "",
    last_name: "",
    profile_image: "",
    current_role_title: "",
    current_employer: "",
    years_exp: undefined,
    biography: "",
    owner: `${owner}`
  })

  const [errors, setErrors] = useState(null)
  // const [location, setLocation] = useState(null)

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get(`/api/profile/${owner}/`)
        console.log(data)
        setProfile(data)
        setFormFields(data)
      } catch (err) {
        console.log(err)
      }
    }
    getProfile()
  }, [owner])

  // ! Execution
  // send off form data to API
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`/api/user_profile/`, formFields, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log('Put app data ->', data)
      navigate(`/profile/${owner}`)
    } catch (err) {
      console.log('Update profile error->', err.response.data)
      setErrors(err.response.data)
      console.log(err)
    }
  }


  return (
    <div className="site-wrapper">
      <div className="hero-page text-center form-main">
        <h1 className="mt-5 form-header">Update Your Profile</h1>
        <UpdateProfileForm
          handleSubmit={handleSubmit}
          formFields={formFields}
          setFormFields={setFormFields}
          errors={errors}
          setErrors={setErrors}
          profile={profile}
          formName="Update your Profile"
        />
      </div>
    </div>

  )
}

export default UpdateProfilePage