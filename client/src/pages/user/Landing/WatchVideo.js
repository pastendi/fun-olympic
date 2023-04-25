import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../../../context/appContext'
import './style.css'

const WatchVideo = () => {
  const [comments, setComments] = useState([])
  const { id } = useParams()
  const [isFavorite, setIsFavorite] = useState(false)
  const [newComment, setNewComment] = useState('')
  const { user, email } = useAppContext()
  const [video, setVideo] = useState({
    _id: id,
    title: '',
    url: '',
    desc: '',
    thumbnail: '',
    likes: 0,
    dislikes: 0,
  })
  const addToFavorite = async () => {
    await axios.patch(`/api/user/addfavorite/${id}`, { email })
    setIsFavorite(true)
  }
  const removeFromFavorite = async () => {
    await axios.patch(`/api/user/removefavorite/${id}`, { email })
    setIsFavorite(false)
  }
  const getFavorites = async () => {
    try {
      const res = await axios.post('/api/user/favorites', { email })
      const userFavorites = res.data.favorites
      userFavorites.includes(id) ? setIsFavorite(true) : setIsFavorite(false)
    } catch (error) {
      console.log(error)
    }
  }
  const getComments = async () => {
    try {
      const res = await axios.get(`/api/comments/${id}`)
      setComments(res.data.comments)
    } catch (error) {
      console.log(error)
    }
  }
  const sendComment = async () => {
    try {
      const res = await axios.post('/api/comments', {
        user: email,
        videoId: id,
        comment: newComment,
      })
      getComments()
      setNewComment('')
    } catch (error) {
      console.log(error)
    }
  }

  const findVideo = async () => {
    try {
      const res = await axios.get(`/api/videos/find/${id}`)
      const { title, url, desc, likes, dislikes } = res.data.video
      setVideo({
        ...video,
        title: title,
        url: url,
        desc: desc,
        likes: likes,
        dislikes: dislikes,
      })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    findVideo()
    getComments()
    getFavorites()
  }, [])
  return (
    <>
      <div className='main-window'>
        <div className='watch-video'>
          <ReactPlayer
            controls
            url={video.url}
            width='100%'
            height='100%'
            playing={true}
          />
        </div>
        <div>
          {isFavorite ? (
            <button
              className='btn-favorite-remove'
              onClick={() => removeFromFavorite()}
            >
              Remove favorite
            </button>
          ) : (
            <button
              className='btn-favorite-add'
              onClick={() => addToFavorite()}
            >
              Add favorite
            </button>
          )}
        </div>
        <div className='v-title'>{video.title}</div>
        <p className='v-desc'>
          <p className='video-heading'>Description</p>
          {video.desc}
        </p>
        <div className='newComment'>
          <input
            type='text'
            name='newComment'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={() => sendComment()}>send comment</button>
        </div>
        {comments.length > 0 && (
          <div className='comments'>
            {comments.map((comment) => {
              return (
                <div className='comment' key={comment._id}>
                  <p className='comment-user'>{comment.user}</p>
                  <p className='comment-message'>{comment.comment}</p>
                </div>
              )
            })}
            <p className='video-heading'>Comments</p>
          </div>
        )}
      </div>
    </>
  )
}

export default WatchVideo
