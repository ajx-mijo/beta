import { useState } from 'react'
import { useNavigate } from 'react-router-dom'



import Container from 'react-bootstrap/Container'

// imports
import axios from 'axios'
import { setToken } from '../common/Authentication'

const LoginPage = () => {

  const navigate = useNavigate()


  const [formFields, setFormFields] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState('')

  // send off form data to our API
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login/', formFields)
      setToken(data.token)
      navigate('/')
    } catch (error) {
      setErrors(error.response.data.detail)
    }
  }

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }


  return (
    <div className="site-wrapper">
      <Container className='login-page'>
        <div className='login-register-text-container'>
          <p className='login-register-text'>Beta.</p>
        </div>
        <div className="hero-page text-center form-main" id='login-register-form'>
          <div className='form-container-outer'>
            <h1 className="mt-5">Login</h1>
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <input
                  required
                  className="form-control mt-3 mb-3"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Email *"
                  value={formFields.email}
                />
                <input
                  required
                  className="form-control mt-3 mb-3"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Password *"
                  value={formFields.password}
                />
                {errors && <small className='text-danger'>{errors}</small>}
                <div className='login-btn'>
                  <button to={'/'} className="btn btn-danger btn-lg mt-3 mb-3">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>

  )
}

export default LoginPage