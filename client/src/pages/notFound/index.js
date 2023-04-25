import { Link } from 'react-router-dom'
import img from './../../assests/images/not-found.svg'
import './style.css'

const NotFound = () => {
  return (
    <div>
      <img src={img} alt='not found' />
      <h3>Ohh! page not found</h3>
      <p>We can't seem to find the page you're looking for</p>
      <Link to='/'>
        <button>Back home</button>
      </Link>
    </div>
  )
}

export default NotFound
