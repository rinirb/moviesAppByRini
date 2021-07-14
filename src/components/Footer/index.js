import {Component} from 'react'

import {
  AiOutlineGoogle,
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineYoutube,
} from 'react-icons/ai'

import './index.css'

class Footer extends Component {
  render() {
    return (
      <div className="footer-bg-container">
        <div>
          <AiOutlineGoogle className="footer-social-media-icon" />
          <AiOutlineTwitter className="footer-social-media-icon" />
          <AiOutlineInstagram className="footer-social-media-icon" />
          <AiOutlineYoutube className="footer-social-media-icon" />
        </div>
        <p className="footer-contact-us-text">Contact Us</p>
      </div>
    )
  }
}

export default Footer
