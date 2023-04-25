import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../../context/appContext'
import './style.css'

const Favorite = () => {
  const [favorites, setFavorites] = useState([])
  const { videos, getVideos, email } = useAppContext()
  const navigate = useNavigate()
  const handleClick = (id) => {
    navigate(`/video/${id}`)
  }
  const filterFavorite = async () => {
    try {
      const res = await axios.post('/api/user/favorites', { email })
      const userFavorites = res.data.favorites
      const filtered = videos.filter((video) =>
        userFavorites.includes(video._id)
      )
      setFavorites(filtered)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getVideos()
  }, [])
  useEffect(() => {
    filterFavorite()
  }, [videos])
  return (
    <div className='favorites'>
      <h1>Your favorites</h1>
      {favorites.length === 0 && (
        <div>
          <h1>There is not anything to show</h1>
          <h3>You have not put any video to you favorite</h3>
        </div>
      )}
      {favorites.length > 0 && (
        <div className='grid3'>
          {favorites.map((video) => {
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
        </div>
      )}
    </div>
  )
}

export default Favorite
