import React, { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination'
import { Box } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Confirm from '../component/Confirm'
import { useAppContext } from '../../../context/appContext'

const Videos = () => {
  const [query, setQuery] = useState('')
  const [search, setSearch] = useState(true)
  const [confirmation, setConfirmation] = useState(false)
  const { user } = useAppContext()
  const navigate = useNavigate()
  const pageSize = 9
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  })
  const [videos, setVideos] = useState([])
  const [live, setLive] = useState([])
  const getLiveVideos = async () => {
    try {
      const res = await axios.get('/api/live')
      setLive(res.data.liveVideos)
    } catch (error) {
      console.log(error)
    }
  }
  const handleSearch = async () => {
    try {
      const res = await axios.get(`/api/videos/search?title=${query}`)
      setVideos(res.data.videos)
      setQuery('')
    } catch (error) {
      console.log(error)
    }
  }
  const getVideos = async () => {
    try {
      const res = await axios.get('/api/videos')
      setVideos(res.data.videos)
      setPagination({ ...pagination, count: res.data.videos.length })
    } catch (error) {
      console.log(error)
    }
  }
  const handlePageChange = (event, page) => {
    const from = (page - 1) * pageSize
    const to = (page - 1) * pageSize + pageSize
    setPagination({ ...pagination, from: from, to: to })
  }
  const handleClick = (id) => {
    if (!user) {
      setConfirmation(true)
      return
    }
    navigate(`/video/${id}`)
  }
  const handleLive = (id) => {
    if (!user) {
      setConfirmation(true)
      return
    }
    navigate(`/live/${id}`)
  }
  useEffect(() => {
    getVideos()
    getLiveVideos()
  }, [pagination.from, pagination.to])
  return (
    <>
      {confirmation && <Confirm setConfirmation={setConfirmation} />}
      {live.length > 0 && (
        <div className='live-videos'>
          <h1>Live</h1>
          <div className='grid3'>
            {live.map((video) => {
              return (
                <div
                  className='video-item'
                  key={video._id}
                  onClick={() => handleLive(video._id)}
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
        </div>
      )}
      <div className='videos'>
        <div className='video-top'>
          <div>
            <h1>Videos</h1>
          </div>
          <div className='search'>
            <input
              type='text'
              placeholder='search'
              className='user_input'
              name='query'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={() => handleSearch()}>Search</button>
          </div>
        </div>
        <div className='grid3'>
          {videos.slice(pagination.from, pagination.to).map((video) => {
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
        <Box
          justifyContent={'center'}
          alignItems={'center'}
          display={'flex'}
          sx={{ margin: '20px 0px' }}
        >
          <Pagination
            color='primary'
            count={Math.ceil(pagination.count / pageSize)}
            onChange={handlePageChange}
          />
        </Box>
      </div>
    </>
  )
}

export default Videos
