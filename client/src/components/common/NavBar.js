import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

import { isAuthenticated, handleLogout, getUserId, getToken } from './Authentication'
import Logo from '../images/BetaLogoOfficial.png'


//Custom imports 

const NavBar = () => {
  // ! State
  const [user, setUser] = useState([])

  const activeUser = getUserId()

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(`/api/auth/${activeUser}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        setUser(data)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [activeUser])
  // ! Navigation
  const navigate = useNavigate()

  return (
    <div className='navbar-container sticky-top'>
      <Navbar expand="md" className="navbar sticky-top">
        <Container>
          <Navbar.Brand as={Link} to='/' className='intro-navbar'><img
            src={Logo}
            width="100"
            height="100"
            className="d-inline-block align-center img-nav"
            alt="Logo"
          /></Navbar.Brand>
          {isAuthenticated() ?
            <>
              <p className='navbar-username'>Logged in as:</p>
              <Nav.Link as={Link} to={`/profile/${getUserId()}`} id="navbar-profile-name">
                <p className='navbar-username' id="nav-user-link">{user.username}</p>
              </Nav.Link>
            </>
            :
            <>
            </>
          }
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end" if="basic-navbar-nav">
            <Nav>
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/apps">
                Apps
              </Nav.Link>
              {isAuthenticated() ?
                <>
                  <Nav.Link as={Link} to={'/apps/add'}>
                    Add your App
                  </Nav.Link>
                  <Nav.Link as={Link} to={`/profile/${getUserId()}`}>
                    Profile
                  </Nav.Link>
                  <span className='nav-link' onClick={() => handleLogout(navigate)}><span className='red-text'>Logout</span></span>
                </>
                :
                <>
                  <Nav.Link as={Link} to="/register">
                    Register
                  </Nav.Link>
                  <Nav.Link as={Link} to="/login">
                    <span className='red-text'>Login</span>
                  </Nav.Link>
                </>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavBar