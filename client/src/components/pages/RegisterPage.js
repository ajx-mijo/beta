import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import Container from 'react-bootstrap/Container'

const RegisterPage = () => {

  const navigate = useNavigate()
  const [errors, setErrors] = useState('')

  const [formFields, setFormFields] = useState({
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
    user_profile: []
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('api/auth/register/', formFields)
      navigate('/login')
    } catch (error) {
      console.log('Register error ->', error)
      setErrors(error.response.data)
    }
  }

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }

  return (
    <div className="site-wrapper">
      <Container className='register-page'>
        <div className='login-register-text-container'>
          <p className='login-register-text'>Beta.</p>
        </div>
        <div className='hero-page text-center form-main' id='login-register-form'>
          <div className='form-container-outer'>
            <h1 className="mt-5">Register</h1>
            <div className='form-container'>
              <form onSubmit={handleSubmit}>
                <input
                  required
                  className='form-control'
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Email *"
                  value={formFields.email}
                />
                <input
                  required
                  className='form-control mt-3 mb-3'
                  type="text"
                  name="username"
                  onChange={handleChange}
                  placeholder="Username *"
                  value={formFields.username}
                />
                {/* {errors && <small className='text-danger'>{'Username already taken'}</small>} */}
                <input
                  required
                  className='form-control mt-3 mb-3'
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Password *"
                  value={formFields.password}
                />
                <input
                  required
                  className='form-control mb-3'
                  type="password"
                  name="password_confirmation"
                  onChange={handleChange}
                  placeholder="Confirm password *"
                  value={formFields.password_confirmation}
                />
                {errors && <small className='text-danger'>{'Passwords do not match'}</small>}
                <div className='login-btn'>
                  <button to={'/login'} className="btn btn-danger btn-lg mt-3 mb-3">Register</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>

  )
}

export default RegisterPage