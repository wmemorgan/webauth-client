import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import axios from 'axios'

import Login from './components/SharedComponents/Login'
import UserList from './components/UserComponents/UserList'

class Routes extends Component { 
  constructor(props) {
    super(props)
    this.state = {
      status: null,
      userList: [],
      errorMessage: ''
    }
  }

  getData = async () => {
    try {
      let data = await axios.get('http://192.168.254.5:5000/api/users')
      console.log(`data is: `, data.data)
      this.setState({
        status: data.status,
        userList: data.data
      })
    }
    catch (err) {
      console.error(err.response)
      this.setState({
        status: err.status,
        errorMessage: err.response.data.message
      })
    }
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    return (
      <>
        <Route path='/login' component={Login} />
        <Route 
          exact path='/'
          render={props => <UserList {...props} {...this.state} />}
        />
      </>
    )
  }
}

export default withRouter(Routes)