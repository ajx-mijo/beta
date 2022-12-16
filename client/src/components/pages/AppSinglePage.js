import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { isOwner, getToken, getUserId } from '../common/Authentication'


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import Spinner from '../common/Spinner'
import ToolDisplay from '../common/ToolDisplay'
import ReviewRate from '../common/ReviewRate'


const AppSinglePage = () => {

  const [app, setApp] = useState(null)
  const [user, setUser] = useState([])
  const [errors, setErrors] = useState(false)
  // ! App
  const { appId } = useParams()

  // const activeUser = getUserId()
  // console.log('Active user->', activeUser)

  const navigate = useNavigate()

  // ! Execution
  useEffect(() => {
    const getApp = async () => {
      try {
        const { data } = await axios.get(`/api/apps/${appId}/`)
        setApp(data)
      } catch (error) {
        console.log(error)
      }
    }
    getApp()
  }, [appId])

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(`/api/auth/${app.owner}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        setUser(data)
      } catch (error) {
        console.log(error)
        setErrors(true)
      }
    }
    getUser()
  }, [app])

  const deleteApp = async (e) => {
    try {
      const response = await axios.delete(`/api/apps/${appId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      navigate('/')
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="site-wrapper">
      <main className="single-page">
        <Container className="fluid mt-4 single-page-container" >
          <Row className='single-page-row' xs='12'>
            {app ?
              <>
                <div className='single-page-header'>
                  <div className='single-page-name'>
                    <h1 className='single-page-title'>{app.name}</h1>
                    <p className='app-version'>{app.version}</p>
                  </div>
                  <div className='single-page-rating'>
                  </div>
                </div>
                <div className='single-page-site-image'>
                  <img src={app.site_images} alt={app.name} className='single-page-image' />
                </div>
                <Tabs
                  defaultActiveKey="details"
                  id="fill-tab-example"
                  className="mb-3"
                  fill
                >
                  <Tab eventKey="details" title="Description">
                    <Col sm="12" >
                      <hr className='single-page-hr'></hr>
                      <h3 className='mt-3 mb-3'>App Description:</h3>
                      <p className='app-description'>{app.description}</p>
                      <h5 className='mt-5 mb-3 new-features-title'>New Features:</h5>
                      <p className='app-description'>{app.new_features}</p>
                      <h5 className='mt-5 mb-3 app-link'>Link: <a href={app.link} target="_blank" rel="noreferrer" className='single-page-link'>{app.name}</a></h5>
                      <hr className='single-page-hr'></hr>
                    </Col>
                    {isOwner(app.owner) &&
                      <div className='edit-delete-buttons d-flex justify-content-evenly'>
                        <button onClick={deleteApp} className='btn btn-danger btn-lg mt-3 mb-3 ' id='del-btn'>Delete app</button>
                        <Link to={`/apps/${appId}/update`}>
                          <button className='btn  btn-warning btn-lg mt-3 mb-3' id='edit-btn'>Edit app</button>
                        </Link>
                      </div>
                    }
                  </Tab>
                  <Tab eventKey="tools" title="Tools">
                    <h2 className=''>Tools:</h2>
                    <div className='tool-display-container'>
                      <ToolDisplay app={app} />
                    </div>
                  </Tab>
                  <Tab eventKey="reviews" title="Reviews">
                    <ReviewRate app={app} setApp={setApp} user={user} />
                  </Tab>
                </Tabs>
              </>
              :
              <Spinner />
            }
          </Row>
        </Container>
      </main >
    </div>
  )
}

export default AppSinglePage