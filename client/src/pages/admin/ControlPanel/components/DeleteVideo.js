import { useEffect, useState } from 'react'
import { useAppContext } from '../../../../context/appContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../../constant'
import './style.css'
const DeleteVideo = ({ id, setDeleteVideo }) => {
  const [data, setData] = useState({
    title: '',
    thumbnail: '',
  })
  const navigate = useNavigate()
  const { alertType, alertText, showAlert } = useAppContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.delete(`/api/videos/${id}`)
      console.log('Video deleted', res.data)
      setDeleteVideo(false)
      res.status === 200 && navigate('/admin/videos')
    } catch (err) {
      console.error('Failed to upload file', err)
    }
  }
  const getVideo = async (id) => {
    const res = await axios.get(`/api/videos/find/${id}`)
    const { title, thumbnail } = res.data.video
    setData({
      ...data,
      title: title,
      thumbnail: thumbnail,
    })
  }
  useEffect(() => {
    getVideo(id)
  }, [])
  return (
    <div className='back'>
      <div className='wrap'>
        <span className='close_btn' onClick={() => setDeleteVideo(false)}>
          <i className='fa-solid fa-xmark'></i>
        </span>
        <h1 className='topic'>Deleting video</h1>
        {showAlert && (
          <div className={`alert alert-${alertType}`}>{alertText}</div>
        )}
        <h3>Please check the detail before deleting this video?</h3>
        <div id='center'>
          <div className='deleting-thumbnail'>
            <img src={`${BASE_URL + '/' + data.thumbnail}`} alt='thumbnail' />
          </div>
          <div>
            <span id='head4'>Title: </span> <span id='title'>{data.title}</span>
          </div>
          <button className='btn-delete' onClick={handleSubmit}>
            Delete video
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteVideo
