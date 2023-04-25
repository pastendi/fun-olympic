import React from 'react'
import { Outlet } from 'react-router-dom'
import './layout.css'
import { Alert, Sidebar, FormRow, Logo, Navbar } from './components'
const Layout = () => {
  return (
    <>
      <main className='admin-dashboard'>
        <div>
          <Sidebar />
        </div>
        <div>
          <Navbar />
          <div className='dynamic'>
            <Outlet />
          </div>
        </div>
      </main>
    </>
  )
}

export default Layout
