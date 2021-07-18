import {Component} from 'react'

import {withRouter, Link} from 'react-router-dom'

import {AiOutlineSearch, AiFillCloseCircle} from 'react-icons/ai'

import {CgPlayList, CgProfile} from 'react-icons/cg'

import './index.css'

class Navbar extends Component {
  state = {
    searchMovie: '',
    showSearchInputElement: false,
    onClickAvatarSmallDeviceShowStatus: false,
  }

  onClickAvatar = () => {
    const {history} = this.props
    history.push('/account')
  }

  onClickAvatarSmallDevice = () => {
    this.setState(previousState => ({
      onClickAvatarSmallDeviceShowStatus: !previousState.onClickAvatarSmallDeviceShowStatus,
    }))
  }

  onClickCloseIconSmallDevice = () => {
    this.setState({onClickAvatarSmallDeviceShowStatus: false})
  }

  onChangeSearchMovie = event => {
    const {onSearchMovie} = this.props
    this.setState({searchMovie: event.target.value})
    onSearchMovie(event.target.value)
  }

  onClickSearchIcon = () => {
    this.setState(previousState => ({
      showSearchInputElement: !previousState.showSearchInputElement,
    }))
  }

  onBlurSearchMovie = () => {
    const {searchMovie} = this.state
    if (searchMovie === '') {
      this.setState({showSearchInputElement: false})
    } else {
      this.setState({showSearchInputElement: true})
    }
  }

  render() {
    const {
      searchMovie,
      showSearchInputElement,
      onClickAvatarSmallDeviceShowStatus,
    } = this.state
    const {selectedPage} = this.props
    const searchInputClassName = showSearchInputElement
      ? 'navbar-show-input-element'
      : 'navbar-hide-input-element'
    const searchContainerClassName = showSearchInputElement
      ? 'navbar-search-container-show-input-element'
      : 'navbar-search-container-hide-input-element'

    const showAvatarClickListContainer = onClickAvatarSmallDeviceShowStatus
      ? 'navbar-show-avatar-list-container'
      : 'navbar-hide-avatar-list-container'

    const hideNavbarContentAccountClassName =
      selectedPage === 'account' ? 'navbar-hide' : null

    const hideNavbarContentLostYourWayClassName =
      selectedPage === 'lostYourWay' ? 'navbar-hide' : null

    const selectedTextHighlightHomeClassName =
      selectedPage === 'home' ? 'navbar-link-text-selected' : null
    const selectedTextHighlightPopularClassName =
      selectedPage === 'popular' ? 'navbar-link-text-selected' : null
    const selectedTextHighlightAccountClassName =
      selectedPage === 'account' ? 'navbar-link-text-selected' : null

    return (
      <>
        <div className="navbar-container-large-device">
          <nav className="navbar-container">
            <div className="navbar-links-container">
              <Link className="navbar-link-movies-title" to="/">
                <h1 className="navbar-movies-text">MOVIES</h1>
              </Link>
              <div
                className={`navbar-home-popular-container ${hideNavbarContentLostYourWayClassName}`}
              >
                <Link className="navbar-link" to="/">
                  <h1
                    className={`navbar-link-text ${selectedTextHighlightHomeClassName}`}
                  >
                    Home
                  </h1>
                </Link>

                <Link className="navbar-link" to="/popular">
                  <h1
                    className={`navbar-link-text ${selectedTextHighlightPopularClassName}`}
                  >
                    Popular
                  </h1>
                </Link>
              </div>
            </div>
            <div
              className={`navbar-search-containers ${hideNavbarContentLostYourWayClassName}`}
            >
              <div
                className={`${searchContainerClassName} ${hideNavbarContentAccountClassName}`}
              >
                <input
                  className={searchInputClassName}
                  type="text"
                  value={searchMovie}
                  onChange={this.onChangeSearchMovie}
                  onBlur={this.onBlurSearchMovie}
                />
                <AiOutlineSearch
                  className="navbar-search-icon"
                  onClick={this.onClickSearchIcon}
                />
              </div>
              <CgProfile
                className="navbar-avatar"
                onClick={this.onClickAvatar}
              />
            </div>
          </nav>
        </div>
        <div className="navbar-container-small-device">
          <nav className="navbar-container">
            <div className="navbar-links-container">
              <Link className="navbar-link" to="/">
                <h1 className="navbar-movies-text">MOVIES</h1>
              </Link>
            </div>

            <div
              className={`navbar-search-containers ${hideNavbarContentLostYourWayClassName}`}
            >
              <div
                className={`${searchContainerClassName} ${hideNavbarContentAccountClassName}`}
              >
                <input
                  className={searchInputClassName}
                  type="text"
                  value={searchMovie}
                  onChange={this.onChangeSearchMovie}
                  onBlur={this.onBlurSearchMovie}
                />
                <AiOutlineSearch
                  className="navbar-search-icon"
                  onClick={this.onClickSearchIcon}
                />
              </div>

              <CgPlayList
                className="navbar-avatar"
                onClick={this.onClickAvatarSmallDevice}
              />
            </div>
          </nav>
          <div className={showAvatarClickListContainer}>
            <ul className="navbar-small-device-link-text-container">
              <Link to="/" className="navbar-link">
                <li
                  className={`navbar-link-text ${selectedTextHighlightHomeClassName}`}
                >
                  Home
                </li>
              </Link>
              <Link to="/popular" className="navbar-link">
                <li
                  className={`navbar-link-text ${selectedTextHighlightPopularClassName}`}
                >
                  Popular
                </li>
              </Link>
              <Link to="/account" className="navbar-link">
                <li
                  className={`navbar-link-text ${selectedTextHighlightAccountClassName}`}
                >
                  Account
                </li>
              </Link>
            </ul>
            <button
              className="navbar-small-device-close-icon-container"
              type="button"
              onClick={this.onClickCloseIconSmallDevice}
            >
              <AiFillCloseCircle />
            </button>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(Navbar)
