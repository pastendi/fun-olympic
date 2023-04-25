import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFound from './pages/notFound'
import AdminLogin from './pages/admin/Login'
import RouteProtection from './pages/admin/utils/routeProtection'
import ResetPassword from './pages/user/Auth/resetPassword'
import {
  Dashboard,
  Video,
  Layout,
  Customization,
  Message,
  User,
  News,
  ResetPasswordLink,
} from './pages/admin/ControlPanel'
import {
  Home,
  Videos,
  ClientLayout,
  Contact,
  EventNews,
  About,
  WatchVideo,
  WatchLiveVideo,
  Favorite,
  SingleNews,
} from './pages/user/Landing'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/admin'
          element={
            <RouteProtection>
              <Layout />
            </RouteProtection>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path='customization' element={<Customization />} />
          <Route path='videos' element={<Video />} />
          <Route path='message' element={<Message />} />
          <Route path='users' element={<User />} />
          <Route path='news' element={<News />} />
          <Route path='reset-password' element={<ResetPasswordLink />} />
        </Route>
        <Route path='/' element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='videos' element={<Videos />} />
          <Route path='news' element={<EventNews />} />
          <Route path='news/:id' element={<SingleNews />} />
          <Route path='contact' element={<Contact />} />
          <Route path='favorite' element={<Favorite />} />
          <Route
            path='video/:id'
            element={
              <RouteProtection>
                <WatchVideo />
              </RouteProtection>
            }
          />
          <Route
            path='live/:id'
            element={
              <RouteProtection>
                <WatchLiveVideo />
              </RouteProtection>
            }
          />
        </Route>
        <Route path='/cpanel' element={<AdminLogin />} />
        <Route path='/resetPassword/:token' element={<ResetPassword />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
