import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import axios from 'axios'
import { getToken, isAuthenticated, getUserId, getPayload } from './Authentication'

import Col from 'react-bootstrap/Col'


const ReviewInput = ({ app, setApp }) => {

  const { appId } = useParams()

  const [formFields, setFormFields] = useState({
    text: '',
    app: `${app.id}`,
    version: `${app.version}`,
    ux_rating: '0',
    design_rating: '0',
    accessibility_rating: '0',
    performance_rating: '0',
  })
  const [errors, setErrors] = useState(null)


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`/api/reviews/`, formFields, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      setFormFields({ text: '', version: '0', ux_rating: '0', design_rating: '0', accessibility_rating: '0', performance_rating: '0' })
      const { data } = await axios.get(`/api/apps/${appId}`)
      setApp(data)
      console.log(formFields)
    } catch (err) {
      console.log(err.response.data)
      console.log(formFields)
      setErrors(err.response.data)
    }
  }

  const handleChange = (e) => {
    const updatedFormFields = { ...formFields }
    updatedFormFields[e.target.name] = e.target.value
    setFormFields(updatedFormFields)
    setErrors({ ...errors, [e.target.name]: '', message: '' })
  }

  return (
    <Col md="12">
      <div className='review-tab-container'>
        {isAuthenticated() ?
          <div className='leave-review-container'>
            <form onSubmit={handleSubmit}>
              <p className='leave-review-title'>Leave Feedback:</p>
              <textarea
                required
                className='form-control'
                type="text"
                name="text"
                onChange={handleChange}
                placeholder="Type your review here: "
                value={formFields.text}
              />
              {errors && errors.text && <small className="text-danger">{errors.text}</small>}
              <div className='review-rating-container'>
                <div className='ux-rating-container'>
                  <p id='rating-title'>UX Rating: {formFields.ux_rating}</p>
                  <input type='range' name='ux_rating' id='rating-range' min="0" max="5" onChange={handleChange} value={formFields.ux_rating}></input>
                </div>
                <div className='design-rating-container'>
                  <p id='rating-title'>Design Rating: {formFields.design_rating}</p>
                  <input type='range' name='design_rating' id='rating-range' min="0" max="5" onChange={handleChange} value={formFields.design_rating}></input>
                </div>
                <div className='accessibility-rating-container'>
                  <p id='rating-title'>Accessibility Rating: {formFields.accessibility_rating}</p>
                  <input type='range' name='accessibility_rating' id='rating-range' min="0" max="5" onChange={handleChange} value={formFields.accessibility_rating}></input>
                </div>
                <div className='performance-rating-container'>
                  <p id='rating-title'>Performance Rating: {formFields.perforamnce_rating}</p>
                  <input type='range' name='performance_rating' id='rating-range' min="0" max="5" onChange={handleChange} value={formFields.performance_rating}></input>
                </div>
              </div>
              {errors && errors.text && <small className="text-danger">{errors.text}</small>}
              <div className='rev-submit-container'>
                <button className='btn btn-primary' id='rev-submit-btn'>Submit</button>
              </div>
              <hr className='single-page-hr'></hr>
            </form>
          </div>
          :
          <div className='review-login-register'>
            <p>Please Register or Login to leave a Review</p>
            <div className='review-login-buttons'>
              <Link to={'/login'}>
                <button className='btn btn-lg btn-danger' id='review-login-buttons'>Login</button>
              </Link>
              <Link to={'/register'}>
                <button className='btn btn-danger btn-lg' id='review-login-buttons'>Register</button>
              </Link>
            </div>
          </div>
        }
        <div className='review-display-container'>
          <h3 className='community-reviews mb-3'>Community Reviews:</h3>
          <div className='review-display' >
            {app ? app.reviews.map(rev => {
              const { _id } = rev
              return (
                <div className='individual-review' key={_id}>
                  <h4 id='rev-name'>{rev.owner.username}</h4>
                  <span className='rating'> {rev.rating}&#9733;</span>
                  <p>{rev.text}</p>
                  <hr></hr>
                </div>
              )
            })
              :
              <></>
            }
          </div>
        </div>
      </div>
    </Col >
  )
}

export default ReviewInput