import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './index.css'
import UploadImage from './components/UploadImage'
import DeleteImage from './components/DeleteImage'
import { BASE_URL } from '../../constant'
const Customization = () => {
  const [images, setImages] = useState([])
  const [imageId, setImageId] = useState('')
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [profile, setProfile] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [change, setChange] = useState(false)
  const fetchImages = async () => {
    try {
      const res = await axios.get('/api/carousel')
      setImages(res.data.result)
    } catch (error) {
      console.log(error)
    }
  }

  const openUploadModel = (id) => {
    setImageId(id)
    setUploading(true)
  }
  const openDeleteModel = (id) => {
    setImageId(id)
    setDeleting(true)
  }
  const fetchAbout = async () => {
    try {
      const res = await axios.get(`/api/about/`)
      setTitle(res.data.about.title)
      setDesc(res.data.about.desc)
      setProfile(res.data.about.profile)
    } catch (error) {
      console.log(error)
    }
  }
  const saveAbout = async () => {
    const formData = new FormData()
    formData.append('title', title)
    formData.append('desc', desc)
    formData.append('image', imageFile)
    try {
      await axios({
        method: 'patch',
        baseURL: `/api/about/`,
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData,
      })
      setChange(!change)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchImages()
  }, [uploading, deleting])
  useEffect(() => {
    fetchAbout()
  }, [change])
  return (
    <>
      {uploading && <UploadImage setUploading={setUploading} id={imageId} />}
      {deleting && <DeleteImage setDeleting={setDeleting} id={imageId} />}
      <div className='admin-carousel'>
        <h2 className='customization-title'>Manage carousel images</h2>
        <div className='images'>
          {images.map((carousel) => {
            if (carousel.image === '') {
              return (
                <div className='empty' key={carousel._id}>
                  <button onClick={() => openUploadModel(carousel._id)}>
                    Upload
                  </button>
                </div>
              )
            }
            return (
              <div className='carousel-image' key={carousel._id}>
                <i
                  className='fa-solid fa-trash-can delete-icon'
                  onClick={() => openDeleteModel(carousel._id)}
                ></i>
                <img
                  src={`${BASE_URL + '/' + carousel.image}`}
                  alt='carousel-image'
                />
                <div className='carousel-name'>{carousel.name}</div>
              </div>
            )
          })}
        </div>
      </div>
      <div>
        <div className='customization'>
          <div>
            <h2 className='customization-title'>About this website</h2>
            <div className='admin-about'>
              <div>
                <label>Title</label>
                <br />
                <input
                  type='text'
                  name='title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  id='input-black'
                />
              </div>
              <div>
                <label>Description</label>
                <br />
                <textarea
                  name='desc'
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                ></textarea>
              </div>
              <div>
                <label>Do you want to change current about page image?</label>
                <input
                  type='file'
                  name='imageFile'
                  onChange={(e) => setImageFile(e.target.files[0])}
                ></input>
              </div>
            </div>
          </div>
          <div className='current-profile'>
            <h3>Current about picture</h3>
            <div className='picture'>
              <img src={`${BASE_URL + '/' + profile}`} alt='current picture' />
            </div>
          </div>
        </div>
        <div>
          <button onClick={() => saveAbout()}>Save</button>
        </div>
      </div>
    </>
  )
}

export default Customization
