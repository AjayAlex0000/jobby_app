import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
import {AiFillHome} from 'react-icons/ai'
import {MdBusinessCenter} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="Header-container">
      <div className="header-content-container">
        <div className="nav-bar-large-container">
          <Link to="/">
            <img
              className="header-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>

          <ul className="navigation-list-container">
            <Link className="nav-link" to="/">
              <li className="navigation-list-item">Home</li>
            </Link>
            <Link className="nav-link" to="/jobs">
              <li className="navigation-list-item">Jobs</li>
            </Link>
          </ul>
          <button onClick={onClickLogout} className="logout-btn" type="button">
            Logout
          </button>
        </div>
        <div className="nav-bar-sm-container">
          <Link className="nav-link" to="/">
            <img
              className="header-logo-sm"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>

          <ul className="navigation-list-container-sm">
            <Link className="nav-link" to="/">
              <li className="navigation-list-item-sm">
                <AiFillHome />
              </li>
            </Link>
            <Link className="nav-link" to="/jobs">
              <li className="navigation-list-item-sm">
                <MdBusinessCenter />
              </li>
            </Link>

            <button
              onClick={onClickLogout}
              className="navigation-list-item-sm-btn"
              type="button"
            >
              <li className="navigation-list-item-sm">
                <FiLogOut />
              </li>
            </button>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Header)
