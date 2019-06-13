import React, { Component } from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'
import { EventEmitter } from './utils/events'

import Login from './components/AuthComponents/Login'
import Register from './components/AuthComponents/Register'
import UserList from './components/UserComponents/UserList'
import User from './components/UserComponents/User'

class Routes extends Component { 
  constructor(props) {
    super(props)
    this.state = {
      status: null,
      userList: [],
      errorMessage: ''
    }
    EventEmitter.subscribe('getData', event => this.getDataHandler(event))
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

  getDataHandler = () => {
    const token = localStorage.getItem('jwt')
    console.log(`Is there a token: `, token)
    if (token) {
      this.getData()
    }
  }

  componentDidMount() {
    if (this.state.userList.length === 0) {
      this.getDataHandler()
    }
  }

  render() {
    return (
      <>
        <Route path='/signin' component={Login} />
        <Route path='/signup' component={Register} />
        <Route 
          exact path='/'
          render={() => localStorage.getItem('jwt') ? <Redirect to={{ pathname: '/users', state: {...this.state} }}/> : <Redirect to='/signin'/>}
        />
        <Route 
          exact path='/users'
          render={props => <UserList {...props} {...this.state} />}
        />
        {this.state.userList.map(user => (
          <Route 
           key={user.id}
           path={`/users/${user.id}`}
           render={props => 
            <User {...props} {...this.state} user={user} />
          }
          />
        ))}
      </>
    )
  }
}

export default withRouter(Routes)