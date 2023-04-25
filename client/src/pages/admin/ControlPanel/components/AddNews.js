import { useEffect, useState } from 'react'
import { useAppContext } from '../../../../context/appContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './style.css'
const AddNews = ({ setAddNews }) => {
  const [data, setData] = useState({
    title: '',
    desc: '',
    imageFile: null,
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
    formData.append('images', data.imageFile)
    try {
      const res = await axios({
        method: 'post',
        baseURL: `/api/news`,
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData,
      })
      console.log('File uploaded', res.data)
      setAddNews(false)
      res.status === 201 && navigate('/admin/News')
    } catch (err) {
      console.error('Failed to upload file', err)
    }
  }
  const uploadThumbnail = (e) => {
    setData({ ...data, imageFile: e.target.files[0] })
  }
  return (
    <div className='back'>
      <div className='wrap'>
        <span className='close_btn' onClick={() => setAddNews(false)}>
          <i className='fa-solid fa-xmark'></i>
        </span>
        <h1 className='topic'>Upload a New News</h1>
        {showAlert && (
          <div className={`alert alert-${alertType}`}>{alertText}</div>
        )}
        <input
          type='text'
          placeholder='News title'
          name='title'
          onChange={handleChange}
          value={data.title}
          required
          className='user_input'
        />
        <label>Description:</label>
        <textarea
          type='text'
          placeholder='Something about this News'
          name='desc'
          onChange={handleChange}
          value={data.desc}
          className='text-area'
        />
        <label>Image:</label>
        <input type='file' name='img' onChange={uploadThumbnail} />
        <button className='main-btn' onClick={handleSubmit}>
          Add
        </button>
      </div>
    </div>
  )
}

export default AddNews
