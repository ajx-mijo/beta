import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Spinner from '../common/Spinner'
import SearchFilter from '../common/SearchFilter'
import ToolDisplay from '../common/ToolDisplay'

import PlaceHolder from '../common/PlaceHolder'


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const AppMultiPage = () => {
  const [apps, setApps] = useState([])
  const [errors, setErrors] = useState(false)
  const [filteredApps, setFilteredApps] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(function () {
      setLoading(false)
    }, 2000)
  }, [])




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
      <main className="app-index">
        <Container className="fluid char-container mt-4" id='index-page-container'>
          <div className='index-search-filter-container'>
            <SearchFilter
              apps={apps}
              filteredApps={filteredApps}
              setFilteredApps={setFilteredApps}
            />
          </div>
          {filteredApps.length ? (
            <Row>
              {filteredApps.map((app) => {
                const { name, version, logo, new_features, id } = app
                return (
                  <Col key={id} xs="12" sm="12" className="char-card mb-4">
                    <Link className="text-decoration-none" to={`/apps/${id}`}>
                      <Card className="app-card">
                        <Card.Body>
                          <div className='app-card-header' id='index-header'>
                            <div className='index-page-logo'>
                              <img src={logo} alt={name} width="100" height="100" />
                              <h4 className='card-version-index'><span className='index-version'>{version}</span></h4>
                            </div>
                            <div className='index-version-container'>
                              <h3 className='index-name'>{name}</h3>
                              <h5>New Features:</h5>
                              <p className='index-features'>{new_features}</p>
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
            <Spinner />
          }
        </Container>
      </main>
    </div >

  )
}

export default AppMultiPage