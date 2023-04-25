import { useEffect, useState } from 'react'
import { useAppContext } from '../../../../context/appContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../../constant'
import './style.css'
const DeleteNews = ({ id, setDeleteNews }) => {
  const [data, setData] = useState({
    title: '',
    image: '',
  })
  const navigate = useNavigate()
  const { alertType, alertText, showAlert } = useAppContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.delete(`/api/news/${id}`)
      console.log('News deleted', res.data)
      setDeleteNews(false)
      res.status === 200 && navigate('/admin/news')
    } catch (err) {
      console.error('Failed to upload file', err)
    }
  }
  const getNews = async (id) => {
    const res = await axios.get(`/api/news/find/${id}`)
    const { title, image } = res.data.news
    setData({
      ...data,
      title: title,
      image: image,
    })
  }
  useEffect(() => {
    getNews(id)
  }, [])
  return (
    <div className='back'>
      <div className='wrap'>
        <span className='close_btn' onClick={() => setDeleteNews(false)}>
          <i className='fa-solid fa-xmark'></i>
        </span>
        <h1 className='topic'>Deleting news</h1>
        {showAlert && (
          <div className={`alert alert-${alertType}`}>{alertText}</div>
        )}
        <h3>Please check the detail before deleting this news?</h3>
        <div id='center'>
          <div className='deleting-thumbnail'>
            <img src={`${BASE_URL + '/' + data.image}`} alt='images of news' />
          </div>
          <div>
            <span id='head4'>Title: </span> <span id='title'>{data.title}</span>
          </div>
          <button className='btn-delete' onClick={handleSubmit}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteNews
