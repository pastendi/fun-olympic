import React from 'react'
import logo from '../../../assests/images/final-logo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAppContext } from '../../../context/appContext'
import menu from '../../admin/utils/menu'
import './style.css'

const Navbar = () => {
  const { user, logoutUser, userDropdown, toggleModel, toggleUserDropdown } =
    useAppContext()
  const navigate = useNavigate()
  const favoriteClicked = () => {
    toggleUserDropdown({ toggle: false })
    navigate('/favorite')
  }
  const logoutClicked = () => {
    logoutUser()
    toggleUserDropdown({ toggle: false })
    navigate('/')
  }
  return (
    <nav className='fix'>
      <div className='contact_link'>
        <div className='contact'>
          <ul class='list-inline'>
            <li>
              <i className='fa fa-phone'></i> Call us: 98635154545
            </li>
            <li>
              <i className='fa fa-envelope'></i> Contact us: tendi322@email.com
            </li>
          </ul>
        </div>
        <div className='social'>
          <ul className='list-inline'>
            <li>
              <i className='fa-brands fa-facebook'></i>
            </li>
            <li>
              <i className='fa-brands fa-facebook-messenger'></i>
            </li>
            <li>
              <i className='fa-brands fa-twitter'></i>
            </li>
            <li>
              <i className='fa-brands fa-instagram'></i>
            </li>
          </ul>
        </div>
      </div>
      <div className='navbar'>
        <div className='combine'>
          <div className='logo'>
            <img src={logo} alt='logo' />
          </div>
          <div className='org-name'>
            Fun <br />
            Olympic
          </div>
        </div>
        <div className='menu'>
          {menu.map((link) => {
            const { text, path, id } = link
            return (
              <NavLink
                to={path}
                key={id}
                className={({ isActive }) =>
                  isActive ? 'menu-link active' : 'menu-link'
                }
              >
                {text}
              </NavLink>
            )
          })}
        </div>
        {user ? (
          <div className='user_control'>
            <button onClick={() => toggleUserDropdown({ toggle: true })}>
              {user}
              <i className='fas fa-caret-down'></i>
            </button>
            {userDropdown && (
              <div className='user-dropdown'>
                <p onClick={() => favoriteClicked()}>Favorite</p>
                <p onClick={() => logoutClicked()}>Logout</p>
              </div>
            )}
          </div>
        ) : (
          <div className='user_control'>
            <button onClick={() => toggleModel()}>Login</button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
