import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './style.css'

const SingleNews = () => {
  const { id } = useParams()
  const [news, setNews] = useState({
    title: '',
    desc: '',
    image: '',
  })
  const [pic, setPic] = useState('')
  const findNews = async () => {
    try {
      const res = await axios.get(`/api/news/find/${id}`)
      const { title, image, desc } = res.data.news
      setNews({
        ...news,
        title: title,
        desc: desc,
        image: image,
      })
      console.log(image)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    findNews()
  }, [])
  return (
    <>
      <div className='grid2'>
        <div className='big-img'>
          <img
            src='http:\\localhost:3000\newsPic\1665584288790.jpg'
            alt='pic'
          />
        </div>
        <div className='big-text'>
          <h1>{news.title}</h1>
          <span>{news.desc}</span>
        </div>
      </div>
    </>
  )
}

export default SingleNews
