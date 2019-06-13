import React from 'react'
import axios from 'axios'

// Pass authentication token to API call
axios.interceptors.request.use(
  function(requestConfig) {
    requestConfig.headers.authorization = localStorage.getItem('jwt')
    return requestConfig
  },
  function(error) {
    return Promise.reject(error)
  }
)

// Display component if user has been authenticated
const Authenticated = Component => {
  return class extends React.Component {
    render () {
      const token = localStorage.getItem('jwt')
      return (
        <>
          {token ? 
            <Component {...this.props} /> :
            <h1>Please login to access page.</h1>
          }
        </>
      )
    }
  }
}

export default Authenticated