/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

import axios from 'axios'

import { getToken, handleLogout } from '../common/Authentication'

import ProfileReviewDisplay from '../common/ProfileReviewDisplay'
import ProfileAppDisplay from '../common/ProfileAppDisplay'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'




const ProfilePage = () => {

  const [user, setUser] = useState([])
  const [profile, setProfile] = useState([])
  const [errors, setErrors] = useState(false)
  const [profileNumber, setProfileNumber] = useState()
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
        const { data } = await axios.get(`/api/user_profile/${profileNumber}/`, {
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
  }, [profileNumber])

  useEffect(() => {
    const profileNum = user.user_profile
    const profileNumber = { ...profileNum }
    const target = Object.values(profileNumber)
    const newTarget = parseInt(target.toString())
    setProfileNumber(newTarget)
  }, [user])


  return (
    <>
      <div className="site-wrapper">
        <Container className='profile-page-container'>
          <Row className='text-center'>
            <Col md="4" className='text-center '>
              <div className='user-details d-flex flex-column align-items-center'>
                <h3 className="mt-5 mb-5">Welcome back, {user.username}</h3>
                <div className='profile-container'>
                  <img className='img-thumbnail profile-pic' id='profile-image' src={profile.profile_image} alt="No Profile Image" />
                  <div className="upload-image-div d-flex  mt-2">
                  </div>
                  <div className='user-profile-content'>
                    <h5>{profile.current_role_title} | {profile.current_employer}</h5>
                    <p className='profile-industry'>Years in Industry: {profile.years_exp}</p>
                    <hr className='single-page-hr'></hr>
                  </div>
                  <div className='user-profile-bio'>
                    <h5>Bio:</h5>
                    <p className='profile-bio'>{profile.biography}</p>
                  </div>
                  <div className='mt-4 d-flex flex-column'>
                    <Link className='profile-btn btn align-self-center btn-lg btn-md mb-5 profile-display-btn' id='update-profile-btn' to={`/profile/${profileNumber}/update`}>Update Profile</Link>
                    <Link className='profile-btn btn align-self-center btn-lg btn-md mb-5 profile-display-btn' id='logout-profile-btn' to="/login" onClick={() => handleLogout(navigate)}>Logout</Link>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="8">
              <div className='profile-page-app-title'>
                <h3 className="mt-5 mb-5">Your Apps</h3>
                <Link className='profile-btn btn align-self-center btn-lg btn-md mt-4 mb-4' to="/apps/add" >Add New Project</Link>
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