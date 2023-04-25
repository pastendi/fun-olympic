import React, { useState } from 'react'
import './index.css'
import { useAppContext } from '../../../context/appContext'
import { Live, VideoPage, Model } from './components'

const Video = () => {
  const [videoSelected, setVideoSelected] = useState(true)
  const { model, toggleModel } = useAppContext()
  return (
    <>
      <div className='video-type'>
        <div
          className={videoSelected ? 'type active-option' : 'type'}
          onClick={() => setVideoSelected(true)}
        >
          Videos
        </div>
        <div
          className={!videoSelected ? 'type active-option' : 'type'}
          onClick={() => setVideoSelected(false)}
        >
          Live
        </div>
      </div>
      <div>{videoSelected ? <VideoPage /> : <Live />}</div>
      {!model || <Model />}
    </>
  )
}

export default Video
