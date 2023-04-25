import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import './style.css'

const ReadMessage = ({ message, setSelected }) => {
  const [reply, setReply] = useState('')
  const [sendingReply, setSendingReply] = useState(false)
  const submitReply = () => {
    const user = message.from
    const text = reply
    const res = axios.post('/api/mail/reply', { user, text })
    const response = axios.patch(`/api/mail/${message._id}`, { reply })
    setSendingReply(false)
  }
  return (
    <div className='back'>
      <div className='wrap '>
        <div className='read-message'>
          <span className='close_btn' onClick={() => setSelected(false)}>
            <i className='fa-solid fa-xmark'></i>
          </span>
          <p className='subject'>
            <span className='topic'>Subject: </span>
            <span className='content'>{message.subject}</span>
          </p>
          <p>From: {message.from}</p>
          <div className='message'>
            <h5>Message</h5>
            <p>{message.message}</p>
          </div>
          {message.reply === '' || (
            <div className='message'>
              <h5>Replied:</h5>
              <p>{message.reply}</p>
            </div>
          )}
          <button
            className=' btn main-btn'
            onClick={() => setSendingReply(true)}
          >
            Reply
          </button>
          {sendingReply && (
            <div className='reply'>
              <textarea
                name='reply'
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              ></textarea>
              <button onClick={() => submitReply()}>send reply</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReadMessage
