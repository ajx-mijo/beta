import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

import { getToken } from '../common/Authentication'

import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem'


const ProfileAppDisplay = ({ errors, userId }) => {

  const [apps, setApps] = useState([])

  useEffect(() => {
    const getApps = async () => {
      try {
        const { data } = await axios.get('/api/apps/', {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        let validApps = []
        for (const app of data) {
          if (app.owner === parseInt(userId)) {
            validApps.push(app)
          }
        }
        console.log('Apps ->', validApps)
        setApps(validApps)
      } catch (error) {
        console.log('This the error ->', error)
      }
    }
    getApps()
  }, [])

  return (
    <>
      {apps ? (
        <ListGroup className='ms-1'>
          {apps.map(app => {
            const { name, logo, id, version, added_at } = app
            return (
              <Link
                className="text-decoration-none"
                key={id}
                to={`/apps/${id}`}>
                <ListGroupItem className='d-flex review-list list-group-item-action mt-2 review-profile-item'>
                  <div>
                    <img className='list-group-img img-thumbnail' src={logo} alt={name} height='50' width='50'></img>
                  </div>
                  <div className='d-flex flex-column align-items-start ms-3'>
                    <h4>{name}</h4>
                    <p className='d-none d-sm-block'>{version}</p>
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
        <h2>No apps</h2>
      )}
    </>
  )
}

export default ProfileAppDisplay