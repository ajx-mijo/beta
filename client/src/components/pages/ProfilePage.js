import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

import axios from 'axios'

import { getToken, handleLogout } from '../common/Authentication'
import UploadImage from '../../helpers/ImageUpload'

import ProfileReviewDisplay from '../common/ProfileReviewDisplay'
import ProfileAppDisplay from '../common/ProfileAppDisplay'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'




const ProfilePage = () => {

  const [user, setUser] = useState([])
  const [profile, setProfile] = useState([])
  const [errors, setErrors] = useState(false)

  const [formData, setFormData] = useState({
    image: '',
    userBio: '',
  })

  // ! Location
  const { userId } = useParams()

  // ! Navigation
  const navigate = useNavigate()

  // ! Get User Info
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(`/api/auth/${userId}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        setUser(data)
      } catch (err) {
        console.log(err)
        setErrors(true)
      }
    }
    getUser()
  }, [userId])

  // ! Get Profile Info
  useEffect(() => {
    const getProfile = async () => {
      try {
        console.log('User profile->', user.user_profile[0])
        const { data } = await axios.get(`/api/user_profile/${user.user_profile[0]}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        setProfile(data)
      } catch (error) {
        console.log('This the error ->', error)
      }
    }
    getProfile()
  }, [user])

  const handleChange = async (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.put(`/api/auth/${userId}/`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      const { data } = await axios.get(`/api/auth/${userId}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      setUser(data)
      setFormData({ ...formData, [event.target.name]: event.target.value })
    } catch (err) {
      console.log(err)
    }
  }

  const deleteReview = async (locationId, reviewId) => {
    try {
      console.log('locationId -> ', locationId)
      console.log('reviewId -> ', reviewId)
      console.log('user Id ->', user.id)
      const response = await axios.delete(`/api/reviews/${reviewId}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      const { data } = await axios.get(`/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      setUser(data)
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <>
      <div className="site-wrapper">
        <Container className='profile-page-container'>
          <Row className='text-center'>
            <Col md="4" className='text-center '>
              <div className='user-details d-flex flex-column align-items-center'>
                <h3 className="mt-5 mb-5">{user.username}</h3>
                <div className='profile-container'>
                  <img className='img-thumbnail profile-pic' src={profile.profile_image} alt="User Profile" />
                  <div className="upload-image-div d-flex  mt-2">
                    <Link onClick={handleSubmit} className=' profile-btn btn align-self-center btn-md btn-sm mb-3' >Upload</Link>
                    <UploadImage
                      imageFormData={formData}
                      setFormData={setFormData}
                      handleSubmit={handleSubmit}
                    />
                  </div>
                  <div className='user-profile-content'>
                    <h5>{profile.current_role_title} | {profile.current_employer}</h5>
                    <p>Years in Industry: {profile.years_exp}</p>
                    <h5>{profile.first_name}  {profile.last_name}</h5>
                  </div>
                  <div className='user-profile-bio'>
                    <h5>Bio:</h5>
                    <p>{profile.biography}</p>
                  </div>
                  <div className='mt-4 d-flex flex-column justify-content-center'>
                    <Link className='profile-btn btn align-self-center btn-lg btn-md mt-5 mb-5' to="/login" onClick={() => handleLogout(navigate)}>Logout</Link>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="8">
              <div className='profile-page-app-title'>
                <h3 className="mt-5 mb-5">Your Apps</h3>
                <Link className='profile-btn btn align-self-center btn-lg btn-md mt-5 mb-3' to="/apps/add" >Add New Project</Link>
              </div>
              <div className='user-reviews'>
                <ProfileAppDisplay errors={errors} userId={userId} />
              </div>
              <div className='profile-page-review-title'>
                <h3 className="mt-5 mb-5">Your Reviews</h3>
              </div>
              <div className='user-reviews'>
                <ProfileReviewDisplay errors={errors} userId={userId} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}
export default ProfilePage