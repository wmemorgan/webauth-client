import React, { Component } from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'

import Login from './components/AuthComponents/Login'
import Register from './components/AuthComponents/Register'
import UserList from './components/UserComponents/UserList'

const token = localStorage.getItem('jwt')
console.log(`Is there a token: `, token)
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
      let endpoint = '/users'
      let data = await axios.get(endpoint)
      console.log(`getData`, data)
      this.setState({
        status: data.status,
        userList: data.data
      }, () => console.log(this.state.status))
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
    if (token && this.state.userList.length === 0) {
      this.getData()
    }
  }

  render() {
    return (
      <>
        <Route path='/signin' component={Login} />
        <Route path='/signup' component={Register} />
        <Route 
          exact path='/'
          render={() => token ? <Redirect to={{ pathname: '/users', state: {...this.state} }}/> : <Redirect to='/signin'/>}
        />
        <Route 
          path='/users'
          render={props => <UserList {...props} {...this.state} />}
        />
      </>
    )
  }
}

export default withRouter(Routes)