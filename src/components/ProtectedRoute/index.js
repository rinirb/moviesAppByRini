import {Component} from 'react'

import {Redirect, Route} from 'react-router-dom'

import Cookies from 'js-cookie'

class ProtectedRoute extends Component {
  render() {
    const requestToken = Cookies.get('request_token')

    return (
      <div>
        {requestToken === undefined ? (
          <Redirect to="/login" />
        ) : (
          <Route {...this.props} />
        )}
      </div>
    )
  }
}

export default ProtectedRoute
