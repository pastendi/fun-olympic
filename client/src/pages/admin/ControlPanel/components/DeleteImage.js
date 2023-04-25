import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import './style.css'

const DeleteImage = ({ id, setDeleting }) => {
  const navigate = useNavigate()

  const yesCondition = async () => {
    try {
      const res = await axios.delete(`/api/carousel/${id}`)
      setDeleting(false)
      res.status === 201 && navigate('/admin/customization')
    } catch (err) {
      console.error('Failed to delete file', err)
    }
  }
  const noCondition = () => {
    setDeleting(false)
  }
  return (
    <div className='back'>
      <div className='wrap'>
        <h1>Are you sure you want to delete this image?</h1>
        <div className='delete-option'>
          <button className='btn btn-upload' onClick={() => yesCondition()}>
            Yes
          </button>
          <button className='btn btn-delete' onClick={() => noCondition()}>
            No
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteImage
