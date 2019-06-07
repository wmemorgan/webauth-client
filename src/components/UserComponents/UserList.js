import React, { Component } from 'react'
import axios from 'axios'

class UserList extends Component {
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
        <h2>User List</h2>
        {this.state.status === 200 ?
          this.state.userList.map(user => (
            <div key={user.id}>
              {user.username}
            </div>
          )) :
          <div>{this.state.errorMessage}</div>
        }
      </>
    )
  }
}

export default UserList