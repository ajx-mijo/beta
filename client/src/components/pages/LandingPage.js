import { useNavigate } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/row'

import PhotoOne from '../images/lp-photo-3.png'

const LandingPage = () => {
  const navigate = useNavigate()

  // const navigateToLogin = () => {
  //   navigate('/login')
  // }
  // const navigateToRegister = () => {
  //   navigate('/register')
  // }
  const navigateToAppMultiPage = () => {
    navigate('/apps')
  }
  return (
    <div className="site-wrapper">

      <main className="landing-page">

        <Container className="landing-page">
          <div className="lp-text">
            <h1 className="lp-title">Welcome to App Overflow</h1>
            <p className="subtitle">The online peer-review community for Developers</p>
            <p className="subtitle-2">A space to share, learn and engage with the Software world</p>
            <Button id="hero-btn" className="btn btn-primary btn-lg" onClick={() => navigateToAppMultiPage()}>Begin discovering Apps</Button>
          </div>
          {/* <div className='lp-index-btn'>
          <Button id="hero-btn" className="btn btn-danger btn-lg" onClick={() => navigateToLocationIndex()}>Begin discovering Apps</Button>
        </div> */}
          <div className="lp-img">
            <img src={PhotoOne} alt='Developers discussing ideas' height={600} />
          </div>

        </Container>

      </main>

    </div>
  )
}

export default LandingPage