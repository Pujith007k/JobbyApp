import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bgContainer">
        <div className="loginForm">
          <img
            className="webSiteLogo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt=" website logo"
          />
          <form className="fromContainer" onSubmit={this.submitForm}>
            <div className="inputContainer">
              <label className="username" htmlFor="userName">
                USERNAME
              </label>
              <input
                id="userName"
                type="text"
                className="usernameInput"
                onChange={this.onChangeUsername}
                value={username}
                placeholder="Username"
              />
            </div>
            <div className="inputContainer">
              <label className="username" htmlFor="passWord">
                PASSWORD
              </label>
              <input
                id="passWord"
                type="password"
                className="usernameInput"
                onChange={this.onChangePassword}
                value={password}
                placeholder="Password"
              />
            </div>
            <button type="submit" className="loginButton">
              Login
            </button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
