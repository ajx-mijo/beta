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
          if (review.owner === parseInt(userId)) {
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

  return (
    <>
      {reviews ? (
        <ListGroup className='ms-1'>
          {reviews.map(review => {
            const { text, ux_rating, design_rating, accessibility_rating, performance_rating, app } = review
            // return reviews.map(review => {
            return (
              <Link
                className="text-decoration-none"
                key={review._id}
                to={`/apps/${app}`}>
                <ListGroupItem className='d-flex review-list list-group-item-action mt-2 review-profile-item'>
                  <div>
                    {/* <img className='list-group-img img-thumbnail' src={locationImage}></img> */}
                  </div>
                  <div className='d-flex flex-column align-items-start ms-3'>
                    <h4>{app}</h4>
                    <p className='d-none d-sm-block'>{text}</p>
                  </div>
                  <div className='d-flex flex-column buttons align-self-start'>
                    {/* <Link onClick={() => deleteReview(locationId, review._id)} className='btn mt-3 align-self-end' id="del2-btn" to="">Delete</Link> */}
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