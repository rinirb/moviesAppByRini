import {Component} from 'react'

import Cookies from 'js-cookie'

import Navbar from '../Navbar'

import './index.css'

class Account extends Component {
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('request_token')
    Cookies.remove('username')
    Cookies.remove('password')
    history.replace('/login')
  }

  render() {
    const username = Cookies.get('username')
    const password = Cookies.get('password')
    const passwordLength = password.length
    const hiddenPassword = '*'.repeat(passwordLength)

    return (
      <div className="account-bg-container">
        <div className="account-navbar-container">
          <Navbar selectedPage="account" />
        </div>
        <div className="account-details-bg-container">
          <h1 className="account-details-title">Account</h1>
          <hr className="account-details-horizontal-line" />
          <div className="account-details-membership-container">
            <div className="account-details-membership-email-container">
              <h1 className="account-details-membership-plan-title">
                Member ship
              </h1>
            </div>
            <div className="account-details-membership-details-container">
              <h1 className="account-details-email-plan">{username}</h1>
              <h1 className="account-details-password">
                Password: {hiddenPassword}
              </h1>
            </div>
          </div>
          <hr className="account-details-horizontal-line" />
          <div className="account-details-plan-container">
            <h1 className="account-details-membership-plan-title">
              Plan details
            </h1>
            <p className="account-details-email-plan">Premium</p>
            <button className="account-details-plan-button" type="button">
              Ultra HD
            </button>
          </div>
          <hr className="account-details-horizontal-line" />
          <div className="account-details-logout-button-container">
            <button
              className="account-details-logout-button"
              type="button"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Account
