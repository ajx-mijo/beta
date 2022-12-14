import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const RegisterPage = () => {


  const navigate = useNavigate()

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
    } catch (err) {
      console.log('This error ->', err)
    }
    console.log('form submitted')
  }

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }

  return (
    <div className="site-wrapper">
      <div className='hero-page text-center form-main'>
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
              className='form-control mb-5'
              type="password"
              name="password_confirmation"
              onChange={handleChange}
              placeholder="Confirm password *"
              value={formFields.password_confirmation}
            />
            <button to={'/login'} className="btn btn-danger btn-lg mt-3 mb-3">Register</button>
          </form>
        </div>
      </div>
    </div>

  )
}

export default RegisterPage