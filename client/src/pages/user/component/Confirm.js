import React from 'react'
import { useAppContext } from '../../../context/appContext'

const Confirm = ({ setConfirmation }) => {
  const { toggleModel } = useAppContext()
  const answerYes = () => {
    toggleModel()
    setConfirmation(false)
  }
  const answerNo = () => {
    setConfirmation(false)
  }
  return (
    <div className='confirm'>
      <h1>You need to be logged in in order to watch this video</h1>
      <h2>Do you want to login?</h2>
      <p>
        <button className='yes' onClick={() => answerYes()}>
          Yes
        </button>
        <button className='no' onClick={() => answerNo()}>
          No
        </button>
      </p>
    </div>
  )
}

export default Confirm
