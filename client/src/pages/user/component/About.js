import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../constant'
import './style.css'

const About = () => {
  const [about, setAbout] = useState({})
  const fetchAbout = async () => {
    const res = await axios.get('/api/about')
    setAbout(res.data.about)
  }
  useEffect(() => {
    fetchAbout()
  }, [])
  return (
    <div className='about-section'>
      <div className='image'>
        <img src={`${BASE_URL + '/' + about.profile}`} alt='about us' />
      </div>
      <div className='desc'>
        <h1>{about.title}</h1>
        <p>{about.desc}</p>
      </div>
    </div>
  )
}

export default About
