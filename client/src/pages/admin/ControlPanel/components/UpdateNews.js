import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../../../context/appContext'
import axios from 'axios'
import { BASE_URL } from '../../../constant'
import './style.css'
const UpdateNews = ({ id, setUpdateNews }) => {
  const [data, setData] = useState({
    title: '',
    desc: '',
    image: '',
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
    formData.append('_id', id)
    formData.append('title', data.title)
    formData.append('desc', data.desc)
    formData.append('images', data.imageFile)
    try {
      const res = await axios({
        method: 'patch',
        baseURL: `/api/news/${id}`,
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData,
      })
      console.log('File uploaded', res.data)
      setUpdateNews(false)
      res.status === 201 && navigate('/admin/news')
    } catch (err) {
      console.error('Failed to upload file', err)
    }
  }
  const uploadThumbnail = (e) => {
    setData({ ...data, imageFile: e.target.files[0] })
  }
  const getNews = async (id) => {
    const res = await axios.get(`/api/news/find/${id}`)
    const { title, desc, image } = res.data.news
    setData({
      ...data,
      title: title,
      desc: desc,
      image: image,
    })
  }
  useEffect(() => {
    getNews(id)
  }, [id])
  return (
    <div className='back'>
      <div className='wrap'>
        <span className='close_btn' onClick={() => setUpdateNews(false)}>
          <i className='fa-solid fa-xmark'></i>
        </span>
        <h1 className='topic'>Updating news</h1>
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
        <div className='divide'>
          <div className='updating-thumbnail'>
            <img src={`${BASE_URL + '/' + data.image}`} alt='images of news' />
          </div>
          <div>
            <label>Change image:</label>
            <input type='file' name='img' onChange={uploadThumbnail} />
          </div>
        </div>
        <label>Description:</label>
        <textarea
          type='text'
          placeholder='Something about news'
          name='desc'
          onChange={handleChange}
          value={data.desc}
          className='text-area'
        />

        <div id='center'>
          <button className='btn-update' onClick={handleSubmit}>
            Update
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdateNews
