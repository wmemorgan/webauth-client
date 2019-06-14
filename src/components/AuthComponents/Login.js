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
    status: null,
    greeting: '',
    errorMesage: ''
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  addData = async e => {
    // prevent default
    e.preventDefault()

    // gather form data
    let credentials = {
      username: this.state.username,
      password: this.state.password
    }

    // send new record to api
    try {
      let endpoint = '/auth/login'
      let data = await axios.post(endpoint, credentials)
      localStorage.setItem('jwt', data.data.token)
      this.setState({ 
        status: data.status,
        greeting: data.data.message,
        errorMessage: '' 
      })
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
      password: ''
    })
    EventEmitter.dispatch('getData')
    this.props.history.push('/users')
  }

  // pre-populate form with existing data 
  prePopulateForm = () => {
    
  }

  submitHandler = e => {
    e.preventDefault()
    this.addData(e)
  }

  // componentDidMount() {
  //   if(this.props.update) {
  //     this.prePopulateForm(this.props.id)
  //   }
  // }

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
            <>
              <input name="username" type="text"
                placeholder="Username" onChange={this.handleInput}
                value={this.state.username}
                required
              />
              <input name="password" type="password"
                placeholder="Password" onChange={this.handleInput}
                value={this.state.password}
                required
              />
            </>
          )}
          <Button type="submit" {...this.props}>
            {`${this.props.add ? 'Add' : ''} 
              ${this.props.update ? 'Update' : ''}  
              ${this.props.delete ? 'Delete' : ''}   
              Login
            `}
          </Button>
        </form>
        {this.state.errorMessage ? this.state.errorMessage : ''}
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