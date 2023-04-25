import React, { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination'
import { Box } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../../context/appContext'
import './style.css'

const EventNews = () => {
  const { user } = useAppContext()
  const navigate = useNavigate()
  const pageSize = 8
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  })
  const [news, setNews] = useState([])
  const getNews = async () => {
    try {
      const res = await axios.get('/api/news')
      setNews(res.data.news)
      setPagination({ ...pagination, count: res.data.news.length })
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
    navigate(`/news/${id}`)
  }
  useEffect(() => {
    getNews()
  }, [pagination.from, pagination.to])
  return (
    <>
      <div className='grid2'>
        {news.slice(pagination.from, pagination.to).map((x) => {
          return (
            <div className='news-item' key={x._id}>
              <div className='news-image'>
                {console.log(x.image)}
                <img src={x.image} alt='image of news' />
              </div>
              <div className='news-desc'>
                <h3>{x.title}</h3>
                <span>{x.desc.substring(0, 150) + '....  '}</span>
                <span onClick={() => handleClick(x._id)}>
                  <a href=''>read more--></a>{' '}
                </span>
              </div>
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
    </>
  )
}

export default EventNews
