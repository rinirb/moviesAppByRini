import {Component} from 'react'

import {Link} from 'react-router-dom'

import Navbar from '../Navbar'

import './index.css'

class LostYourWay extends Component {
  render() {
    return (
      <div className="lost-your-way-bg-container">
        <div className="lost-your-way-navbar-container">
          <Navbar />
        </div>
        <div className="lost-your-way-container">
          <h1 className="lost-your-way-title">Lost Your Way ?</h1>
          <p className="lost-your-way-description">
            Sorry, we can&apos;t find that page. You&apos;ll find lots to
            explore on the home page.
          </p>
          <Link to="/" className="lost-your-way-netflix-home-button-link">
            <button className="lost-your-way-netflix-home-button" type="button">
              Netflix Home
            </button>
          </Link>
          <div className="lost-your-way-error-message-container">
            <p className="lost-your-way-error-message-title">
              Error code
              <span className="lost-your-way-error-message-code">NSES-404</span>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default LostYourWay
