import { useEffect, useState } from 'react'
import { useAppContext } from '../../../../context/appContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './style.css'
const AddVideo = ({ setAddVideo }) => {
  const [data, setData] = useState({
    url: '',
    title: '',
    desc: '',
    thumbnailFile: null,
  })
  const navigate = useNavigate()
  const { alertType, alertText, showAlert, displayAlert } = useAppContext()

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('desc', data.desc)
    formData.append('url', data.url)
    formData.append('image', data.thumbnailFile)
    try {
      const res = await axios({
        method: 'post',
        baseURL: `/api/videos`,
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData,
      })
      console.log('File uploaded', res.data)
      setAddVideo(false)
      res.status === 201 && navigate('/admin/videos')
    } catch (err) {
      console.error('Failed to upload file', err)
    }
  }
  const uploadThumbnail = (e) => {
    setData({ ...data, thumbnailFile: e.target.files[0] })
  }
  return (
    <div className='back'>
      <div className='wrap'>
        <span className='close_btn' onClick={() => setAddVideo(false)}>
          <i className='fa-solid fa-xmark'></i>
        </span>
        <h1 className='topic'>Upload a New Video</h1>
        {showAlert && (
          <div className={`alert alert-${alertType}`}>{alertText}</div>
        )}
        <input
          type='text'
          placeholder='Video title'
          name='title'
          onChange={handleChange}
          value={data.title}
          required
          className='user_input'
        />
        <input
          type='text'
          placeholder='Video url'
          name='url'
          onChange={handleChange}
          value={data.url}
          required
          className='user_input'
        />
        <label>Description:</label>
        <textarea
          type='text'
          placeholder='Something about this video'
          name='desc'
          onChange={handleChange}
          value={data.desc}
          className='text-area'
        />
        <label>Thumbnail:</label>
        <input type='file' name='img' onChange={uploadThumbnail} />
        <button className='main-btn' onClick={handleSubmit}>
          Upload
        </button>
      </div>
    </div>
  )
}

export default AddVideo
