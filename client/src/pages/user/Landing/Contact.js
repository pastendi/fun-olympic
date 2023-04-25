import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Contact = () => {
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const nav = useNavigate()
  const sendMessage = async () => {
    try {
      await axios.post('/api/mail', { from: email, subject, message })
    } catch (error) {
      console.log(error)
    }
    setEmail('')
    setMessage('')
    setSubject('')
    toast('Message send successfully')
  }
  return (
    <div className='contact-us'>
      <h1>Contact Us</h1>
      <p>
        If there is anything you want say or request us thus, you can simple
        send as an email from here
      </p>
      <div>
        <input
          type='email'
          name='email'
          value={email}
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type='text'
          name='subject'
          value={subject}
          placeholder='subject'
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div>
        <textarea
          type='text'
          name='message'
          value={message}
          placeholder='Your message'
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button onClick={() => sendMessage()}>send message</button>
      <ToastContainer type='success' position='top-center' autoClose={1000} />
    </div>
  )
}

export default Contact
