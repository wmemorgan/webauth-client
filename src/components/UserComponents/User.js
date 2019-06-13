import React, { Component } from 'react';
import axios from 'axios'
import { EventEmitter } from '../../utils/events'

import * as S from './UserStyles'
import Button from '../DesignComponents/Button'

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false
    }
  }

  prePopulateForm = () => {
    const { username, department } = this.props.user
    this.setState({
      username,
      department
    })
  }

  inputChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  toggleEdit() {
    this.setState(prevState => (
      { edit: !prevState.edit }
    ),
      () => this.prePopulateForm()
    )

  }

  updateUser = async () => {
    // gather updated data
    let updatedData = {
      username: this.state.username,
      department: this.state.department
    }
    // send updated record to api
    // let endpoint = '/user'
    // axios.put(`${endpoint}/${this.state.id}`, updatedData)
    //   .then(response => {
    //     this.props.updateList(response.data)
    //     this.toggleEdit()
    //   })
    //   .catch(err => console.log(err))

    try {
      let endpoint = '/users'
      let data = await axios.put(`${endpoint}/${this.state.id}`, updatedData)
      if (data) {
        this.toggleEdit()
        // reset form fields
        this.setState({
          id: this.props.user.id,
          username: '',
          department: ''
        })
        EventEmitter.dispatch('getData')  
      }
    }
    catch (err) {
      console.error(err.response)
      this.setState({
        status: err.status,
        errorMessage: err.response.data.message
      })
    }

    console.log(`Form submitted data sent: ${JSON.stringify(updatedData)}`)
  }

  deleteUser = async id => {
    try {
      let endpoint = '/users'
      let data = await axios.delete(`${endpoint}/${id}`)
      if (data) {
        console.log(`${this.state.username} successfully deleted`)
        // reset form fields
        this.setState({
          username: '',
          password: ''
        })
        EventEmitter.dispatch('getData')
        this.props.history.push('/users')
      }
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
    this.setState({
      id: this.props.user.id,
      username: '',
      department: '',
      status: null,
      errorMesage: ''
    })
  }

  render() {
    const { id, username, department} = this.props.user
    return (
      <>
        <S.UserInfoContainer>
          <header>
            <i className="far fa-edit" onClick={() => this.toggleEdit()}>
            </i>
            <i className="fa fa-trash"
              onClick={() => this.props.deleteUser(id)}>
            </i>
          </header>
          <div className="user-info">
            {!this.state.edit ?
              <h3 className="stat-data">{username}</h3> :
              <input name="username" type="text"
                placeholder="Username" onChange={this.inputChangeHandler}
                value={this.state.username}
              />
            }
            <div className="user-stats">
              <div className="stat-category">Department:</div>
              {!this.state.edit ?
                <div className="stat-data">{department}</div> :
                <input name="department" type="text"
                  placeholder="Department" onChange={this.inputChangeHandler}
                  value={this.state.department}
                />
              }
            </div>
            <S.ButtonMenu {...this.state} onClick={() => this.updateUser()}>
              <Button update>Update</Button>
            </S.ButtonMenu>

          </div>
        </S.UserInfoContainer>
      </>
    )
  }
}

export default User;

