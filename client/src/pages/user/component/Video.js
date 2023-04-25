import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../../context/appContext'
import Confirm from '../component/Confirm'

const Video = () => {
  const { videos, getVideos, user } = useAppContext()
  const [confirmation, setConfirmation] = useState(false)

  const navigate = useNavigate()
  const handleClick = (id) => {
    if (!user) {
      setConfirmation(true)
      return
    }
    navigate(`/video/${id}`)
  }
  const viewMore = () => {
    navigate('/videos')
  }
  useEffect(() => {
    getVideos()
  }, [])
  return (
    <>
      {confirmation && <Confirm setConfirmation={setConfirmation} />}

      <div>
        <p className='section-name'>Videos</p>
        <div className='grid3'>
          {videos.slice(0, 5).map((video) => {
            return (
              <div
                className='video-item'
                key={video._id}
                onClick={() => handleClick(video._id)}
              >
                <div className='video-thumbnail'>
                  <img src={video.thumbnail} alt='thumbnail' />
                  <i class='fa-solid fa-play play-icon'></i>
                </div>
                <p className='video-title'>{video.title}</p>
              </div>
            )
          })}
          <div className='more' onClick={() => viewMore()}>
            View more <i class='fa-solid fa-arrow-right'></i>
          </div>
        </div>
      </div>
    </>
  )
}

export default Video
