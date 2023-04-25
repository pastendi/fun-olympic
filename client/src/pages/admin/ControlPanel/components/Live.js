import { useAppContext } from '../../../../context/appContext'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ConfirmDelete from './ConfirmDelete'
import AddLiveVideo from './AddLiveVideo'
import ViewChat from './ViewChat'
import { BASE_URL } from '../../../constant'
import './style.css'
const Live = () => {
  const [videos, setVideos] = useState([])
  const [videoId, setVideoId] = useState('')
  const [addLiveVideo, setAddLiveVideo] = useState(false)
  const [viewChat, setViewChat] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const getAllLiveVideos = async () => {
    try {
      const res = await axios.get('/api/live')
      setVideos(res.data.liveVideos)
    } catch (error) {
      console.log(error)
    }
  }
  const selectedLive = (id) => {
    setVideoId(id)
    setViewChat(true)
  }
  const openDeleteModel = (id) => {
    setVideoId(id)
    setDeleting(true)
  }
  useEffect(() => {
    getAllLiveVideos()
  }, [deleting])
  return (
    <>
      {viewChat && <ViewChat setViewChat={setViewChat} id={videoId} />}
      <div>
        <button className='add-video' onClick={() => setAddLiveVideo(true)}>
          Add live video
        </button>
      </div>
      {addLiveVideo && <AddLiveVideo setAddLiveVideo={setAddLiveVideo} />}
      {deleting && <ConfirmDelete setDeleting={setDeleting} id={videoId} />}
      <div id='live'>
        <div className='grid3'>
          {videos.map((video) => {
            console.log(video)
            return (
              <div className='video-item' key={video._id}>
                <div className='video-thumbnail'>
                  <button
                    className='view-chat'
                    onClick={() => selectedLive(video._id)}
                  >
                    View chats
                  </button>
                  <i
                    className='fa-solid fa-trash-can delete-icon'
                    onClick={() => openDeleteModel(video._id)}
                  ></i>
                  <img src={BASE_URL + '/' + video.thumbnail} alt='thumbnail' />
                </div>
                <p id='video-title'>{video.title}</p>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Live
