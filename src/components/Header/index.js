import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  const onBackHome = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <nav className="navBar">
      <Link to="/" className="nav-link">
        <img
          className="navBarLogo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <div className="headeroptions">
        <Link to="/" className="nav-link">
          <h4 className="option">Home</h4>
        </Link>
        <Link to="/jobs" className="nav-link">
          <h4 className="option">Jobs</h4>
        </Link>
      </div>
      <Link to="/login" className="nav-link">
        <button type="button" className="logout" onClick={onClickLogout}>
          Logout
        </button>
      </Link>
    </nav>
  )
}
export default withRouter(Header)
