import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

import { getToken } from '../common/Authentication'

import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem'


const ProfileAppDisplay = ({ errors, userId }) => {

  const [apps, setApps] = useState([])


  const style = {
    display: "flex",
    alignItems: "center"
  }

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

  const deleteApp = async (id) => {
    try {
      await axios.delete(`/api/apps/${id}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
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
      setApps(validApps)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {apps ? (
        <ListGroup className='ms-1'>
          {apps.map(app => {
            const { name, logo, id, version } = app
            return (
              <Link
                className="text-decoration-none"
                key={id}
                to={`/apps/${id}`}>
                <ListGroupItem className='d-flex review-list list-group-item-action mt-2 review-profile-item list-group-item'>
                  <div className='profile-app-content'>
                    <div classname="profile-app-image-container" style={style}>
                      <img className='list-group-img img-thumbnail profile-app-image' src={logo} alt={name} height='100' width='100'></img>
                    </div>
                    <div className='d-flex flex-column align-items-start ms-3 profile-app-name'>
                      <h4>{name}</h4>
                      <p className=''>{version}</p>
                    </div>
                  </div>
                  <div className='delete-app-profile-btn'>
                    <Link className='profile-btn btn align-self-end btn-lg btn-md mt-4 mb-4' id="edit2-btn" to={`/apps/${id}/update`}>Edit</Link>
                    <Link onClick={() => deleteApp(id)} className='btn mt-3 align-self-end' id="del2-btn" to=""><p className='delete-app-btn'>X</p></Link>
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
      )
      }
    </>
  )
}

export default ProfileAppDisplay