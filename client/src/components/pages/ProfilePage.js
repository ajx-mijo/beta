import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

import axios from 'axios'

// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import Container from 'react-bootstrap/Container'
// import ListGroup from 'react-bootstrap/ListGroup'
// import ListGroupItem from 'react-bootstrap/esm/ListGroupItem'

import { getToken } from '../common/Authentication'
// import UploadImage from '../../helpers/UploadImage.js'
// import { handleLogout } from '../common/Auth.js'

const ProfilePage = () => {

  // ! State
  const [user, setUser] = useState([])
  // const [errors, setErrors] = useState(false)
  // const [formData, setFormData] = useState({
  //   image: '',
  //   userBio: '',
  // })

  // ! Location
  const { userId } = useParams()

  // ! Navigation
  // const navigate = useNavigate()

  // ! Execution
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(`/api/auth/${userId}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        setUser(data)
      } catch (err) {
        console.log(err)
        // setErrors(true)
      }
    }
    getUser()
  }, [userId])

  return (
    <h1>{user}</h1>
  )
}

export default ProfilePage