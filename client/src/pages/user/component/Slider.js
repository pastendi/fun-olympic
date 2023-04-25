import React, { useEffect, useState } from 'react'
import './style.css'
import BtnSlider from './BtnSlider'
import { BASE_URL } from '../../constant'
import axios from 'axios'

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(1)
  const [images, setImages] = useState([])

  const nextSlide = () => {
    if (slideIndex !== images.length) {
      setSlideIndex(slideIndex + 1)
    } else if (slideIndex === images.length) {
      setSlideIndex(1)
    }
  }

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1)
    } else if (slideIndex === 1) {
      setSlideIndex(images.length)
    }
  }

  const moveDot = (index) => {
    setSlideIndex(index)
  }
  const fetchCarousel = async () => {
    const res = await axios.get('/api/carousel')
    setImages(res.data.result)
  }
  useEffect(() => {
    fetchCarousel()
  }, [])

  return (
    <div className='slider'>
      {images.map((obj, index) => {
        return (
          <div
            key={obj._id}
            className={slideIndex === index + 1 ? 'slide active-anim' : 'slide'}
          >
            <img src={`${BASE_URL + '/' + obj.image}`} alt='carousel' />
          </div>
        )
      })}

      <BtnSlider moveSlide={nextSlide} direction={'next'} />
      <BtnSlider moveSlide={prevSlide} direction={'prev'} />

      <div className='container-dots'>
        {images.map((item, index) => (
          <div
            onClick={() => moveDot(index + 1)}
            className={slideIndex === index + 1 ? 'dot active' : 'dot'}
          ></div>
        ))}
      </div>
    </div>
  )
}
export default Slider
