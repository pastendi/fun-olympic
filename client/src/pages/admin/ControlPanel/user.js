import React, { useState } from 'react'
import './index.css'
import { useAppContext } from '../../../context/appContext'
import { AllUser, ActiveUser } from './components'

const User = () => {
  const [activeSelected, setActiveSelected] = useState(false)
  return (
    <>
      <div className='video-type'>
        <div
          className={activeSelected ? 'type' : 'type active-option'}
          onClick={() => setActiveSelected(false)}
        >
          All Users
        </div>
        <div
          className={!activeSelected ? 'type' : 'type active-option'}
          onClick={() => setActiveSelected(true)}
        >
          Active Users
        </div>
      </div>
      <div className='secondary'>
        {activeSelected ? <ActiveUser /> : <AllUser />}
      </div>
    </>
  )
}

export default User
