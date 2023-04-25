import { IoBarChartSharp } from 'react-icons/io5'
import { BiCustomize, BiReset } from 'react-icons/bi'
import { FaPhotoVideo, FaRegNewspaper } from 'react-icons/fa'
import { AiOutlineMessage } from 'react-icons/ai'
import { FiUsers } from 'react-icons/fi'

const navLinks = [
  { id: 1, text: 'Dashboard', path: '/admin/', icon: <IoBarChartSharp /> },
  {
    id: 2,
    text: 'Customization',
    path: '/admin/customization',
    icon: <BiCustomize />,
  },
  { id: 3, text: 'Users', path: '/admin/users', icon: <FiUsers /> },
  { id: 3, text: 'Videos', path: '/admin/videos', icon: <FaPhotoVideo /> },
  { id: 4, text: 'News', path: '/admin/news', icon: <FaRegNewspaper /> },
  {
    id: 5,
    text: 'Message',
    path: '/admin/message',
    icon: <AiOutlineMessage />,
  },
  {
    id: 6,
    text: 'Reset password',
    path: '/admin/reset-password',
    icon: <BiReset />,
  },
]

export default navLinks
