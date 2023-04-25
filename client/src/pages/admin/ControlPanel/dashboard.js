import React, { useEffect } from 'react'
import './index.css'
import Analytic from './components/Analytic'
import { useAppContext } from '../../../context/appContext'
import { useState } from 'react'
import axios from 'axios'

const Dashboard = () => {
  const { videos, getVideos } = useAppContext()
  const [userQuantity, setUserQuantity] = useState(0)
  const [liveQuantity, setLiveQuantity] = useState(0)
  const getUserQuantity = async () => {
    const res = await axios.get('/api/user/quantity')
    setUserQuantity(res.data.quantity)
  }
  const getLiveQuantity = async () => {
    const res = await axios.get('/api/live/quantity')
    setLiveQuantity(res.data.quantity)
  }
  useEffect(() => {
    getVideos()
    getUserQuantity()
    getLiveQuantity()
  }, [])
  return (
    <>
      <div className='overview'>
        <div>
          <p>
            {userQuantity}
            <br />
            <span>Users</span>
          </p>
          <i className='fa fa-users box-icon'></i>
        </div>
        <div>
          <p>
            {videos.length}
            <br />
            <span>Videos</span>
          </p>
          <i className='fa-solid fa-video box-icon'></i>
        </div>
        <div>
          <p>
            {liveQuantity}
            <br />
            <span>Live Videos</span>
          </p>
          <i class='fa-solid fa-film box-icon'></i>
        </div>
      </div>
      <div className='analytics'>
        <h1>Popular videos</h1>
        <Analytic videos={videos} />
      </div>
    </>
  )
}

export default Dashboard
