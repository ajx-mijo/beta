import { BrowserRouter, Routes, Route } from 'react-router-dom'

import NavBar from './components/common/NavBar'
import LandingPage from './components/pages/LandingPage'
import AppMultiPage from './components/pages/AppMultiPage'
import AppSinglePage from './components/pages/AppSinglePage'
import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/pages/RegisterPage'
import AddAppPage from './components/pages/AddAppPage'
import UpdateAppPage from './components/pages/UpdateAppPage'
import UpdateProfilePage from './components/pages/UpdateProfilePage'
import ProfilePage from './components/pages/ProfilePage'
import NotFoundPage from './components/pages/NotFoundPage'
import Footer from './components/common/Footer'

function App() {
  return (
    <div className='sitewrapper'>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/apps' element={<AppMultiPage />} />
          <Route path='/apps/:appId' element={<AppSinglePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/apps/add' element={<AddAppPage />} />
          <Route path='/apps/:appId/update' element={<UpdateAppPage />} />
          <Route path='/profile/:userId/update' element={<UpdateProfilePage />} />
          <Route path='/profile/:userId' element={<ProfilePage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;
