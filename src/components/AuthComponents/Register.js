import React, { Component } from 'react'
import axios from 'axios' /** External API calls only **/
//import { connect } from 'react-redux' /** Redux only **/
import { EventEmitter } from '../../utils/events'

import * as S from '../SharedComponents/FormStyles'
import Button from '../DesignComponents/Button'

//import {  } from '../../actions' /** Redux only **/

class Form extends Component {
  state = {
    id: '',
    username: '',
    password: '',
    department: '',
    status: null,
    errorMesage: ''
  }

  handleInput = e => {
    this.setState({ [e.target.id]: e.target.value });
  }

  addData = async e => {
    // prevent default
    e.preventDefault()

    // gather form data
    let newRecord = {
      username: this.state.username,
      password: this.state.password,
      department: this.state.department
    }

    // send new record to api
    try {
      let endpoint = '/auth/register'
      let data = await axios.post(endpoint, newRecord)
      localStorage.setItem('jwt', data.data.token)
      this.setState({ status: data.status })
    }
    catch (err) {
      console.error(err.response)
      this.setState({ 
        status: err.status,
        errorMessage: err.response.data.message 
      })
    }

    // reset form fields
    this.setState({
      username: '',
      password: '',
      department: ''
    })
    
    EventEmitter.dispatch('getData')
    this.props.history.push('/users') /** React-Router only **/
  }

  submitHandler = e => {
    e.preventDefault()
    if (this.props.update) {
      this.updateRecord(e)
    } else if (this.props.delete) {
      this.deleteData(e)
    } else {
      this.addData(e)
    }
  }

  componentDidMount() {
    if(this.props.update) {
      this.prePopulateForm(this.props.id)
    }
  }

  render() {
    return (
      <S.FormContainer {...this.props}>
        <div className="windowFrame"></div>
        <form onSubmit={this.submitHandler}>
          {(this.props.update || this.props.delete) &&
            <input name="id" type="number"
              placeholder="ID" onChange={this.handleInput}
              value={this.state.id}
            />
          }
          {!this.props.delete && (
            <main>
              <label htmlFor="username"/>  
              <input id="username" type="text"
                placeholder="Username" onChange={this.handleInput}
                value={this.state.username}
                required
              />
              <label htmlFor="password" />
              <input id="password" type="password"
                placeholder="Password" onChange={this.handleInput}
                value={this.state.password}
                required
              />
              <label htmlFor="department" />
              <input id="department" type="text"
                placeholder="Department" onChange={this.handleInput}
                value={this.state.department}
                required
              />
            </main>
          )}
          <Button type="submit" {...this.props}>Sign Up</Button>
        </form>
      </S.FormContainer>
    )
  }
}

export default Form

/** Redux only **/
// export default connect(null, { 
//   addData: '', 
//   updateData: '',
//   deleteData: ''
// })(Form)