import './Sidebar.css'
import Logo from './Logo'
import links from '../../utils/navLinks'
import { NavLink } from 'react-router-dom'
import { useAppContext } from '../../../../context/appContext'
const Sidebar = () => {
  const { logoutUser, setWindow } = useAppContext()
  return (
    <div className='sidebar'>
      <div className='org'>
        <Logo />
        <div className='name'>
          Fun <br /> olympic
        </div>
      </div>
      <div className='sidenav'>
        {links.map((link) => {
          const { text, path, id, icon } = link
          return (
            <NavLink
              to={path}
              key={id}
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
              onClick={() => setWindow(text)}
            >
              <span className='icon'>{icon}</span>
              {text}
            </NavLink>
          )
        })}
        <button
          onClick={() => logoutUser()}
          className='
        logout-admin'
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar
