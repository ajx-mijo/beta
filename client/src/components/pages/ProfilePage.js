import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

import axios from 'axios'

import { getToken, handleLogout } from '../common/Authentication'
import UploadImage from '../../helpers/ImageUpload'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem'


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
                    <Link className='profile-btn btn align-self-center btn-lg btn-md mt-5 mb-3' to="/apps/add" >Add Current Project</Link>
                    <Link className='profile-btn btn align-self-center btn-lg btn-md mt-5 mb-5' to="/login" onClick={() => handleLogout(navigate)}>Logout</Link>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="8">
              <h3 className="mt-5 mb-5">Your Reviews</h3>
              <div className='user-reviews'>
                <>
                  {user.reviews ? (
                    <ListGroup className='ms-1'>
                      {user.reviews.map(location => {
                        const { reviews, locationId, locationName, locationImage } = location
                        return reviews.map(review => {
                          return (
                            <Link
                              className="text-decoration-none"
                              key={review._id}
                              to={`/locations/${locationId}`}>
                              <ListGroupItem className='d-flex review-list list-group-item-action mt-2 review-profile-item'>
                                <div>
                                  <img className='list-group-img img-thumbnail' src={locationImage}></img>
                                </div>
                                <div className='d-flex flex-column align-items-start ms-3'>
                                  <h4>{locationName}</h4>
                                  <p className='d-none d-sm-block'>{review.text}</p>
                                </div>
                                <div className='d-flex flex-column buttons align-self-start'>
                                  <Link onClick={() => deleteReview(locationId, review._id)} className='btn mt-3 align-self-end' id="del2-btn" to="">Delete</Link>
                                </div>
                              </ListGroupItem>
                            </Link>
                          )
                        })
                      })}
                    </ListGroup>
                  ) : errors ? (
                    <h2>Error...</h2>
                  ) : (
                    <h2>No reviews</h2>
                  )}
                </>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}
export default ProfilePage