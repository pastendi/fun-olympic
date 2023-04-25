import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import './style.css'

const UploadImage = ({ id, setUploading }) => {
  const [data, setData] = useState({ name: '', imageFile: null })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('image', data.imageFile)
    try {
      const res = await axios({
        method: 'patch',
        baseURL: `/api/carousel/${id}`,
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData,
      })
      console.log('File uploaded', res.data)
      setUploading(false)
      res.status === 201 && navigate('/admin/customization')
    } catch (err) {
      console.error('Failed to upload file', err)
    }
  }
  return (
    <div className='back'>
      <div className='wrap'>
        <span className='close_btn' onClick={() => setUploading(false)}>
          <i className='fa-solid fa-xmark'></i>
        </span>
        <h1>Upload new images</h1>
        <input
          type='text'
          placeholder='Image name'
          name='name'
          onChange={(e) => {
            setData({ ...data, name: e.target.value })
          }}
          value={data.name}
          required
          className='user_input'
        />
        <label>Thumbnail:</label>
        <input
          type='file'
          name='image'
          onChange={(e) => {
            setData({ ...data, imageFile: e.target.files[0] })
          }}
        />
        <button className='btn btn-upload' onClick={handleSubmit}>
          Upload
        </button>
      </div>
    </div>
  )
}

export default UploadImage
