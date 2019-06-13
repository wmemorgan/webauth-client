import React, { Component } from 'react'
import axios from 'axios' /** External API calls only **/
//import { connect } from 'react-redux' /** Redux only **/
import { FormContainer } from '../SharedComponents/FormStyles'
import Button from '../DesignComponents/Button'

//import {  } from '../../actions' /** Redux only **/

class Form extends Component {
  state = {
    id: '',
    username: '',
    password: '',
    status: null,
    errorMesage: ''
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  addData = async e => {
    // prevent default
    e.preventDefault()

    // gather form data
    let newRecord = {
      username: this.state.username,
      password: this.state.password
    }

    // send new record to api
    try {
      let endpoint = '/auth/register'
      let data = await axios.post(endpoint, newRecord)
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

    // reset form fields
    this.setState({
      username: '',
      password: ''
    })
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
              User
            `}
          </Button>
        </form>
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