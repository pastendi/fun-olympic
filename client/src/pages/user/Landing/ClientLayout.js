import { useState } from 'react'
import { useAppContext } from '../../../context/appContext'
import { Outlet, useNavigate } from 'react-router'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import LoginModel from '../component/LoginModel'
import './style.css'

const ClientLayout = () => {
  const { model } = useAppContext()
  return (
    <>
      {model && <LoginModel />}
      <div className='main'>
        <Navbar />
        <div className='flexible'>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default ClientLayout
