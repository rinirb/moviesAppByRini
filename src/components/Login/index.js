import {Component} from 'react'

import Cookies from 'js-cookie'

import MoviesLogo from '../MoviesLogo'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', statusMessage: '', errorSignIn: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccess = requestToken => {
    const {history} = this.props
    const {username, password} = this.state
    Cookies.set('request_token', requestToken, {expires: 30})
    Cookies.set('username', username, {expires: 30})
    Cookies.set('password', password, {expires: 30})
    history.replace('/')
  }

  onFailure = statusMessage => {
    this.setState({statusMessage, errorSignIn: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const urlForRequestToken =
      'https://api.themoviedb.org/3/authentication/token/new?api_key=c06d8d65ccfbe1695147635adf8a5100'

    const optionsForRequestToken = {
      method: 'GET',
    }

    const responseInitial = await fetch(
      urlForRequestToken,
      optionsForRequestToken,
    )

    const dataInitial = await responseInitial.json()

    let requestTokenInitial
    if (responseInitial.ok === true) {
      requestTokenInitial = dataInitial.request_token
    } else {
      this.onFailure(dataInitial.status_message)
    }

    const url =
      'https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=c06d8d65ccfbe1695147635adf8a5100'
    const userDetails = {
      username,
      password,
      request_token: requestTokenInitial,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
        'Content-type': 'application/json',
      },
    }
    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok === true) {
      this.onSuccess(data.request_token)
    } else {
      this.onFailure(data.status_message)
    }
  }

  render() {
    const {username, password, statusMessage, errorSignIn} = this.state
    return (
      <div className="login-form-bg-container">
        <MoviesLogo />
        <div className="login-form-container">
          <form className="login-form-element" onSubmit={this.onSubmitForm}>
            <h1 className="login-form-sign-in-title">Sign in</h1>
            <label className="login-form-label-element" htmlFor="username">
              USERNAME
            </label>
            <br />
            <input
              className="login-form-input-element"
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={this.onChangeUsername}
            />
            <br />
            <label className="login-form-label-element" htmlFor="password">
              PASSWORD
            </label>
            <br />
            <input
              className="login-form-input-element"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={this.onChangePassword}
            />
            <br />
            {errorSignIn && (
              <p className="login-error-message">{statusMessage}</p>
            )}
            <div className="input-form-button-container">
              <button className="input-form-sign-in-button" type="submit">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
