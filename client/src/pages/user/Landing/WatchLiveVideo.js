import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../../../context/appContext'
import Confirm from '../component/Confirm'
import './style.css'
import { BASE_URL } from '../../constant'
import io from 'socket.io-client'

var socket

const WatchLiveVideo = () => {
  const [chats, setChats] = useState([])
  const { id } = useParams()
  const [confirmation, setConfirmation] = useState(false)
  const { user, email } = useAppContext()
  const [chat, setChat] = useState('')
  const [data, setData] = useState({ videoId: '', user: '', message: '' })
  const [video, setVideo] = useState({
    _id: useParams(),
    title: '',
    url: '',
    desc: '',
    thumbnail: '',
  })
  const findVideo = async () => {
    try {
      const res = await axios.get(`/api/live/find/${id}`)
      const { title, url, thumbnail, desc } = res.data.video
      setVideo({
        ...video,
        title: title,
        url: url,
        desc: desc,
        thumbnail: thumbnail,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const addChat = async () => {
    await axios.post(`/api/chats`, { user: email, message: chat, videoId: id })
    socket.emit('newChat', chat)
    setChat('')
  }
  const getChats = async () => {
    const res = await axios.get(`/api/chats/${id}`)
    setChats(res.data.chats)
  }
  useEffect(() => {
    socket = io(BASE_URL)
    findVideo()
    getChats()
  }, [])
  useEffect(() => {
    socket.on('newMessage', (message) => {
      getChats()
    })
  })
  return (
    <>
      {confirmation && <Confirm setConfirmation={setConfirmation} />}
      <div className='live-window'>
        <div className='video-window'>
          <div className='live-frame'>
            <ReactPlayer
              controls
              url={video.url}
              width='100%'
              height='100%'
              playing={true}
            />
          </div>
          <div className='v-title'>{video.title}</div>
          <p className='v-desc'>
            <p className='video-heading'>Description</p>
            {video.desc}
          </p>
        </div>
        <div className='chat-window'>
          <div className='chat'>
            {chats.map((x) => {
              return (
                <div key={x._id}>
                  <h5>{x.user}</h5>
                  <br />
                  {x.message}
                </div>
              )
            })}
          </div>
          <input
            type='text'
            name='chat'
            value={chat}
            onChange={(e) => setChat(e.target.value)}
          />
          <button className='chat-btn' onClick={() => addChat()}>
            Send <i class='fa-solid fa-paper-plane'></i>
          </button>
        </div>
      </div>
    </>
  )
}

export default WatchLiveVideo
