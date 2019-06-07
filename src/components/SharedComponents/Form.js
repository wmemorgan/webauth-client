import React, { Component } from 'react'
//import axios from 'axios' /** External API calls only **/
//import { connect } from 'react-redux' /** Redux only **/
import { FormContainer } from './FormStyles'
import Button from '../DesignComponents/Button'

//import {  } from '../../actions' /** Redux only **/

class Form extends Component {
  state = {
    id: '',
    name: ''
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  addData = e => {
    // prevent default
    e.preventDefault()

    // gather form data
    let newRecord = {
      name: this.state.name
    }

    // send new record to api
    this.props.addData(newRecord)
        console.log(`Form submitted data sent: ${JSON.stringify(newRecord)}`)
    //this.props.history.push('/') /** React-Router only **/

    // reset form fields
    this.setState({
      id: '',
      name: ''
    })
  }

  // pre-populate form with existing data 
  prePopulateForm = () => {
    
  }

  updateData = e => {
    // prevent default
    e.preventDefault()
    // send updated record to api
    this.props.updateData(this.state)
    //this.props.history.push(`/somelist/${this.state.id}`) /** React-Router only **/

    console.log(`Form submitted data sent: ${JSON.stringify(this.state)}`)

    // reset form fields
    this.setState({
      id: '',
      name: ''
    })
  }

  deleteData = e => {
    // prevent default
    e.preventDefault()
    // invoke the deleteFriend method and pass id
    this.props.deleteData(this.state.id)
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
              <input name="name" type="text"
                placeholder="Name" onChange={this.handleInput}
                value={this.state.name}
              />
            </>
          )}
          <Button type="submit" {...this.props}>
            {`${this.props.add ? 'Add' : ''} 
              ${this.props.update ? 'Update' : ''}  
              ${this.props.delete ? 'Delete' : ''}   
              Friend
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