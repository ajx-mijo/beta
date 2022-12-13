import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { isOwner, getToken } from '../common/Authentication'


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

  // ! App
  const { appId } = useParams()
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
        <Container className="fluid mt-4 single-page-container">
          <Row>
            {app ?
              <>
                <div className='single-page-header'>
                  <div className='single-page-name'>
                    <h1 className='single-page-title'>{app.name}</h1>
                    <p className='app-version'>{app.version}</p>
                  </div>
                  <div className='single-page-rating'>
                    {/* <p className='card-avg'><span className='rating'>{location.avgRating} &#9733;</span></p> */}
                  </div>
                </div>
                {/* <CarouselImageController location={location} /> */}
                <Tabs
                  defaultActiveKey="details"
                  id="fill-tab-example"
                  className="mb-3"
                  fill
                >
                  <Tab eventKey="details" title="Description">
                    <Col sm="12" >
                      {/* <InfographicSingle location={location} /> */}
                      <hr className='single-page-hr'></hr>
                      <h3 className='mt-3 mb-3'>Description:</h3>
                      <p className='app-description'>{app.description}</p>
                      <h5 className='mt-5 mb-3 nearby-activities-title'>New Features:</h5>
                      <p className='app-description'>{app.new_features}</p>
                      <hr className='single-page-hr'></hr>
                    </Col>
                    {isOwner(app.owner) &&
                      <div className='edit-delete-buttons d-flex justify-content-evenly'>
                        <button onClick={deleteApp} className='btn btn-danger btn-lg mt-3 mb-3 ' id='del-btn'>Delete app</button>
                        <Link to={`/apps/${appId}/edit`}>
                          <button className='btn  btn-warning btn-lg mt-3 mb-3' id='edit-btn'>Edit app</button>
                        </Link>
                      </div>
                    }
                  </Tab>
                  <Tab eventKey="tools" title="Tools">
                    <ToolDisplay app={app} />
                  </Tab>
                  <Tab eventKey="reviews" title="Reviews">
                    <ReviewRate app={app} setApp={setApp} />
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