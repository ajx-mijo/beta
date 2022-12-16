import { Link } from 'react-router-dom'


import { useNavigate } from 'react-router-dom'
import { BsPeopleFill } from 'react-icons/bs'
import { GiTechnoHeart } from 'react-icons/gi'
import { MdOutlineSpeakerNotes } from 'react-icons/md'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'


import PhotoOne from '../images/lp-photo-3.png'
import PhotoTwo from '../images/lp-2.png'

const LandingPage = () => {
  const navigate = useNavigate()

  const navigateToAppMultiPage = () => {
    navigate('/apps')
  }


  const style = { color: "#1b55fe", fontSize: "5em" }


  return (
    <div className="site-wrapper">

      <main className="landing-page">

        <Container className="landing-page">

          <div className='intro-lp'>
            <div className="lp-text">
              <h1 className="lp-title">Welcome to Beta</h1>
              <p className="subtitle">The online peer-review community for Developers</p>
              <p className="subtitle-2">A space to share, learn and engage with the Software world</p>
              <Link className="btn btn-primary btn-lg" id="lp-btn" onClick={() => navigateToAppMultiPage()}>Begin discovering Apps</Link>
            </div>
            <div className="lp-img">
              <img src={PhotoOne} alt='Developers discussing ideas' height={600} />
            </div>
          </div>

          <div className='lp-icon-container'>
            <div className='icon-community-container' id='icon-container'>
              <div className='icon' id='community-icon'><BsPeopleFill style={style} /><p className='icon-text'>Join our developer community of like-minded individuals with a passion for all things Python (and JavaScript etc.)</p></div>
            </div>
            <div className='icon-tech-container' id='icon-container'>
              <div className='icon' id='tech-icon'><GiTechnoHeart style={style} /><p className='icon-text'>Identify the tools and tech utilized by peers to build their applications - big or small!</p></div>
            </div>
            <div className='feedback-news-container' id='icon-container'>
              <div className='icon' id='feedback-icon'><MdOutlineSpeakerNotes style={style} /><p className='icon-text'>Be brave and upload your active or past application builds to receive tips, feedback and praise from our expert community!</p></div>
            </div>
          </div>

          <div className='lp-login-register-container'>
            <div className='lp-second-image-container'>
              <img src={PhotoTwo} alt='Community network' height={400} width={400} />
            </div>
            <div className='lp-info-button-container'>
              <div className='site-info-container'>
                <h1>How to get started?</h1>
                <br></br>
                <p className='lp-info-text'> 1. Jump on in: Login or Register below</p>
                <p className='lp-info-text'> 2. Once you are in, get busy uploading your own projects or reviewing others.</p>
                <p className='lp-info-text'> 3. Check out your profile page to find all your reviews and projects in one place.</p>
                <p className='lp-info-text'>There is only one rule in this house: be constructive with your feedback! </p>
              </div>
              <div className='button-container'>
                <Link className='profile-btn btn align-self-center btn-lg btn-md mb-5' id='lp-btn' to={'/register'}>Register</Link>
                <Link className='profile-btn btn align-self-center btn-lg btn-md mb-5' id='lp-btn' to={'/login'}>Login</Link>
              </div>
            </div>
          </div>
        </Container>

      </main>

    </div>
  )
}

export default LandingPage