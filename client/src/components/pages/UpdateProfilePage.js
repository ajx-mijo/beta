import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// Imports
import axios from 'axios'
import { getToken, getUserId } from '../common/Authentication'
import UpdateProfileForm from '../common/UpdateProfileForm'


const UpdateProfilePage = () => {

  const [profile, setProfile] = useState([])

  const navigate = useNavigate()

  const { profileId } = useParams()

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
      console.log('Profile ID ->', profileId)
      try {
        const { data } = await axios.get(`/api/user_profile/${profileId}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        setProfile(data)
        setFormFields(data)
      } catch (err) {
        console.log(err)
      }
    }
    getProfile()
  }, [profileId])



  // send off form data to API
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(`/api/user_profile/${profileId}/`, formFields, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      navigate(`/profile/${owner}`)
    } catch (error) {
      console.log('Update profile error->', error.response.data)
      setErrors(error.response.data)
      console.log(error)
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