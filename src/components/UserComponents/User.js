import React, { Component } from 'react';
import axios from 'axios'
import { EventEmitter } from '../../utils/events'

import * as S from './UserStyles'
import Button from '../DesignComponents/Button'

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
			edit: false,
			id: null,
			username: "",
			firstname: "",
			lastname: "",
			primaryemail: "",
			roles: "",
			status: null,
			errorMesage: "",
		};
  }

  prePopulateForm = () => {
    const { username, firstname, lastname, primaryemail, roles, userid } = this.props.user
    this.setState({
      id : userid,
			username,
			firstname,
			lastname,
      primaryemail,
      roles
		});
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

  getUser = async () => {
    try {
      // Retrieve user profile
      const endpoint = "/users/user/profile";
      const data = await axios.get(endpoint);
      console.log(`GET USER DATA `, data);
      // Populate locale state
      const {
        username,
        firstname,
        lastname,
        primaryemail,
        roles,
        userid,
      } = data.data;

      this.setState({
        id: userid,
        username,
        firstname,
        lastname,
        primaryemail,
        roles,
      });
    } catch (err) {
        console.error(err.response);
        this.setState({
          status: err.status,
          errorMessage: err.response.data.error,
        });
    }
  }

  updateUser = async () => {
    // gather updated data
    const updatedData = {
      username: this.state.username,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      primaryemail: this.state.primaryemail,
      roles: this.state.roles
    }
    // send updated record to api
    // const endpoint = '/user'
    // axios.put(`${endpoint}/${this.state.id}`, updatedData)
    //   .then(response => {
    //     this.props.updateList(response.data)
    //     this.toggleEdit()
    //   })
    //   .catch(err => console.log(err))

    try {
      console.log(`USER ID: `, this.props.user);
      const endpoint = '/users/user'
      const data = await axios.patch(`${endpoint}/${this.state.id}`, updatedData)
      if (data) {
        this.toggleEdit()
        // reset form fields
        this.setState({
          id: this.props.user.userid,
          username: '',
          firstname: '',
          lastname: '',
          primaryemail: ''
        })
        EventEmitter.dispatch('getData')  
      }
    }
    catch (err) {
      console.error(err.response)
      this.setState({
				status: err.status,
				errorMessage: err.response.data.error
			});
    }

    console.log(`Form submitted data sent: ${JSON.stringify(updatedData)}`)
  }

  deleteUser = async id => {
    try {
      const endpoint = '/users/user'
      const data = await axios.delete(`${endpoint}/${id}`)
      if (data) {
        console.log(`${this.state.username} successfully deleted`)
        // reset form fields
        this.setState({
					username: "",
					firstname: "",
					lastname: "",
          primaryemail: "",
          roles: ""
				});
        EventEmitter.dispatch('getData')
        this.props.history.push('/users')
      }
    }
    catch (err) {
      console.error(err.response)
      this.setState({
				status: err.status,
				errorMessage: err.response.data.error
			});
    }
  }

  componentDidMount() {
    if (this.props.user) {
      this.prePopulateForm();
    } else {
      this.getUser();
    }
  }

  render() {
    const {
			userid,
			username,
			firstname,
			lastname,
      primaryemail,
      roles
		} = this.state;
    return (
			<>
				<S.UserInfoContainer>
					<header>
						<i className="far fa-edit" onClick={() => this.toggleEdit()}></i>
						<i
							className="fa fa-trash"
							onClick={() => this.deleteUser(userid)}
						></i>
					</header>
					<div className="user-info">
						{!this.state.edit ? (
							<h3 className="stat-data">{username}</h3>
						) : (
							<input
								name="username"
								type="text"
								placeholder="Username"
								onChange={this.inputChangeHandler}
								value={this.state.username}
							/>
						)}
						<div className="user-stats">
							<div className="stat-category">First Name:</div>
							{!this.state.edit ? (
								<div className="stat-data">{firstname}</div>
							) : (
								<input
									name="firstname"
									type="text"
									placeholder="firstname"
									onChange={this.inputChangeHandler}
									value={this.state.firstname}
								/>
							)}
						</div>
						<div className="user-stats">
							<div className="stat-category">Last Name:</div>
							{!this.state.edit ? (
								<div className="stat-data">{lastname}</div>
							) : (
								<input
									name="lastname"
									type="text"
									placeholder="Department"
									onChange={this.inputChangeHandler}
									value={this.state.lastname}
								/>
							)}
						</div>
						<div className="user-stats">
							<div className="stat-category">Email:</div>
							{!this.state.edit ? (
								<div className="stat-data">{primaryemail}</div>
							) : (
								<input
									name="primaryemail"
									type="text"
									placeholder="Department"
									onChange={this.inputChangeHandler}
									value={this.state.primaryemail}
								/>
							)}
						</div>
						<div className="user-stats">
							<div className="stat-category">Roles:</div>
							<div className="list-stats">
								{roles.length > 0 && roles.map((role) => (
									<div className="list-item" key={role.role.roleid}>
										{role.role.name}
									</div>
								))}
							</div>
						</div>
						<S.ButtonMenu {...this.state} onClick={() => this.updateUser()}>
							<Button update>Update</Button>
						</S.ButtonMenu>
					</div>
					{this.state.errorMessage !== null ? (
						<p>{this.state.errorMessage}</p>
					) : (
						""
					)}
				</S.UserInfoContainer>
			</>
		);
  }
}

export default User;

