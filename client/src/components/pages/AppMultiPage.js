import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import SpinnerItem from '../common/Spinner'
import SearchFilter from '../common/SearchFilter'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const AppMultiPage = () => {
  const [apps, setApps] = useState([])
  const [errors, setErrors] = useState(false)
  const [filteredApps, setFilteredApps] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('api/apps/')
        console.log(data)
        setApps(data)
      } catch (err) {
        console.log(err.message)
        setErrors(true)
      }
    }
    getData()
  }, [])

  return (
    <div className="site-wrapper">
      <main className="location-index">
        <Container className=" fluid char-container mt-4">
          <SearchFilter
            apps={apps}
            filteredApps={filteredApps}
            setFilteredApps={setFilteredApps}
          />
          {filteredApps.length ? (
            <Row>
              {filteredApps.map((app) => {
                const {
                  name,

                  version,
                  logo,

                  id
                } = app
                // console.log(typeof tools)
                // console.log(tools[0])
                return (
                  <Col
                    key={id}
                    xs="12"
                    sm="12"
                    // md="6"
                    // lg="4"
                    // xl="4"
                    className="char-card mb-4"
                  >
                    <Link
                      className="text-decoration-none"
                      to={`/apps/${id}`}
                    >
                      <Card className="app-card">
                        <div
                          className="card-image"
                          style={{ backgroundImage: `url(${logo})` }}
                        >
                        </div>
                        <Card.Body className="d-flex flex-column">
                          <div className='app-card-header' id='index-header'>
                            <div className='index-page-title'>
                              <h4 className='app-card-title mb-4' id='index-title'>{name}</h4>
                              <p className='card-code-multi' id='index-code'>{version}</p>
                            </div>
                            <div className='index-review-container'>
                              <p className='card-avg-index'><span className='index-rating'>{version}</span></p>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                )
              })}
            </Row>
          ) : errors ?
            <h2>Something has gone wrong, my sincere apologies...</h2>
            :
            <SpinnerItem />
          }
        </Container>
      </main>
    </div>

  )
}

export default AppMultiPage