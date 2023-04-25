import { useEffect, useState } from 'react'
import { useAppContext } from '../../../../context/appContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../../constant'
import './style.css'
const UpdateVideo = ({ id, setUpdateVideo }) => {
  const [data, setData] = useState({
    title: '',
    desc: '',
    thumbnail: '',
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
    formData.append('_id', id)
    formData.append('title', data.title)
    formData.append('desc', data.desc)
    formData.append('image', data.thumbnailFile)
    try {
      const res = await axios({
        method: 'patch',
        baseURL: `/api/videos/${id}`,
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData,
      })
      console.log('File uploaded', res.data)
      setUpdateVideo(false)
      res.status === 201 && navigate('/admin/videos')
    } catch (err) {
      console.error('Failed to upload file', err)
    }
  }
  const uploadThumbnail = (e) => {
    setData({ ...data, thumbnailFile: e.target.files[0] })
  }
  const getVideo = async (id) => {
    const res = await axios.get(`/api/videos/find/${id}`)
    const { title, desc, thumbnail } = res.data.video
    setData({
      ...data,
      title: title,
      desc: desc,
      thumbnail: thumbnail,
    })
  }
  useEffect(() => {
    getVideo(id)
  }, [id])
  return (
    <div className='back'>
      <div className='wrap'>
        <span className='close_btn' onClick={() => setUpdateVideo(false)}>
          <i className='fa-solid fa-xmark'></i>
        </span>
        <h1 className='topic'>Updating video</h1>
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
        <div className='divide'>
          <div className='updating-thumbnail'>
            <img src={`${BASE_URL + '/' + data.thumbnail}`} alt='thumbnail' />
          </div>
          <div>
            <label>Change thumbnail:</label>
            <input type='file' name='img' onChange={uploadThumbnail} />
          </div>
        </div>
        <label>Description:</label>
        <textarea
          type='text'
          placeholder='Something about this video'
          name='desc'
          onChange={handleChange}
          value={data.desc}
          className='text-area'
        />

        <div id='center'>
          <button className='btn-update' onClick={handleSubmit}>
            Update video
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdateVideo
