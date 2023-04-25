import React from 'react'
import './style.css'

const Footer = () => {
  return (
    <div className='foot'>
      <div className='rights'>
        <div className='buttom-link'>
          <i class='fa-brands fa-square-facebook'></i>
          <i class='fa-brands fa-square-twitter'></i>
          <i class='fa-brands fa-instagram'></i>
          <i class='fa-brands fa-tiktok'></i>
          <i class='fa-brands fa-snapchat'></i>
          <i class='fa-brands fa-youtube'></i>
        </div>
        <div className='statement'>
          TM<i class='fa-regular fa-copyright'></i>2022-International Olympic
          Committee-All Rights Reserved
        </div>
      </div>
    </div>
  )
}

export default Footer
