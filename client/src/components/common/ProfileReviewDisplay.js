import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

import { getToken } from '../common/Authentication'

import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem'


const ProfileReviewDisplay = ({ errors, userId }) => {

  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const getApps = async () => {
      try {
        const { data } = await axios.get('/api/reviews/', {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        let validReviews = []
        for (const review of data) {
          if (review.owner.id === parseInt(userId)) {
            validReviews.push(review)
          }
        }
        console.log('Reviews ->', validReviews)
        setReviews(validReviews)
      } catch (error) {
        console.log('This the error ->', error)
      }
    }
    getApps()
  }, [])


  const deleteReview = async (id) => {
    try {
      await axios.delete(`/api/reviews/${id}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      const { data } = await axios.get('/api/reviews/', {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      let validReviews = []
      for (const review of data) {
        if (review.owner.id === parseInt(userId)) {
          validReviews.push(review)
        }
      }
      console.log('Reviews ->', validReviews)
      setReviews(validReviews)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {reviews ? (
        <ListGroup className='ms-1'>
          {reviews.map(review => {
            const { text, app, id } = review
            return (
              <Link
                className="text-decoration-none"
                key={id}
                to={`/apps/${app.id}`}>
                <ListGroupItem className='d-flex review-list list-group-item-action mt-2 review-profile-item'>
                  <div className='profile-app-content'>
                    <img className='list-group-img img-thumbnail' src={app.logo} alt={app.name} id='profile-review-image'></img>
                    <div className='d-flex flex-column align-items-start ms-3 profile-app-name'>
                      <h4>{app.name}</h4>
                      <p>{text}</p>
                    </div>
                  </div>
                  <div className='d-flex flex-column buttons align-self-start'>
                    <Link onClick={() => deleteReview(id)} className='btn mt-3 align-self-end' id="del2-btn" to="">X</Link>
                  </div>
                </ListGroupItem>
              </Link>
            )
          })}
        </ListGroup>
      ) : errors ? (
        <h2>Error...</h2>
      ) : (
        <h2>No reviews</h2>
      )}
    </>
  )
}

export default ProfileReviewDisplay