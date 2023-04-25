import './Navbar.css'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { useAppContext } from '../../../../context/appContext'
const Navbar = () => {
  const { window } = useAppContext()
  return (
    <div className='nav'>
      <div>
        <FaAlignLeft className='bar' />
        <span className='activeNav'>{window}</span>
      </div>
      <div className='user'>
        <FaUserCircle className='user-circle' />
        <p className='greeting'>
          Welcome <br />
          Admin
        </p>
      </div>
    </div>
  )
}

export default Navbar
