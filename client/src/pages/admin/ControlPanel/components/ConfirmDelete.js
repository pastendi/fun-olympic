import axios from 'axios'
import { useNavigate } from 'react-router'
import './style.css'

const ConfirmDelete = ({ id, setDeleting }) => {
  const navigate = useNavigate()

  const yesCondition = async () => {
    try {
      console.log(id)
      const res = await axios.delete(`/api/live/${id}`)
      setDeleting(false)
      navigate('/admin/videos')
    } catch (err) {
      console.error('Failed to delete file', err)
    }
  }
  const noCondition = () => {
    setDeleting(false)
  }
  return (
    <div className='back'>
      <div className='wrap'>
        <h1>Are you sure you want to delete this live video?</h1>
        <div className='delete-option'>
          <button className='btn btn-upload' onClick={() => yesCondition()}>
            Yes
          </button>
          <button className='btn btn-delete' onClick={() => noCondition()}>
            No
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDelete
