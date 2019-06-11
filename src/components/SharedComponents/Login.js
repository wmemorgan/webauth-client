import React, { Component } from 'react'
import axios from 'axios' /** External API calls only **/
//import { connect } from 'react-redux' /** Redux only **/
import { FormContainer } from './FormStyles'
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
      let data = await axios.post('http://192.168.254.5:5000/api/auth/login', credentials)
      console.log(`Successful login: `, data)
      this.setState({ 
        status: data.status,
        greeting: data.data.message,
        errorMessage: '' 
      },
        () => this.props.history.push('/') /** React-Router only **/
      )
      
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
  }

  // pre-populate form with existing data 
  prePopulateForm = () => {
    
  }

  updateData = async e => {
    // prevent default
    e.preventDefault()
    // gather form data
    let updatedRecord = {
      id: this.state.id,
      username: this.state.username,
      password: this.state.password
    }

    try {
      let data = await axios.put(`http://192.168.254.5:5000/api/users/${this.state.id}`, updatedRecord)
      console.log(`Form submitted data sent: ${JSON.stringify(updatedRecord)}`)
      this.setState({ status: data.status })
    }
    catch (err) {
      console.error(err.response)
      this.setState({
        status: err.status,
        errorMessage: err.response.data.message
      })
    }
    //this.props.history.push(`/somelist/${this.state.id}`) /** React-Router only **/

    console.log(`Form submitted data sent: ${JSON.stringify(this.state)}`)

    // reset form fields
    this.setState({
      id: '',
      username: '',
      password: '',

    })
  }

  deleteData = async e => {
    // prevent default
    e.preventDefault()
    // invoke the deleteFriend method and pass id
    try {
      let data = await axios.delete(`http://192.168.254.5:5000/api/users/${this.state.id}`)
      this.setState({ status: data.status })
    }
    catch (err) {
      console.error(err.response)
      this.setState({
        status: err.status,
        errorMessage: err.response.data.message
      })
    }
    //this.props.history.push('/') /** React-Router only **/
    // reset form field
    this.setState({ id: '' })
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
      <FormContainer {...this.props}>
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
              />
              <input name="password" type="password"
                placeholder="Password" onChange={this.handleInput}
                value={this.state.password}
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
      </FormContainer>
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